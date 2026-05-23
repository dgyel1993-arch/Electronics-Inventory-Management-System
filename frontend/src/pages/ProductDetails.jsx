import { ArrowLeft } from "lucide-react";
import "../styles/ProductDetails.css";
import "../styles/Dashboard.css";

import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`${API_URL}/product/${id}`);
      setProduct(res.data.data.product);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <Sidebar />
        {/* MAIN CONTENT */}
        <main className="main-content">
          <Header />
          <div className="product-page">
            <div className="container">
              {/* HEADER */}
              <div className="header">
                <button
                  className="back-btn"
                  onClick={() => navigate("/products")}
                >
                  <ArrowLeft size={18} />
                  Back to Products
                </button>
              </div>

              {/* MAIN CARD */}
              <div className="card">
                {/* IMAGE */}
                <div className="image-section">
                  <img src={product.image} alt={product.name} />
                </div>

                {/* DETAILS */}
                <div className="details">
                  <div className="title-row">
                    <h1>{product.name}</h1>

                    <span
                      className={`stock-badge ${product.countInStock <= 3 ? "low" : "high"}`}
                    >
                      {product.countInStock <= 3 ? "Low Stock" : "In Stock"}
                    </span>
                  </div>

                  <p className="price">${product.price}</p>

                  <div className="info-grid">
                    <div>
                      <p className="label">Category</p>
                      <p className="value">{product.category.name}</p>
                    </div>

                    <div>
                      <p className="label">Brand</p>
                      <p className="value">{product.brand}</p>
                    </div>

                    <div>
                      <p className="label">Product Updated At</p>
                      <p className="value">
                        {" "}
                        {new Date(product.dateCreated).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p className="label">Stock</p>
                      <p className="value">{product.countInStock}</p>
                    </div>
                  </div>

                  <div className="description">
                    <p className="label">Description</p>
                    <p className="text">{product.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
