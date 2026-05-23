import "../styles/DashboardStats.css";
import { Package, TrendingDown, DollarSign, Boxes } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;
import { useState, useEffect } from "react";
import axios from "axios";

const DashboardStats = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // method to fetch categories from the database
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/category`);
      // console.log("Category resonse", res);
      setCategories(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  //method to fetch products from the databse
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/product`);
      // console.log("product response", res);
      setProducts(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${API_URL}/transaction`);

      setTransactions(res.data.data.transactionList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchProducts();
    fetchCategories();
  }, []);

  const totalValue = transactions.reduce((total, transaction) => {
    const transactionTotal = transaction.items.reduce((sum, item) => {
      // console.log("the item is", item.product.price);
      return sum + item.quantity * item.product?.price;
    }, 0);

    return total + transactionTotal;
  }, 0);
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon purple">
          <Package />
        </div>

        <div>
          <p>Total Products</p>
          <h2>{products.length}</h2>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon green">
          <Boxes />
        </div>

        <div>
          <p>Total Categories</p>
          <h2>{categories.length}</h2>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon orange">
          <TrendingDown />
        </div>

        <div>
          <p>Low Stock Items</p>
          <h2>{products.filter((p) => p.countInStock <= 3).length}</h2>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon pink">
          <DollarSign />
        </div>

        <div>
          <p>Total Value</p>
          <h2>${totalValue}</h2>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
