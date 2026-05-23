import "../styles/LoginPage.css";
import logo from "../assets/logo.png";
import chartImage from "../assets/banner1.png";

const LoginBanner = () => {
  return (
    <div className="left-section">
      <div className="overlay"></div>

      <div className="content">
        <div className="logo-section">
          <img src={logo} className="logo-img" alt="logo" />

          <div>
            <h1>Electronics</h1>
            <p>Inventory System</p>
          </div>
        </div>

        <div className="hero-text">
          <h2>
            Managing our inventory
            <br />
            with clarity and confidence
          </h2>
        </div>

        <div className="login-dashboard-preview">
          <div className="login-stats-row">
            <div className="login-stat-card">
              <span>Total Products</span>
              <h3>128</h3>
            </div>

            <div className="login-stat-card">
              <span>Total Stock</span>
              <h3>1245</h3>
            </div>

            <div className="login-stat-card">
              <span>Low Stock</span>
              <h3>15</h3>
            </div>

            <div className="login-stat-card">
              <span>Total Value</span>
              <h3>$24k</h3>
            </div>
          </div>

          <div className="chart-box">
            <div className="chart-line">
              <img src={chartImage} alt="chart" className="chart-image" />
            </div>
          </div>
        </div>

        <div className="features">
          <div>
            <h4>Secure & Reliable</h4>
            <p>Your data is safe with us</p>
          </div>

          <div>
            <h4>Real-time Updates</h4>
            <p>Get live inventory insights</p>
          </div>

          <div>
            <h4>Smart Reports</h4>
            <p>Make data-driven decisions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBanner;
