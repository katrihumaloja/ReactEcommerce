import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { productId } = useParams() // Hakee tuotteen id:n URL:sta
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Hakee tuotteen tiedot sen id:n perusteella
    useEffect(() => {
        fetch(`http://localhost:3001/products/${productId}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data)
                setLoading(false)
            })
            .catch(error => {
                console.log("Virhe tuotteen hakemisessa: ", error)
                setError("Virhe tuotteen hakemisessa")
                setLoading(false)
            })
    }, [productId])

    if (loading) {
        return <div>Ladataan tuotteen tietoja...</div>
    }

    return (
        <div className="product-details">
            {product && (
                <div>
                    <h1>{product.productName}</h1>
                    <p>{product.productDescription}</p>
                    <p>{product.price}</p>
                    <button>Lisää ostoskoriin</button>
                </div>
            )}
        </div>
    )
}

export default ProductDetails