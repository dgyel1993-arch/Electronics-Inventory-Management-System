import "../styles/AddProduct.css";

const AddProduct = ({
  showForm,
  setShowForm,
  newProduct,
  handleChange,
  handleAddProduct,
  categories,
}) => {
  if (!showForm) return null;

  return (
    <div className="product-modal">
      <form className="product-form" onSubmit={handleAddProduct}>
        <h3>Add Product</h3>

        {/* NAME */}
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* IMAGE */}
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={newProduct.image}
            onChange={handleChange}
            required
          />
        </div>

        {/* CATEGORY */}
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            required
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
            value={newProduct.brand}
            onChange={handleChange}
            required
          />
        </div>

        {/* PRICE */}
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* STOCK */}
        <div className="form-group">
          <label>Stock Count</label>
          <input
            type="number"
            name="countInStock"
            value={newProduct.countInStock}
            onChange={handleChange}
            required
          />
        </div>

        {/* BUTTONS */}
        <div className="form-buttons">
          <button type="submit">Add Product</button>

          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
