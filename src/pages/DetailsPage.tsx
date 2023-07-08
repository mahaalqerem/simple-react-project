import React from 'react'
import detailsStyle from './Details.module.css'

interface Product {
  id: number,
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  qountity?: number;
}

export const DetailsPage = ({ product }: { product: Product }) => {
  return (
    <div>
      <h1>PRODUCT DETAILS</h1>
      <div className={detailsStyle.details}>
        <img src={product.imageUrl} alt={product.name} className={detailsStyle.img} />
        <h2 > <span className={detailsStyle.name}>{product.name}</span> <br></br><span className={detailsStyle.price}>Price: ${product.price.toFixed(2)} </span> <br></br> <span className={detailsStyle.des}>Description: {product.description}</span></h2>
        <p ></p>
        <p className={detailsStyle.des}></p>
      </div>
    </div>
  );
};
