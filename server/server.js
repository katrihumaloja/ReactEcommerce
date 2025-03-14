import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import multer from 'multer';

// Ladataan .env-tiedosto
dotenv.config()

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use(express.static('images'))

// Portti
const PORT = process.env.PORT || 3001
app.listen(PORT, function () {
    console.log('Server running on port ' + PORT)
})

// Yhteys MySQL-tietokantaan
const conf = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

// Hakee kaikki tuotteet tietokannasta
app.get('/products', async (req, res) => {
    try {
        // Luodaan yhteys MySQL-tietokantaan
        const connection = await mysql.createConnection(conf)

        // Haetaan kaikki tuotteet
        const [rows] = await connection.execute(`
            SELECT 
                id, 
                name AS productName, 
                price, 
                imageUrl, 
                category, 
                description AS productDescription 
            FROM product
        `);

        // Lähetetään tuotteet JSON-muodossa
        res.json(rows)

        // Suljetaan yhteys
        await connection.end()
    } catch (err) {
        console.error("Virhe tietokantakyselyssä:", err)
        res.status(500).json({ error: err.message })
    }
})

// Hakee tietyn tuotteen id:n perusteella
app.get('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const connection = await mysql.createConnection(conf)

        const [rows] = await connection.execute(`
            SELECT
                id,
                name AS productName,
                price,
                imageUrl,
                category,
                description AS productDescription
            FROM product
            WHERE id = ?
            `, [productId])
        
        res.json(rows[0])

        await connection.end()
    } catch (err) {
        console.error("VIrhe tietokantakyselyssä ", err)
        res.status(500).json({ error: err.message})
    }
})

app.get('/categories', async (req, res) => {
    try {
        const connection = await mysql.createConnection(conf)

        const [rows] = await connection.execute(`
            SELECT DISTINCT category_id, category_name FROM product_category
        `)

        res.json(rows)

        await connection.end()
    } catch (err) {
        console.error("Virhe tietokantakyselyssä:", err)
        res.status(500).json({ error: err.message })
    }
})

app.get('/products/category/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const connection = await mysql.createConnection(conf)

        // Hae oikea category_id nimen perusteella
        const [categoryRow] = await connection.execute(
            "SELECT category_id FROM product_category WHERE category_name = ?", [category]
        );

        if (categoryRow.length === 0) {
            return res.status(404).json({ error: "Kategoriaa ei löytynyt" })
        }

        const categoryId = categoryRow[0].category_id

        const [rows] = await connection.execute(`
            SELECT
                id,
                name AS productName,
                price,
                imageUrl,
                category,
                description AS productDescription
            FROM product
            WHERE category = ?
        `, [categoryId])

        res.json(rows)

        await connection.end()
    } catch (err) {
        console.error("Virhe tietokantakyselyssä", err)
        res.status(500).json({ error: err.message })
    }
})