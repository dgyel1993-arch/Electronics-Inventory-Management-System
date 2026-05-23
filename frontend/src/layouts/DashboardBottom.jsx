import "../styles/DashboardBottom.css";
import { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardBottom = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);

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
  }, []);

  const lowStockProducts = products.filter(
    (product) => product.countInStock <= 5,
  );
  return (
    <div className="bottom-grid">
      <div className="table-card">
        <div className="card-header">
          <div>
            <h3>Low Stock Alerts</h3>
            <p>Products running out soon</p>
          </div>

          <span className="view-all">View all</span>
        </div>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {lowStockProducts.length > 0 ? (
              lowStockProducts.slice(0, 3).map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.category?.name}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <span className="badge red">Low Stock</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No low stock products</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-card">
        <div className="card-header">
          <div>
            <h3>Recent Transactions</h3>
            <p>Latest inventory updates</p>
          </div>

          <span className="view-all" onClick={() => navigate("/transactions")}>
            View all
          </span>
        </div>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Type</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.slice(0, 3).map((transaction) => (
                <tr key={transaction._id}>
                  <td>
                    {new Date(transaction.transactionDate).toLocaleDateString()}
                  </td>

                  <td>{transaction.items[0].product?.name}</td>

                  <td>
                    <span className="badge red">OUT</span>
                  </td>

                  <td>{transaction.items[0].quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No recent transactions</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardBottom;
