import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './style.css';

let pages = 1;

function Main() {
    const [ products, setProducts ] = useState([]);
  


    async function loadProducts(page = 1) {
        if(page < 1) {
            const response = await api.get(`/products`);
            pages = 1;
            setProducts(response.data);
            return;
        }
        else {
            const response = await api.get(`/products?page=${page}`);

            if(response.data.length === 0) {
                pages = 1;
                const response = await api.get(`/products`);
                setProducts(response.data);
                alert('Hmmm... Parece que não há mais produtos, então retornamos a primeira página.');  
                return;
            }
            setProducts(response.data); 
                
        }
        console.log(pages);
    }

    function prevPage() {
        pages--;
        loadProducts(pages);
        console.log(pages);
    }

    function nextPage() {  
        pages++;
        loadProducts(pages);
        console.log(pages);
    }
    
    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <div className="product-list">
            {products.map(product => (
                <article key={product.id}>
                   <strong>{product.title}</strong>
                    <p>{product.description}</p>

                    <Link to={`/products/${product.id}`}>Acessar</Link>
                </article>
            ))}
            <div className="actions">
                <button disabled={pages === 1} onClick={prevPage}>Anterior</button>
                <button onClick={nextPage}>Próximo</button>
            </div>
        </div>
    )
}

export default Main;