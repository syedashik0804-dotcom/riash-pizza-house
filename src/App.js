import React, { useState, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";

// --- Product Images ---

import pizza from "./pizza 11.jpg";
import pizza1 from "./pizza12.jpg";
import pizza2 from "./pizza13.jpg";
import pizza3 from "./pizza14.jpg";
import pizza4 from "./pizza15.jpg";
import pizza5 from "./pizza17.jpg";
import pizza6 from "./pizza20.jpg";
import pizza7 from "./pizza21.jpg";
import pizza8 from "./pizza14.jpg";
import pizza9 from "./pizza.jpeg";


// --- Hero Images ---
import heroHome from "./pizza7.jpg";
import heroContact from "./pizza8.jpg";

// -------------------- CART CONTEXT --------------------

const CartContext = createContext();
const useCart = () => useContext(CartContext);

// -------------------- HOME PAGE --------------------

function Home() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <img src={heroHome} alt="Delicious Pizza" className="hero-image" />
        <div className="hero-text">
          <h1>🏠 Welcome to Riash PIZZA HOUSE 🍕</h1>
          <p>Delicious pizzas made with fresh ingredients and love.</p>
          <button className="order-btn">Order Now</button>
        </div>
      </div>

      <section className="home-info">
        <h2>Why Choose Riash Pizza?</h2>
        <p>
          At Riash Pizza House, every pizza is made with passion, fresh dough,
          and locally sourced ingredients to bring you the perfect bite of joy!
        </p>
      </section>
    </div>
  );
}

// -------------------- ABOUT PAGE --------------------

function About() {
  const products = [
    { img: pizza, name: "Margherita Pizza", price: 199, ingredients: "Fresh mozzarella, tomato sauce, basil" },
    { img: pizza1, name: "Cheese Burst Pizza", price: 249, ingredients: "Cheesy crust, tomato sauce, herbs" },
    { img: pizza2, name: "Veg Supreme Pizza", price: 269, ingredients: "Onion, capsicum, olives, corn, cheese" },
    { img: pizza3, name: "Farmhouse Pizza", price: 289, ingredients: "Tomato, onion, capsicum, mushroom" },
    { img: pizza4, name: "Paneer Tandoori Pizza", price: 279, ingredients: "Paneer, capsicum, onion, tandoori sauce" },
    { img: pizza5, name: "Pepperoni Pizza", price: 299, ingredients: "Pepperoni, cheese, tomato base" },
    { img: pizza6, name: "Double Cheese Pizza", price: 319, ingredients: "Extra mozzarella, cheddar, herbs" },
    { img: pizza7, name: "Mexican Green Wave", price: 289, ingredients: "Jalapeno, onion, capsicum, Mexican herbs" },
    { img: pizza8, name: "Veggie Paradise", price: 279, ingredients: "Golden corn, black olives, onion, capsicum" },
    { img: pizza9, name: "Peri Peri Pizza", price: 299, ingredients: "Peri-peri sauce, corn, tomato, cheese" },
  ];

  const scrollToProducts = () => {
    const section = document.getElementById("our-products");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="about-page">
      <button className="products-btn" onClick={scrollToProducts}>
        🍕 Our Products
      </button>

      <div className="hero-section">
        <img src={pizza9} alt="About Riash Pizza" className="hero-image" />
      </div>

      <section className="about-details">
        <h2>About Riash Pizza House</h2>
        <p>
          Riash Pizza House is your cozy neighborhood pizzeria dedicated to
          delivering authentic flavors and heart-warming experiences.
        </p>

        <h2 id="our-products" className="products-title">
          🍕 Our Products
        </h2>

        <div className="product-gallery">
          {products.map((p, index) => (
            <Link
              key={index}
              to={`/product/${encodeURIComponent(p.name)}`}
              state={{ product: p }}
              className="product-card"
            >
              <img src={p.img} alt={p.name} className="product-img" />
              <div className="product-info">
                <p className="product-name">{p.name}</p>
                <p className="product-price">₹{p.price}</p>
                <button className="buy-btn">View Details</button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

// -------------------- PRODUCT DETAILS PAGE --------------------

function ProductDetails() {
  const { product } = useLocation().state || {};
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  if (!product) return <h2 className="not-found"> Product not found!</h2>;

  const totalPrice = product.price * quantity;

  const handleAdd = () => {
    addToCart({ ...product, quantity });
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      navigate("/cart");
    }, 3000);
  };

  return (
    <div className="product-details-page">
      <button className="back-btn" onClick={() => navigate(-1)}> Back</button>

      <div className="details-container">
        <div className="details-left">
          <img src={product.img} alt={product.name} className="details-img" />
        </div>

        <div className="details-right">
          <div className="rating">⭐ 4.8 / 5</div>
          <h2 className="details-name">{product.name}</h2>
          <p className="details-ingredients">
            <strong>Ingredients:</strong> {product.ingredients}
          </p>
          <p className="details-price">
            <strong>Total:</strong> ₹{totalPrice}
          </p>

          <div className="quantity-control">
            <button onClick={() => setQuantity(q => Math.max(1, q -1))}>−</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>

          <button
            className="add-btn"
            onClick={handleAdd}
            style={{ marginBottom: showMessage ? "20px" : "0" }}
          >
            🛒 Add
          </button>

          {showMessage && (
            <button
              onClick={() => navigate("/cart")}
              style={{
                display: "block",
                marginTop: "25px",
                padding: "10px 22px",
                background: "linear-gradient(90deg, #43a047, #81c784)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              Added to Cart — View Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// -------------------- CART PAGE --------------------

function Cart() {
  const { cart, clearCart } = useCart();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleConfirmOrder = () => {
    setOrderPlaced(true);
    setPhone("");
    setAddress("");
    clearCart();
    setTimeout(() => setOrderPlaced(false), 3000);
  };

  return (
    <div className="cart-page" style={{ padding: "60px 10%", background: "#fff8f0" }}>
      <h2 style={{ color: "#e65100", textAlign: "center" }}>🛒 Your Cart</h2>
      <hr style={{ margin: "15px 0", border: "1px solid #eee" }} />

      {cart.length === 0 ? (
        <p style={{ textAlign: "center" }}>No items in cart.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} style={{
              background: "#fff",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}>
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ₹{item.price * item.quantity}</p>
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ color: "#d84315" }}>Grand Total: ₹{totalAmount}</h3>
            <button
              onClick={clearCart}
              style={{
                padding: "8px 15px",
                background: "linear-gradient(90deg, #e53935, #ef5350)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Clear Cart
            </button>
          </div>

          <div style={{ marginTop: "50px", display: "flex", flexDirection: "column", gap: "40px" }}>
            {/* --- Box 1 --- */}
            <div style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
              textAlign: "center"
            }}>
              <h2>👋 Welcome</h2>
              <p>Log in with your phone number to place your order</p>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  marginTop: "15px",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  width: "70%",
                  fontSize: "1rem"
                }}
              />
            </div>

            {/* --- Box 2 --- */}
            <div
              style={{
                background: "#fff",
                padding: "30px",
                borderRadius: "15px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2>📍 Choose Delivery Address</h2>
              <textarea
                placeholder="Enter your delivery address"
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{
                  marginTop: "15px",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  width: "80%",
                  fontSize: "1rem",
                  resize: "none",
                  marginBottom: "25px",
                }}
              ></textarea>

              <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <button
                  onClick={handleConfirmOrder}
                  style={{
                    padding: "12px 30px",
                    background: "linear-gradient(90deg, #43a047, #81c784)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "1rem",
                  }}
                >
                  Confirm to Place Order
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {orderPlaced && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(255, 255, 255, 0.95)",
            padding: "40px 60px",
            borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            textAlign: "center",
            fontSize: "1.5rem",
            color: "green",
            fontWeight: "bold",
          }}
        >
          🎉 Thanks for your order!
        </div>
      )}
    </div>
  );
}

// -------------------- CONTACT PAGE --------------------

function Contact() {
  const scrollToMessageBox = () => {
    const messageBoxSection = document.getElementById("message-box");
    if (messageBoxSection) {
      messageBoxSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="contact-page">
      <button className="feedback-btn" onClick={scrollToMessageBox}>
        💬 Share Your Feedback
      </button>

      <div className="hero-section">
        <img src={heroContact} alt="Contact Riash Pizza" className="hero-image" />
      </div>

      <section className="contact-details">
        <div className="contact-card">
          <h2>📞 Get in Touch</h2>
          <p>Have questions or want to order? We’d love to hear from you!</p>

          <div className="contact-info">
            <p>
              📧 <strong>Email:</strong>{" "}
              <a href="mailto:contact@riashpizza.com">contact@riashpizza.com</a>
            </p>
            <p>
              📞 <strong>Phone:</strong>{" "}
              <a href="tel:+919345077910">+91 93450 77910</a>
            </p>
          </div>

          <form className="contact-form" id="message-box">
            <h3>💬 Send Us a Message</h3>
            <textarea
              placeholder="Type your message here..."
              rows="5"
              className="message-box"
            ></textarea>
            <button type="submit" className="contact-btn">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

// -------------------- HEADER --------------------

function Header() {
  const location = useLocation();
  const headerStyle = {
    background:
      location.pathname === "/contact"
        ? "linear-gradient(90deg, #85c411, #81c784)"
        : "linear-gradient(90deg, #ff7043, #ffb74d)",
  };

  return (
    <header style={headerStyle}>
      <h1>🍕 Riash Pizza House</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
        <Link to="/contact">Contact</Link> | <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
}

// -------------------- LAYOUT --------------------

function Layout({ children }) {
  return (
    <div className="app-container">
      <Header />
      {children}
      <footer>© 2025 Riash Pizza House | All Rights Reserved</footer>
    </div>
  );
}

// -------------------- MAIN APP --------------------

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => setCart((prev) => [...prev, item]);
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/product/:name" element={<Layout><ProductDetails /></Layout>} />
          <Route path="/cart" element={<Layout><Cart /></Layout>} />
        </Routes>
      </Router>
    </CartContext.Provider>
  );
}

export default App;