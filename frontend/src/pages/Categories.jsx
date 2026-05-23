import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import "../styles/Categories.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

// import AllProducts from "../layouts/AllProducts";
const API_URL = import.meta.env.VITE_API_URL;

export default function Categories() {
  const { auth } = useSelector((state) => ({ ...state }));

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editName, setEditName] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/category`);
      setCategories(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_URL}/category`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );

      setCategories([...categories, res.data.data.category]);
      setName("");
      setShowForm(false);

      toast.success("Category added!");
      fetchCategories();
    } catch {
      toast.error("Failed to add category");
    }
  };

  const handleEditClick = (cat) => {
    setSelectedCategory(cat);
    setEditName(cat.name);
    setShowEditForm(true);
  };
  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${API_URL}/category/${selectedCategory._id}`,
        { name: editName },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );

      const updated = res.data.data.category;

      setCategories((prev) =>
        prev.map((c) => (c._id === selectedCategory._id ? updated : c)),
      );

      setShowEditForm(false);
      setSelectedCategory(null);
      setEditName("");

      toast.success("Category updated!");
      fetchCategories();
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/category/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      setCategories((prev) => prev.filter((c) => c._id !== deleteId));

      setShowDeleteModal(false);
      setDeleteId(null);

      toast.success("Category deleted!");
    } catch {
      toast.error("Delete failed");
    }
  };
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <Sidebar />
        {/* MAIN CONTENT */}
        <main className="main-content">
          <Header />
          <div className="products-page">
            {/* HEADER */}
            <div className="products-header">
              <h2>Categories</h2>
              <button className="add-btn" onClick={() => setShowForm(true)}>
                + Add Category
              </button>
            </div>

            {/* ADD FORM */}
            {showForm && (
              <form onSubmit={handleAddCategory} className="products-filters">
                <label className="sr-only" htmlFor="category-name">
                  Category name
                </label>
                <input
                  id="category-name"
                  type="text"
                  placeholder="Category name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button className="add-btn" type="submit">
                  Save
                </button>
              </form>
            )}

            {showEditForm && (
              <div className="modal" role="dialog" aria-modal="true">
                <div className="modal-content">
                  <h3 id="edit-category-title">Edit Category</h3>

                  <form
                    onSubmit={handleUpdateCategory}
                    aria-labelledby="edit-category-title"
                  >
                    <label className="sr-only" htmlFor="edit-category-name">
                      Category name
                    </label>
                    <input
                      id="edit-category-name"
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />

                    <div className="modal-actions">
                      <button type="submit" className="add-btn">
                        Update
                      </button>

                      <button
                        className="cancel-btn"
                        type="button"
                        onClick={() => setShowEditForm(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {showDeleteModal && (
              <div className="modal" role="dialog" aria-modal="true">
                <div className="modal-content">
                  <h3>Delete Category</h3>

                  <p>Are you sure you want to delete this category?</p>

                  <div className="modal-actions">
                    <button
                      className="delete-btn"
                      onClick={handleConfirmDelete}
                    >
                      Yes, Delete
                    </button>

                    <button
                      className="cancel-btn"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TABLE */}
            <div className="products-table">
              <table>
                <thead>
                  <tr>
                    <th>Category Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat._id}>
                      <td>{cat.name}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="edit-btn"
                            onClick={() => handleEditClick(cat)}
                          >
                            Edit
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteClick(cat._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
