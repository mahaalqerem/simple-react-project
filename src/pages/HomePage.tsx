import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { Pages, Product, setCurrentPage, addProduct, setSelectedProduct } from '../slice/navbarSlice';
import { RootState } from '../store/store';
import axios from 'axios';
import Product2A from '../images/Product2A.png';
import Product2B from '../images/Product2C.png';


interface HomePageProps {
  handleButtonClick: (page: Pages, product?: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ handleButtonClick }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const dispatch = useDispatch();
  const productsList = useSelector((state: RootState) => state.navbar.products);
  const handleAddToCartClick = (product: Product) => {
    dispatch(addProduct(product));
  };

  const handleDetailsClick = (product: Product) => {
    dispatch(setSelectedProduct(product));
    dispatch(setCurrentPage(Pages.Details));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://zera-9fdf9-default-rtdb.firebaseio.com/.json');
        const data = response.data;
        const productList: Product[] = Object.keys(data).map((key) => ({
          id: Number(key),
          name: data[key].name,
          price: data[key].price,
          imageUrl: data[key].imageUrl,
          description: data[key].description,
        }));
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className={styles.cont}>
        <img className={styles.img2} src={Product2B} alt="Product2B" />
        <p className={styles.par}>
          <span className={styles.sale}>SALE</span>
          <span className={styles.off}>30% OFF</span>
        </p>
        <br />
        <img className={styles.img1} src={Product2A} alt="Product2A" />
      </div>

      <h1>SPECIAL PRODUCT FOR YOU</h1>

      {products.map((product) => (
        <div key={product.id} className={styles.product}>
          <img src={product.imageUrl} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.price.toFixed(2)}$</p>
          <button className={styles.bt1} onClick={() => handleAddToCartClick(product)}>
            ADD TO CART
          </button>
          <Link to={`/details/${product.id}`}>
            <button className={styles.bt2} onClick={() => handleDetailsClick(product)}>
              DETAILS
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};
