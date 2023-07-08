import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../App.module.css';
import { HomePage } from '../pages/HomePage';
import { DetailsPage } from '../pages/DetailsPage';
import { CartsPage } from '../pages/CartsPage';
import { RequestProductPage } from '../pages/RequestProductPage';
import { Login } from '../pages/Login';
import iconZera from '../images/icon-zera.png';
import { Signup } from '../pages/Signup';

import {
  Pages,
  Product,
  setCurrentPage,
  addProduct,
  deleteProduct,
  setSelectedProduct
} from '../slice/navbarSlice';
import { RootState } from '../store/store';

const Navbar = () => {
  const currentPage = useSelector((state: RootState) => state.navbar.currentPage);
  const products = useSelector((state: RootState) => state.navbar.products);
  const selectedProduct = useSelector((state: RootState) => state.navbar.selectedProduct);

  const dispatch = useDispatch();

  const handleButtonClick = (page: Pages, product?: Product) => {
    if (product && page === Pages.Carts) {
      dispatch(addProduct(product));
    }
    dispatch(setCurrentPage(page));
    if (page === Pages.Details) {
      dispatch(setSelectedProduct(product || null));
    }
  };

  const handleLogin = (username: string, password: string) => {
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const handleSignup = (username: string, email: string, password: string) => {
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <img className={styles.icon} src={iconZera} alt="Icon Zera" />
        <Link to="/" className={styles.button}>Home</Link>
        <Link to="/carts" className={styles.button}>Carts</Link>
        <Link to="/request-product" className={styles.button}>Request Product</Link>
        <Link to="/login" className={styles.button}>Login</Link>
        <Link to="/signup" className={styles.button}>Signup</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage handleButtonClick={handleButtonClick} />} />
        <Route path="/carts" element={
          <CartsPage
            products={products}
            onDeleteProduct={(productId) => dispatch(deleteProduct(productId.id))}
          />
        } />
        <Route path="/request-product" element={<RequestProductPage products={products} />} />
        <Route path="/details/:productId" element={selectedProduct && <DetailsPage product={selectedProduct} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
      </Routes>
    </div>
    
  );
};

export default Navbar;
