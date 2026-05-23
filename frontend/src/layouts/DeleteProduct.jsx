import "../styles/AddProduct.css";

const DeleteProduct = ({
  showDeleteModal,
  setShowDeleteModal,
  handleConfirmDelete,
}) => {
  if (!showDeleteModal) return null;

  return (
    <div className="product-modal">
      <div className="delete-box">
        <h3>Confirm Delete</h3>

        <p>Are you sure you want to delete this product?</p>

        <div className="form-buttons">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>

          <button
            type="button"
            className="delete-btn"
            onClick={handleConfirmDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
