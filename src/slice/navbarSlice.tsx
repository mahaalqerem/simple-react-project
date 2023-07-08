import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Pages {
  Home,
  Carts,
  RequestProduct,
  Details,
  Login,
  Signup,
}

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  quantity?: number;
}

export interface NavbarState {
  currentPage: Pages;
  products: Product[];
  selectedProduct: Product | null;
}

const initialState: NavbarState = {
  currentPage: Pages.Home,
  products: [],
  selectedProduct: null,
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<Pages>) => {
      state.currentPage = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const {
  setCurrentPage,
  addProduct,
  deleteProduct,
  setSelectedProduct,
} = navbarSlice.actions;

export default navbarSlice.reducer;
