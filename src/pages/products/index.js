import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './style.css';

function Products() {
    const [ product, setProduct ] = useState({});

    useEffect(() => {
        const id = window.location.href.slice(-2);

        if(id.includes('/')) {
            const Id = id.slice(-1);

            console.log(Id);
        
          api.get(`/products/${Number(Id)}`)
            .then(response => {          
                setProduct(response.data[0]);

                 return;
            })
            .catch(error => alert('Ocorreu um erro...'))       
        }

        else {
         console.log(id)  

          api.get(`/products/${Number(id)}`)
            .then(response => {
                setProduct(response.data[0]);
            })
            .catch(error => alert('Ocorreu um erro...'))

        }

    }, []);

    return (
        <div className="product-info">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>
                URL:
                <a target="_blank" href={product.url}>{product.url}</a>
            </p>

            <Link className="button" to="/">Voltar</Link>
        </div>
    )
}

export default Products;