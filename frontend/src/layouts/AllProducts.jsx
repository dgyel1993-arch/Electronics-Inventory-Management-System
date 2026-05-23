import { useState, useEffect } from "react";
import "../styles/AllProducts.css";
// import myproducts from "../assets/data/products.json";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";

const API_URL = import.meta.env.VITE_API_URL;

const AllProducts = () => {
  const { auth } = useSelector((state) => ({ ...state }));

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  //store products in state
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  //state for deleteing product
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  //state for editing products
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  //state for adding products
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    image: "",
    category: "",
    brand: "",
    price: "",
    countInStock: "",
  });

  // method to fetch categories from the database
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/category`);
      setCategories(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  //method to fetch products from the databse
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/product`);
      setProducts(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts =
    selectedCategory === "All Categories"
      ? products
      : products.filter((p) => {
          const catId =
            typeof p.category === "object"
              ? p.category._id || p.category.id
              : p.category;

          return catId === selectedCategory;
        });

  // pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  //handle input change
  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  //event handler for add product
  async function handleAddProduct(e) {
    e.preventDefault();

    const product = {
      ...newProduct,
      price: Number(newProduct.price),
      countInStock: Number(newProduct.countInStock),
    };
    try {
      const res = await axios.post(`${API_URL}/product`, product, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      setProducts([...products, res.data.data.product]);

      toast.success("Product added successfully!");
      setShowForm(false);

      // Reset form
      setNewProduct({
        name: "",
        description: "",
        image: "",
        category: "",
        brand: "",
        price: "",
        countInStock: "",
      });
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to add product");
    }
  }

  const handleEdit = (item) => {
    setSelectedProduct(item);
    setShowEditForm(true);
  };
  //event handler for updating a product
  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const id = updatedProduct.id || updatedProduct._id;

      const res = await axios.put(`${API_URL}/product/${id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      const updated = res.data.data.updatedProduct;

      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));

      setShowEditForm(false);
      toast.success("Product updated successfully!");
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error("Failed to update product");
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      //call backend API
      await axios.delete(`${API_URL}/product/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      //remove from the frontend state after deleting successfully from backend
      setProducts((prev) =>
        prev.filter((p) => (p.id || p._id) !== deleteId),
      );

      setShowDeleteModal(false);
      setDeleteId(null);
      toast.success("Product deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete product");
    }
  };

  const handleView = (item) => {
    navigate(`/products/${item.id}`);
  };

  return (
    <div className="products-page">
      {/* Top Section */}
      <div className="products-header">
        <h2>Products</h2>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          + Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="products-filters">
        <label className="sr-only" htmlFor="category-filter">
          Filter products by category
        </label>
        <select
          id="category-filter"
          aria-label="Filter products by category"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All Categories">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/*Modal for adding product*/}

      <AddProduct
        showForm={showForm}
        setShowForm={setShowForm}
        newProduct={newProduct}
        handleChange={handleChange}
        handleAddProduct={handleAddProduct}
        categories={categories}
      />

      {/*Modal for editing product*/}
      {showEditForm && (
        <EditProduct
          setShowEditForm={setShowEditForm}
          selectedProduct={selectedProduct}
          handleUpdateProduct={handleUpdateProduct}
          categories={categories}
        />
      )}

      {/*Modal for deleting product*/}
      <DeleteProduct
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleConfirmDelete={handleConfirmDelete}
      />

      {/* Table */}
      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentProducts.map((item) => (
              <tr key={item.id}>
                <td className="product-cell">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-image"
                  />
                  <span className="product-name">{item.name}</span>
                </td>
                <td>{item.category?.name || "Uncategorised"}</td>
                <td>{item.countInStock}</td>
                <td>${item.price}</td>

                <td>
                  <span className={item.countInStock <= 3 ? "low" : "in"}>
                    {item.countInStock <= 3 ? "Low Stock" : "In Stock"}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="actions">
                  <button
                    type="button"
                    className="icon-button"
                    aria-label={`View ${item.name}`}
                    onClick={() => handleView(item)}
                  >
                    <Eye size={18} className="icon view" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="icon-button"
                    aria-label={`Edit ${item.name}`}
                    onClick={() => handleEdit(item)}
                  >
                    <Edit size={18} className="icon edit" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="icon-button"
                    aria-label={`Delete ${item.name}`}
                    onClick={() => handleDeleteClick(item.id || item._id)}
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
export default AllProducts;
