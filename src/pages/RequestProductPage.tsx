import React from 'react';
import { useContext } from 'react';
import cartStyle from './Carts.module.css'

interface Product {
  id: number,
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  qountity?: number;
}

interface RequestProductPageProps {
  products: Product[];
}

export const RequestProductPage = ({ products }: RequestProductPageProps) => {
  return (
    <div className={cartStyle.bag}>
      <h1>Requested Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} className={cartStyle.li}>
            <img src={product.imageUrl} alt={product.name} className={cartStyle.img} />
            <p className={cartStyle.productName}>{product.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestProductPage;
