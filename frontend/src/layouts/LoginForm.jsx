import "../styles/LoginPage.css";
const LoginForm = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  return (
    <div className="right-section">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>

        <p className="subtitle">Sign in to continue to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <div className="password-header">
              <label>Password</label>
              <a href="#">Forgot password?</a>
            </div>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="remember-row">
            <label>
              <input type="checkbox" /> Remember me
            </label>
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <div className="divider">
          <span>or continue with</span>
        </div>

        <div className="social-buttons">
          <button type="button">Google</button>
          <button type="button">Microsoft</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
