import "../styles/DashboardMain.css";
import { ArrowDownToLine, ArrowUpFromLine, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
const DashboardMain = () => {
  const navigate = useNavigate();
  return (
    <div className="middle-grid">
      <div className="chart-card">
        <div className="card-header">
          <div>
            <h3>Stock Overview</h3>
            <p>Monthly inventory activity</p>
          </div>

          <button>This Month</button>
        </div>

        <div className="fake-chart">
          <div className="line"></div>
        </div>
      </div>

      <div className="quick-actions">
        <div className="card-header">
          <div>
            <h3>Quick Actions</h3>
            <p>Fast inventory management</p>
          </div>
        </div>

        <div className="action-grid">
          <div className="action-card">
            <Plus className="purple-text" />
            <h4>Add Product</h4>
            <button
              className="purple-btn"
              onClick={() => navigate("/products")}
            >
              Add Now
            </button>
          </div>

          <div className="action-card">
            <ArrowDownToLine className="green-text" />
            <h4>Check Stocks</h4>
            <button
              className="green-btn"
              onClick={() => navigate("/transactions")}
            >
              Check Now
            </button>
          </div>

          <div className="action-card">
            <ArrowUpFromLine className="orange-text" />
            <h4>Stock Out</h4>
            <button
              className="orange-btn"
              onClick={() => navigate("/stockout")}
            >
              Stock Out
            </button>
          </div>

          <div className="action-card">
            <Plus className="pink-text" />
            <h4>Users</h4>
            <button className="pink-btn" onClick={() => navigate("/users")}>
              Add Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardMain;
