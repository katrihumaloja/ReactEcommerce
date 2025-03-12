import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import multer from 'multer';

// Ladataan .env-tiedosto
dotenv.config()

const axios = require('axios')
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use(express.static('images'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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
