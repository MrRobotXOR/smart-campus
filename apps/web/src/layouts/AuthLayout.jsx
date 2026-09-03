import "./AuthLayout.css";

function AuthLayout({ title, children }) {
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;