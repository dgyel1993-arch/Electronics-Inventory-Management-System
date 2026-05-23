import "../styles/Dashboard.css";

import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import DashboardStats from "../layouts/DashboardStats";
import DashboardMain from "../layouts/DashboardMain";
import DashboardBottom from "../layouts/DashboardBottom";

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <Sidebar />
        {/* MAIN CONTENT */}
        <main className="main-content">
          <Header />

          {/* STATS */}
          <DashboardStats />

          {/* MIDDLE SECTION */}
          <DashboardMain />

          {/* TABLES */}
          <DashboardBottom />
        </main>
      </div>
    </div>
  );
}
