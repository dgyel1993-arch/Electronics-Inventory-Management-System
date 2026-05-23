import { useState } from "react";
import "../styles/AddProduct.css";

const EditProduct = ({
  setShowEditForm,
  selectedProduct,
  handleUpdateProduct,
  categories,
}) => {
  const [formData, setFormData] = useState(() => ({
    ...selectedProduct,
    category:
      typeof selectedProduct?.category === "object"
        ? selectedProduct.category._id || selectedProduct.category.id
        : selectedProduct?.category || "",
  }));

  if (!formData) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateProduct(formData);
  };

  return (
    <div className="product-modal">
      <form className="product-form" onSubmit={handleSubmit}>
        <h3>Edit Product</h3>

        {/* NAME */}
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* IMAGE */}
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        {/* CATEGORY */}
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* BRAND */}
        <div className="form-group">
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>

        {/* PRICE */}
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        {/* STOCK */}
        <div className="form-group">
          <label>Stock Count</label>
          <input
            type="number"
            name="countInStock"
            value={formData.countInStock}
            onChange={handleChange}
          />
        </div>

        <div className="form-buttons">
          <button type="submit">Update Product</button>
          <button type="button" onClick={() => setShowEditForm(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
