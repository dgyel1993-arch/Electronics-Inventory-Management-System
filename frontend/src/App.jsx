import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./action/PrivateRoute";

//pages
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import StockOut from "./pages/StockOut";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/*public route*/}
          <Route path="/" element={<LoginPage />} />
          {/*private route*/}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/stockout" element={<StockOut />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
