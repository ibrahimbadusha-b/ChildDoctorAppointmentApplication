import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import logo from "../assets/rmlogo.png";
import "./AppNavbar.css";


const BASE_NAV_ITEMS = [
  { 
    path: "/", 
    label: "Home", 
    icon: "bi-house-heart", 
  },
  { 
    path: "/doctors", 
    label: "Our Doctors", 
    icon: "bi-people", 
  },
  { 
    path: "/services", 
    label: "Services", 
    icon: "bi-hospital", 
  }
];

const AUTH_NAV_ITEMS = [
  { 
    path: "/book", 
    label: "Book Appointment", 
    icon: "bi-calendar-check", 
  },
  { 
    path: "/dashboard", 
    label: "Dashboard", 
    icon: "bi-speedometer2", 
  }
];

export default function AppNavbar() {

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const { 
    isAuthenticated, 
    logout, 
    getUserDisplayName, 
    getUserInitials, 
    currentUser,
    loading 
  } = useAuth();
  
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false);
      setIsUserDropdownOpen(false);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
    setIsUserDropdownOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(prev => !prev);
    setIsMobileMenuOpen(false);
  };

  const getNavigationItems = () => {
    const hasToken = localStorage.getItem('idToken');
    
    if (hasToken && isAuthenticated()) {
      console.log('User authenticated - showing full navigation');
      return [...BASE_NAV_ITEMS, ...AUTH_NAV_ITEMS];
    } else {
      console.log('User not authenticated - showing base navigation only');
      return BASE_NAV_ITEMS;
    }
  };

//logout
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setIsUserDropdownOpen(false);
      setIsMobileMenuOpen(false);
      
      console.log('User initiated logout');
      
      const result = await logout();
      
      if (result.success) {
        console.log('Logout completed successfully');
        navigate("/", { replace: true });
        
        setTimeout(() => {
          console.log('Redirected to home page after logout');
        }, 100);
      }
      
    } catch (error) {
      console.error('Logout error:', error);
      navigate("/", { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Show loading state while initializing
  if (loading) {
    return (
      <nav className="professional-navbar">
        <div className="navbar-container">
          <BrandSection />
          <div className="nav-loading">
            <div className="loading-spinner-nav"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`professional-navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <BrandSection />
        
        <DesktopNavigation navItems={getNavigationItems()} />
        
        <AuthSection 
          isAuthenticated={isAuthenticated()}
          currentUser={currentUser}
          getUserDisplayName={getUserDisplayName}
          getUserInitials={getUserInitials}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
          isDropdownOpen={isUserDropdownOpen}
          onToggleDropdown={toggleUserDropdown}
          dropdownRef={dropdownRef}
        />
        
        <MobileToggle 
          isActive={isMobileMenuOpen} 
          onClick={toggleMobileMenu} 
        />
      </div>
      
      <MobileMenu
        isOpen={isMobileMenuOpen}
        navItems={getNavigationItems()}
        isAuthenticated={isAuthenticated()}
        currentUser={currentUser}
        getUserDisplayName={getUserDisplayName}
        getUserInitials={getUserInitials}
        onClose={closeMobileMenu}
        onLogout={handleLogout}
        isLoggingOut={isLoggingOut}
      />
    </nav>
  );
}

// Brand Section Component
function BrandSection() {
  return (
    <Link className="brand-section" to="/">
      <div className="logo-wrapper">
        <img 
          src={logo} 
          alt="KidCare Logo" 
          className="brand-logo" 
        />
      </div>
      <div className="brand-content">
        <h1 className="brand-title">KidCare</h1>
        <p className="brand-subtitle">Your child's health, our priority</p>
      </div>
    </Link>
  );
}

// Desktop Navigation Component
function DesktopNavigation({ navItems }) {
  return (
    <ul className="nav-menu desktop-menu">
      {navItems.map((item, index) => (
        <NavItem 
          key={index} 
          item={item} 
        />
      ))}
    </ul>
  );
}

// Individual Navigation Item Component
function NavItem({ item }) {
  return (
    <li className="nav-item">
      <NavLink
        end={item.path === "/"}
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        to={item.path}
        style={{ "--item-color": item.color }}
      >
        <div className="nav-link-content">
          <span className="nav-text">{item.label}</span>
        </div>
        <div className="nav-hover-effect"></div>
        <div className="nav-indicator"></div>
      </NavLink>
    </li>
  );
}

// Conditional Authentication Section
function AuthSection({ 
  isAuthenticated, 
  currentUser,
  getUserDisplayName, 
  getUserInitials,
  onLogout,
  isLoggingOut,
  isDropdownOpen,
  onToggleDropdown,
  dropdownRef 
}) {
  const hasToken = localStorage.getItem('idToken');
  
  // Show Login Button when no token
  if (!hasToken || !isAuthenticated) {
    console.log('Rendering login button - no valid token');
    return (
      <div className="auth-section">
        <Link to="/auth" className="cta-button">
          <div className="button-content">
            <i className="bi bi-person-circle button-icon"></i>
            <span className="button-text">Login</span>
          </div>
          <div className="button-glow"></div>
        </Link>
      </div>
    );
  }

  // Show User Profile when token exists
  console.log('Rendering user profile - valid token found');
  return (
    <div className="auth-section">
      <UserProfileSection 
        currentUser={currentUser}
        getUserDisplayName={getUserDisplayName}
        getUserInitials={getUserInitials}
        onLogout={onLogout}
        isLoggingOut={isLoggingOut}
        isDropdownOpen={isDropdownOpen}
        onToggleDropdown={onToggleDropdown}
        dropdownRef={dropdownRef}
      />
    </div>
  );
}

// User Profile Section Component
function UserProfileSection({ 
  currentUser,
  getUserDisplayName, 
  getUserInitials,
  onLogout,
  isLoggingOut,
  isDropdownOpen,
  onToggleDropdown,
  dropdownRef 
}) {
  const displayName = getUserDisplayName();
  const userInitials = getUserInitials();
  const userAvatar = currentUser?.photoURL;

  return (
    <div className="user-profile-section" ref={dropdownRef}>
      <button 
        className={`user-profile-btn ${isDropdownOpen ? 'active' : ''}`}
        onClick={onToggleDropdown}
        disabled={isLoggingOut}
        aria-expanded={isDropdownOpen}
        type="button"
      >
        {/* User Profile Icon */}
        <div className="profile-icon">
          {userAvatar ? (
            <img 
              src={userAvatar} 
              alt="Profile" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div 
            className="profile-icon-fallback" 
            style={{ display: userAvatar ? 'none' : 'flex' }}
          >
            <span className="user-initials">{userInitials}</span>
          </div>
        </div>
        
        <span className="user-display-name">{displayName}</span>
        
        <i className={`bi bi-chevron-down dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}></i>
      </button>

      <div className={`user-dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
        <div className="dropdown-user-header">
          <div className="user-avatar-large">
            {userAvatar ? (
              <img src={userAvatar} alt="Profile" />
            ) : (
              <span className="user-initials-large">{userInitials}</span>
            )}
          </div>
          <div className="user-details">
            <strong className="user-name">{displayName}</strong>
            <small className="user-email">{currentUser?.email}</small>
            <div className="auth-status">✓ Authenticated</div>
          </div>
        </div>
        <button 
          className="dropdown-menu-item logout-item" 
          onClick={onLogout}
          disabled={isLoggingOut}
          type="button"
        >
          {isLoggingOut ? (
            <>
              <div className="loading-spinner-sm"></div>
              <span>Logging out...</span>
            </>
          ) : (
            <>
              <i className="bi bi-box-arrow-right"></i>
              <span>Logout</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Mobile Toggle Button Component
function MobileToggle({ isActive, onClick }) {
  return (
    <button
      className={`mobile-toggle ${isActive ? "active" : ""}`}
      onClick={onClick}
      aria-label="Toggle mobile menu"
      type="button"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}

// Mobile Menu Component with Conditional Rendering
function MobileMenu({ 
  isOpen, 
  navItems, 
  isAuthenticated, 
  currentUser,
  getUserDisplayName,
  getUserInitials,
  onClose, 
  onLogout,
  isLoggingOut 
}) {
  const hasToken = localStorage.getItem('idToken');

  return (
    <div className={`mobile-menu ${isOpen ? "active" : ""}`}>
      <div className="mobile-menu-content">
        {/* Navigation Links */}
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            end={item.path === "/"}
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? "active" : ""}`
            }
            to={item.path}
            onClick={onClose}
            style={{ "--item-color": item.color }}
          >
            <i className={`bi ${item.icon}`}></i>
            <span>{item.label}</span>
          </NavLink>
        ))}

        {/* Conditional Mobile Auth Section */}
        {(!hasToken || !isAuthenticated) ? (
          // Show Login Button when no token
          <Link 
            to="/auth" 
            className="mobile-auth-button" 
            onClick={onClose}
          >
            <i className="bi bi-person-circle"></i>
            <span>Login</span>
          </Link>
        ) : (
          // Show User Profile when token exists
          <div className="mobile-user-section">
            {/* Mobile User Info */}
            <div className="mobile-user-header">
              <div className="mobile-user-avatar">
                {currentUser?.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt="Profile" 
                  />
                ) : (
                  <span className="mobile-user-initials">
                    {getUserInitials()}
                  </span>
                )}
              </div>
              <div className="mobile-user-info">
                <span className="mobile-user-name">
                  {getUserDisplayName()}
                </span>
                <span className="mobile-user-email">
                  {currentUser?.email}
                </span>
              </div>
            </div>

          
            {/* Mobile Logout Button */}
            <button 
              className="mobile-logout-btn" 
              onClick={() => {
                onLogout();
                onClose();
              }}
              disabled={isLoggingOut}
              type="button"
            >
              {isLoggingOut ? (
                <>
                  <div className="loading-spinner-sm"></div>
                  <span>Logging out...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Logout</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
