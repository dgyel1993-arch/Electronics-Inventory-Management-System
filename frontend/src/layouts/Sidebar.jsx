import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ArrowUpFromLine,
  Receipt,
  Users,
  Tags,
  LogOut,
} from "lucide-react";
import logo from "../assets/logo.png";
import "../styles/Sidebar.css";
import { useSelector, useDispatch } from "react-redux";
const Sidebar = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const isAdmin = auth?.user?.isAdmin;
  //logout function
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("auth");
  };

  return (
    <aside className="sidebar">
      <div>
        <div className="logo-section">
          <img src={logo} alt="Logo" className="logo-img" />

          <div>
            <h2>Electronics</h2>
            <p>Inventory System</p>
          </div>
        </div>

        <div className="menu-group">
          <NavLink className="menu-item" to="/dashboard">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          <p className="menu-title">INVENTORY</p>

          {isAdmin && (
            <NavLink to="/products" className="menu-item">
              <Package size={18} />
              <span>Products</span>
            </NavLink>
          )}

          <NavLink to="/stockout" className="menu-item">
            <ArrowUpFromLine size={18} />
            <span>Stock Out</span>
          </NavLink>

          <NavLink to="/transactions" className="menu-item">
            <Receipt size={18} />
            <span>Transactions</span>
          </NavLink>
        </div>

        {isAdmin && (
          <div className="menu-group">
            <p className="menu-title">MANAGEMENT</p>

            <NavLink to="/users" className="menu-item">
              <Users size={18} />
              <span>Users</span>
            </NavLink>

            <NavLink to="/categories" className="menu-item">
              <Tags size={18} />
              <span>Categories</span>
            </NavLink>
          </div>
        )}

        {/* <div className="menu-group">
          <p className="menu-title">REPORTS</p>

          <div className="menu-item">
            <FileText size={18} />
            <span>Reports</span>
          </div>
        </div> */}

        {/* <div className="menu-group">
          <p className="menu-title">SETTINGS</p>

          <div className="menu-item">
            <Settings size={18} />
            <span>Settings</span>
          </div>
        </div> */}
      </div>

      <NavLink className="logout" to="/" onClick={handleLogout}>
        <LogOut size={18} />
        <span>Logout</span>
      </NavLink>
    </aside>
  );
};

export default Sidebar;
