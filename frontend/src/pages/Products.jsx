import "../styles/Dashboard.css";

import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import AllProducts from "../layouts/AllProducts";

export default function Products() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <Sidebar />
        {/* MAIN CONTENT */}
        <main className="main-content">
          <Header />
          <AllProducts />
        </main>
      </div>
    </div>
  );
}
