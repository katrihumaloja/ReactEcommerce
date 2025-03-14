import React, { useEffect, useState } from 'react';
import "./../styles/Products.css"
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("Kaikki")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Hakee kategoriat tietokannasta
    useEffect(() => {
        fetch("http://localhost:3001/categories")
            .then(response => response.json())
            .then(data => setCategories([{ category_id: "Kaikki", category_name: "Kaikki" }, ...data]))
            .catch(error => console.error("Virhe kategorioiden hakemisessa:", error))
    }, [])

    // Hakee tuotteet valitun kategorian mukaan
    useEffect(() => {
        setLoading(true)
        let url = "http://localhost:3001/products" // Oletus URL kaikille tuotteille
    
        if (selectedCategory !== "Kaikki") {
            url = `http://localhost:3001/products/category/${selectedCategory}` // Haetaan vain kyseisen kategorian tuotteet
        }
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
            .catch(error => {
                console.error("Virhe tuotteiden hakemisessa:", error)
                setError("Virhe tuotteiden hakemisessa")
                setLoading(false)
            })
    }, [selectedCategory])

    if (loading) {
        return <div>Ladataan tuotteita...</div>
    }

    return (
        <>
            <div className='category-filter'>
                {categories.map(cat => (
                    <button
                        key={cat.category_id}
                        className={selectedCategory === cat.category_name ? "active" : ""}
                        onClick={() => setSelectedCategory(cat.category_name)}
                    >
                        {cat.category_name}
                    </button>
                ))}
            </div>
            <div className="products-container">
                <div className="products">
                    {Array.isArray(products) && products.length === 0 ? (
                        <p>Tuotteita ei löytyny</p> // Jos ei tuotteita
                    ) : (
                        Array.isArray(products) && products.map(product => (
                            <div key={product.id} className="product-card">
                                <Link to={`/product/${product.id}`} className="product-link">
                                    {product.imageUrl && (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.productName}
                                            className="product-image"
                                        />
                                    )}
                                    <h3>{product.productName}</h3>
                                    <p>{product.price} €</p>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default Products