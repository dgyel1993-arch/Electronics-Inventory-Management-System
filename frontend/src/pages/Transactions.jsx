import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import "../styles/Transactions.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

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
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <Sidebar />

        <main className="main-content">
          <Header />

          <div className="transactions-container">
            <div className="transactions-header">
              <h2>Transaction History</h2>
            </div>

            <div className="transactions-table">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Reason</th>
                    <th>Reference</th>
                    <th>Recorded by:</th>
                    <th>Items</th>
                    <th>Date&Time</th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="empty-state">
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    transactions.map((t, index) => (
                      <tr key={t._id}>
                        <td>{index + 1}</td>
                        <td>{t.reason}</td>
                        <td>{t.reference}</td>
                        <td>{t.user?.name || "N/A"}</td>

                        <td>
                          {t.items.map((item) => (
                            <div key={item._id} className="item-row">
                              <strong>{item.product?.name}</strong> (
                              {item.quantity})
                              <br />
                              <span className="badge">
                                {item.product?.category?.name}
                              </span>
                            </div>
                          ))}
                        </td>

                        <td className="date">
                          {new Date(t.transactionDate).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
