import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PerfectAuthPage.css";
import { useAuth } from "../context/AuthContext.jsx";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSpinner, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const PerfectAuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  
  const { currentUser, login, signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated (idToken exists)
  useEffect(() => {
    const idToken = localStorage.getItem('idToken')
    if (idToken && currentUser && isAuthenticated()) {
/*       console.log(' User already authenticated with idToken, redirecting to home')
 */      setIsRedirecting(true);
      navigate("/", { replace: true });
    }
  }, [currentUser, isAuthenticated, navigate]);

  // Handle input changes with error clearing
  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData(prev => ({ ...prev, [name]: value }));
    if (errors[name] || errors.general) {
      setErrors(prev => ({ ...prev, [name]: "", general: "" }));
    }
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData(prev => ({ ...prev, [name]: value }));
    if (errors[name] || errors.general) {
      setErrors(prev => ({ ...prev, [name]: "", general: "" }));
    }
  };

  // Validation functions
  const validateSignIn = () => {
    const newErrors = {};
    if (!signInData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!signInData.password) {
      newErrors.password = "Password is required";
    } else if (signInData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const validateSignUp = () => {
    const newErrors = {};
    if (!signUpData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (signUpData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!signUpData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!signUpData.password) {
      newErrors.password = "Password is required";
    } else if (signUpData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!signUpData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (signUpData.password !== signUpData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  // Handle Sign In with IMMEDIATE redirect
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateSignIn();
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length > 0) return;
    
    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");
    
    try {
      console.log('Attempting login...');
      
      const result = await login(signInData.email, signInData.password);
      
      if (result.success) {
        console.log('Login successful, immediate redirect');
        
        // Show brief success message
        setSuccessMessage("Welcome back!");
        setIsRedirecting(true);
        
        // Clear form
        setSignInData({ email: "", password: "" });
        
        // IMMEDIATE redirect to home page (no delay)
        navigate("/", { replace: true });
      }
      
    } catch (error) {
/*       console.error(' Login failed:', error);
 */      
      let errorMessage = "Login failed. Please try again.";
      
      if (error.code) {
        switch (error.code) {
          case "auth/user-not-found":
            errorMessage = "No account found with this email address.";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password. Please check and try again.";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email address format.";
            break;
          case "auth/invalid-credential":
            errorMessage = "Invalid email or password. Please check your credentials.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many failed attempts. Please try again later.";
            break;
          default:
            errorMessage = error.message || "An error occurred during login.";
        }
      }
      
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Sign Up with IMMEDIATE redirect
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateSignUp();
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length > 0) return;

    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
/*       console.log(' Attempting signup...');
 */      
      const result = await signup(signUpData.email, signUpData.password, {
        name: signUpData.name.trim()
      });
      
      if (result.success) {
/*         console.log(' Signup successful, immediate redirect');
 */        
        // Show brief success message
        setSuccessMessage("Account created! Welcome to KidCare!");
        setIsRedirecting(true);
        
        // Clear form
        setSignUpData({ name: "", email: "", password: "", confirmPassword: "" });
        
        // IMMEDIATE redirect to home page (no delay)
        navigate("/", { replace: true });
      }
      
    } catch (error) {
/*       console.error(' Signup failed:', error);
 */      
      let errorMessage = "Account creation failed. Please try again.";
      
      if (error.code) {
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "An account with this email already exists. Please sign in instead.";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email address format.";
            break;
          case "auth/weak-password":
            errorMessage = "Password is too weak. Please choose a stronger password.";
            break;
          case "auth/operation-not-allowed":
            errorMessage = "Email/password accounts are not enabled.";
            break;
          default:
            errorMessage = error.message || "An error occurred during account creation.";
        }
      }
      
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle between sign in and sign up
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
    setSuccessMessage("");
    setSignInData({ email: "", password: "" });
    setSignUpData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="perfect-auth-page">
      <div className="background-gradient"></div>

      <div className="auth-main-container">
        <div className={`auth-box ${isSignUp ? "sign-up-active" : ""}`}>
          
          {/* Sign In Section */}
          <div className="sign-in-section">
            <div className="form-container">
              <h2 style={{ color:'#357AE8' }} className=" text-align-center mb-3 fw-bold">Sign In</h2>
              <p className="section-subtitle mb-3">Welcome back to KidCare</p>

              {/* Messages */}
              {successMessage && !isSignUp && (
                <div className="success-message">
                  {successMessage}
                </div>
              )}
              
              {errors.general && !isSignUp && (
                <div className="error-message">
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSignInSubmit} className="auth-form">
                <div className="input-field">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={signInData.email}
                    onChange={handleSignInChange}
                    className={errors.email ? "error" : ""}
                    disabled={isLoading}
                    required
                  />
                  {errors.email && (
                    <span className="error-text">{errors.email}</span>
                  )}
                </div>

                <div className="input-field">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={signInData.password}
                    onChange={handleSignInChange}
                    className={errors.password ? "error" : ""}
                    disabled={isLoading}
                    required
                  />
                  {errors.password && (
                    <span className="error-text">{errors.password}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                      SIGNING IN...
                    </>
                  ) : (
                    "SIGN IN"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sign Up Section */}
          <div className="sign-up-section">
            <div className="form-container">
              <h2 style={{ color:'#357AE8' }} className=" text-align-center mb-2 fw-bold">Create Account</h2>
              <p className="section-subtitle text-align-center mb-3">Join the KidCare family</p>

              {/* Messages */}
              {successMessage && isSignUp && (
                <div className="success-message">
                  {successMessage}
                </div>
              )}
              
              {errors.general && isSignUp && (
                <div className="error-message">
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSignUpSubmit} className="auth-form">
                <div className="input-field">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={signUpData.name}
                    onChange={handleSignUpChange}
                    className={errors.name ? "error" : ""}
                    disabled={isLoading}
                    required
                  />
                  {errors.name && (
                    <span className="error-text">{errors.name}</span>
                  )}
                </div>

                <div className="input-field">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    className={errors.email ? "error" : ""}
                    disabled={isLoading}
                    required
                  />
                  {errors.email && (
                    <span className="error-text">{errors.email}</span>
                  )}
                </div>

                <div className="input-field">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password (min 6 characters)"
                    value={signUpData.password}
                    onChange={handleSignUpChange}
                    className={errors.password ? "error" : ""}
                    disabled={isLoading}
                    required
                    minLength="6"
                  />
                  {errors.password && (
                    <span className="error-text">{errors.password}</span>
                  )}
                </div>

                <div className="input-field">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={signUpData.confirmPassword}
                    onChange={handleSignUpChange}
                    className={errors.confirmPassword ? "error" : ""}
                    disabled={isLoading}
                    required
                  />
                  {errors.confirmPassword && (
                    <span className="error-text">{errors.confirmPassword}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="submit-btn signup-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                      CREATING ACCOUNT...
                    </>
                  ) : (
                    "SIGN UP"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sliding Panel */}
          <div className="sliding-panel">
            <div className="panel welcome-panel">
              <h3>Hello!</h3>
              <p>Register with your personal details to use all site features</p>
              <button className="panel-btn" onClick={toggleMode} disabled={isLoading}>
                SIGN UP
              </button>
            </div>

            <div className="panel create-panel">
              <h3>Welcome Back!</h3>
              <p>Enter your personal details to use all site features</p>
              <button className="panel-btn" onClick={toggleMode} disabled={isLoading}>
                SIGN IN
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PerfectAuthPage;
