// import "../styles/Dashboard.css";

import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import AllUsers from "../layouts/AllUsers";

export default function Users() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <Sidebar />
        {/* MAIN CONTENT */}
        <main className="main-content">
          <Header />
          <AllUsers />
        </main>
      </div>
    </div>
  );
}
