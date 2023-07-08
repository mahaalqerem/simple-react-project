import React from 'react'
import { useState } from 'react'
import cartStyle from './Carts.module.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';

export interface Product {
  id: number,
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  qountity?: number;
}

type Props = {
  products: Product[];
};

interface CartsPageProps {
  products: Product[];
  onDeleteProduct: (product: Product) => void;
}

export const CartsPage = ({ products, onDeleteProduct }: CartsPageProps) => {
  const handleDeleteProduct = (product: Product) => {
    onDeleteProduct(product);
  };

  const totalPrice = products.reduce((acc, product) => acc + product.price, 0);
  const [showRequestPage, setShowRequestPage] = useState(false);
  const [last, setLast] = useState<Product>();
  const handleConfirmClick = () => {
    setShowRequestPage(true);
  };
  return (
    <div className={cartStyle.bag}>
      <button className={cartStyle.confirmButton} onClick={handleConfirmClick}>CONFIRM</button>
      <h1>YOUR BAG</h1>

      {products.length === 0 ? (
        <p className={cartStyle.p}>Your cart is empty</p>
      ) : (
        <>
          <p className={cartStyle.p}>Total price: ${totalPrice.toFixed(2)}</p>
          <br />
          <ul>
            {products.map((product) => (
              <li key={product.id} className={cartStyle.li}>
                <img src={product.imageUrl} alt={product.name} className={cartStyle.img} />
                <p className={cartStyle.productName}>{product.name}</p>
                <p className={cartStyle.productPrice}>Price: ${product.price.toFixed(2)}</p>
                <button className={cartStyle.button} onClick={() => handleDeleteProduct(product)}>DELETE</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
export default CartsPage;