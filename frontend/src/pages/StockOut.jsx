import { useState, useEffect } from "react";
import "../styles/StockOut.css";
import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const API_URL = import.meta.env.VITE_API_URL;

export default function StockOut() {
  const { auth } = useSelector((state) => ({ ...state }));
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    reason: "",
    reference: "",
  });

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
  }, []);

  const filteredProducts =
    search.trim() === ""
      ? []
      : products.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase()),
        );

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === product.id);
      if (exist) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, type) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: type === "inc" ? item.qty + 1 : Math.max(1, item.qty - 1),
            }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const handleSubmit = async () => {
    const payload = {
      reason: form.reason,
      reference: form.reference,
      user: auth?.user?._id,
      items: cart.map((item) => ({
        product: item._id,
        quantity: item.qty,
      })),
    };

    try {
      await axios.post(`${API_URL}/transaction`, payload, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      toast.success("Transaction recorded successfully!");
      // ✅ RESET EVERYTHING
      setCart([]);
      setSearch("");
      setForm({
        reason: "",
        reference: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to record the transaction");
    }
  };
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <Sidebar />
        {/* MAIN CONTENT */}
        <main className="main-content">
          <Header />
          <div className="container">
            {/* LEFT SIDE */}
            <div className="left">
              <h2>Search Products</h2>

              <label className="sr-only" htmlFor="stock-search">
                Search by product name
              </label>
              <input
                id="stock-search"
                className="search"
                placeholder="Search by product name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {search && (
                <div className="product-list">
                  {filteredProducts.length === 0 ? (
                    <p className="no-result">No products found</p>
                  ) : (
                    filteredProducts.map((p) => (
                      <div key={p.id} className="product-card">
                        <div>
                          <h4>{p.name}</h4>
                          <p>Stock: {p.countInStock}</p>
                          <p>Price: ${p.price}</p>
                        </div>

                        <button onClick={() => addToCart(p)}>Add</button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* RIGHT SIDE */}
            <div className="right">
              <h2>Stock In Cart</h2>

              <div className="cart">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div>
                      <h4>{item.name}</h4>
                      <p>${item.price}</p>
                    </div>

                    <div className="qty">
                      <button onClick={() => updateQty(item.id, "dec")}>
                        -
                      </button>
                      <span aria-label={`Quantity ${item.qty}`}>
                        {item.qty}
                      </span>
                      <button onClick={() => updateQty(item.id, "inc")}>
                        +
                      </button>
                    </div>

                    <div>${item.qty * item.price}</div>

                    <button
                      className="remove"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeItem(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="summary">
                {cart.length > 0 && (
                  <>
                    <h3>Total: ${total}</h3>
                    <label htmlFor="stockout-reason">Reason</label>
                    <input
                      id="stockout-reason"
                      type="text"
                      value={form.reason}
                      onChange={(e) =>
                        setForm({ ...form, reason: e.target.value })
                      }
                    />

                    <label htmlFor="stockout-reference">Reference</label>
                    <input
                      id="stockout-reference"
                      type="text"
                      value={form.reference}
                      onChange={(e) =>
                        setForm({ ...form, reference: e.target.value })
                      }
                    />
                    <button className="confirm" onClick={handleSubmit}>
                      Confirm
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
