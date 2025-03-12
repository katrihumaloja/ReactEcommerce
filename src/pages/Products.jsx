import React, { useEffect, useState } from 'react';
import "./../styles/Products.css"
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Hakee tuotteet kun komponentti renderöidään
    useEffect(() => {
        fetch('http://localhost:3001/products')
            .then(response => response.json())
            .then(data => {
                console.log("Tuotteet haettu:", data);
                setProducts(data) // Asetetaan tuotteet tilaan
                setLoading(false)  // Ladataan valmiiksi
            })
            .catch(error => {
                console.error('Virhe tuotteiden hakemisessa:', error)
                setError('Virhe tuotteiden hakemisessa')
                setLoading(false);
            })
    }, [])

    if (loading) {
        return <div>Ladataan tuotteita...</div>
    }

    return (
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
    )
}

export default Products