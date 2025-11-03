import React from 'react';
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="container-fluid">
        <div className="footer-main">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
              <div className="footer-section">
                <div className="footer-logo">
                  <div className="logo-icon">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="logo-text">
                    <h3>Children's Hospital</h3>
                    <span>Pediatric Care Excellence</span>
                  </div>
                </div>
                <p className="footer-description">
                  Specialized pediatric healthcare with our team of 4 expert doctors
                  providing comprehensive medical care for children aged 0-18 years.
                </p>
                <div className="hospital-features">
                  <div className="feature-item">
                    <i className="fas fa-user-md"></i>
                    <span>4 Expert Pediatricians</span>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-child"></i>
                    <span>Ages 0-18 Years Care</span>
                  </div>

                </div>
              </div>
            </div>

            {/* Our Pediatric Team */}
            <div className="col-lg-2 col-md-6 col-sm-12 mb-4">
              <div className="footer-section">
                <h4 className="footer-title">Our Doctors</h4>
                <ul className="footer-links">
                  <li><a href="#doctorCard">Dr. Priya Sharma</a></li>
                  <li><a href="#doctorCard">Dr. Rajesh Kumar</a></li>
                  <li><a href="#doctorCard">Dr. Kavitha Menon</a></li>
                  <li><a href="#doctorCard">Dr. Arjun Reddy</a></li>
                </ul>
              </div>
            </div>

            {/* Children's Health Services */}
            <div className="col-lg-2 col-md-6 col-sm-12 mb-4">
              <div className="footer-section">
                <h4 className="footer-title">Pediatric Services</h4>
                <ul className="footer-links">
                  <li><a href="#checkups">Well-Child Checkups</a></li>
                  <li><a href="#vaccinations">Vaccinations</a></li>
                  <li><a href="#development">Growth & Development</a></li>
                  <li><a href="#nutrition">Child Nutrition</a></li>
                  <li><a href="#behavioral">Behavioral Health</a></li>
                  <li><a href="#newborn">Newborn Care</a></li>
                  <li><a href="#adolescent">Adolescent Health</a></li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
              <div className="footer-section">
                <h4 className="footer-title">Contact Us</h4>
                <div className="contact-info">
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="contact-details">
                      <span className="contact-label">Address:</span>
                      <span className="contact-value">Children's Hospital,<br />chennai</span>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div className="contact-details">
                      <span className="contact-label">Phone:</span>
                      <span className="contact-value"><a href="tel:+91 9000501089" style={{ textDecoration: "none", color: "white" }}>+91 9000501089</a></span>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="contact-details">
                      <span className="contact-label">Email:</span>
                      <span className="contact-value">
                        <a
                          href="mailto:info@childrenshospital.com"
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          info@childrenshospital.com
                        </a>
                      </span>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="contact-details">
                      <span className="contact-label">Hours:</span>
                      <span className="contact-value">Mon-Fri: 8AM-6PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Column - Redesigned */}
            <div className="col-lg-2 col-md-6 col-sm-12 mb-4">
              <div className="footer-section">
                <h4 className="footer-title">Connect With Us</h4>
                <div className="social-media-info">
                  <div className="social-contact-item">
                    <div className="social-contact-icon">
                      <i className="fab fa-facebook-f"></i>
                    </div>
                    <div className="social-contact-details">
                      <span className="social-contact-label">Facebook:</span>
                      <a href="https://facebook.com/childrenshospital" target="_blank" rel="noopener noreferrer" className="social-contact-value">Children's Hospital</a>
                    </div>
                  </div>

                  <div className="social-contact-item">
                    <div className="social-contact-icon">
                      <i className="fab fa-instagram"></i>
                    </div>
                    <div className="social-contact-details">
                      <span className="social-contact-label">Instagram:</span>
                      <a href="https://instagram.com/childrenshospital" target="_blank" rel="noopener noreferrer" className="social-contact-value">@childrenshospital</a>
                    </div>
                  </div>

                  <div className="social-contact-item">
                    <div className="social-contact-icon">
                      <i className="fab fa-whatsapp"></i>
                    </div>
                    <div className="social-contact-details">
                      <span className="social-contact-label">WhatsApp:</span>
                      <a href="https://wa.me/9000501089" target="_blank" rel="noopener noreferrer" className="social-contact-value">+91 9000501089</a>
                    </div>
                  </div>

                  <div className="social-contact-item">
                    <div className="social-contact-icon">
                      <i className="fab fa-twitter"></i>
                    </div>
                    <div className="social-contact-details">
                      <span className="social-contact-label">Twitter:</span>
                      <a href="https://twitter.com/childrenshospital" target="_blank" rel="noopener noreferrer" className="social-contact-value">@children_hospital</a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="row align-items-center">
            <div className="col-md-12 text-align-center">
              <div className="copyright-info">
                <p className="copyright">
                  &copy; {currentYear} Children's Hospital. All rights reserved.
                </p>
                <p className="hospital-info">
                  Licensed Healthcare Provider | Accredited Pediatric Care Center
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
