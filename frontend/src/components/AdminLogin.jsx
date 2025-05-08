import { useState } from 'react';
import { Lock, User, AlertCircle } from 'lucide-react';
import "../styles/AdminLogin.css";
import { useNavigate } from 'react-router-dom';


function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = () => {
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // For demo purposes only - in a real app you would validate with your backend
      if (username === 'admin' && password === 'admin123') {
        alert('Login successful!');
        navigate('/admin');
      } else {
        setError('Invalid username or password.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Admin Login</h1>
          <p>Please sign in to your admin account</p>
        </div>
        
        {error && (
          <div className="error-message">
            <AlertCircle className="error-icon" />
            {error}
          </div>
        )}
        
        <div className="login-form">
          <div className="form-fields">
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <div className="input-with-icon">
                <User className="input-icon" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <Lock className="input-icon" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>
          
          <div className="login-options">
            <div className="remember-me">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            
          
          </div>
          
          <div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="login-button"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;