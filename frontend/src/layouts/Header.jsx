import "../styles/Header.css";
import { Bell, Menu } from "lucide-react";
import { useSelector } from "react-redux";

const Header = () => {
  const { auth } = useSelector((state) => ({ ...state }));

  const user = auth?.user;
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="menu-icon">
          <Menu size={20} />
        </div>

        <div>
          <h2>Dashboard</h2>
          <p>Manage your inventory overview</p>
        </div>
      </div>
      {/* <div className="search-box">
        <Search size={25} />
        <input type="text" placeholder="Search products..." />
      </div> */}

      <div className="topbar-right">
        <div className="notification">
          <Bell size={20} />
          <span>3</span>
        </div>

        <div className="profile">
          <div className="profile-circle">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h4>{user?.name}</h4>
            <p>{user?.isAdmin ? "Admin" : "Staff"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
