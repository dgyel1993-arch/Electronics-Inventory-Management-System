import { useState, useEffect, useCallback } from "react";
import "../styles/AllUsers.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { useSelector } from "react-redux";

const API_URL = import.meta.env.VITE_API_URL;

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const { auth } = useSelector((state) => ({ ...state }));

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setUsers(res.data.data.userList);
    } catch (err) {
      console.log(err);
    }
  }, [auth.token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // delete
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/user/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      setUsers((prev) => prev.filter((u) => u._id !== deleteId));

      setShowDeleteModal(false);
      setDeleteId(null);
      toast.success("User deleted successfully!");
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/user/register`, form, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      toast.success("User added Successfully!");

      setUsers((prev) => [res.data.data, ...prev]);

      setShowForm(false);

      setForm({
        name: "",
        email: "",
        password: "",
        isAdmin: false,
      });
    } catch {
      toast.error("Failed to add user");
    }
  };

  return (
    <div className="users-page">
      {/* HEADER */}
      <div className="users-header">
        <h2>Users</h2>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          + Add New User
        </button>
      </div>

      {showForm && (
        <div className="add-modal-overlay" role="dialog" aria-modal="true">
          <div className="add-modal">
            <h2 id="add-user-title">Add New User</h2>

            <form onSubmit={handleAdd} aria-labelledby="add-user-title">
              <label htmlFor="new-user-name">Name</label>
              <input
                id="new-user-name"
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="new-user-email">Email</label>
              <input
                id="new-user-email"
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="new-user-password">Password</label>
              <input
                id="new-user-password"
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <label>
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={form.isAdmin}
                  onChange={handleChange}
                />
                Admin
              </label>

              <div className="add-modal-actions">
                <button type="button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>

                <button type="submit">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="add-modal-overlay" role="dialog" aria-modal="true">
          <div className="add-modal delete-modal">
            <h2>Delete User</h2>

            <p>Are you sure you want to delete this user?</p>

            <div className="add-modal-actions">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteId(null);
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                className="delete-confirm-btn"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id}>
                <td className="user-cell">
                  <div className="avatar">{user.name?.charAt(0)}</div>
                  <span>{user.name}</span>
                </td>

                <td>{user.email}</td>
                <td>
                  <span className={`role ${user.isAdmin ? "admin" : "user"}`}>
                    {user.isAdmin ? "Admin" : "User"}
                  </span>
                </td>

                <td className="actions">
                  <button
                    type="button"
                    className="icon-button"
                    aria-label={`Delete ${user.name}`}
                    onClick={() => handleDeleteClick(user._id)}
                  >
                    <Trash2
                      size={18}
                      className="icon delete"
                      aria-hidden="true"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
