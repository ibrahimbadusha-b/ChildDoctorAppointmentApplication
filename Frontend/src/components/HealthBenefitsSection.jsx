import React, { useState } from 'react';
import "./HealthBenefitsSection.css";

const HealthBenefitsSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const healthBenefits = [
    {
      id: 1,
      title: "Medical Checkups",
      icon: "fas fa-user-md", 
      benefits: {
        point1: "Regular health monitoring",
        point2: "Early problem detection", 
        point3: "Growth tracking",
        point4: "Preventive care"
      }
    },
    {
      id: 2,
      title: "Vaccination",
      icon: "fas fa-syringe", 
      benefits: {
        point1: "Disease prevention",
        point2: "Immunity building",
        point3: "Community safety", 
        point4: "Long-term protection"
      }
    },
    {
      id: 3,
      title: "Nutrition",
      icon: "fas fa-apple-alt", 
      benefits: {
        point1: "Healthy growth support",
        point2: "Brain development",
        point3: "Strong immune system",
        point4: "Energy & vitality"
      }
    },
    {
      id: 4,
      title: "Mental Health", 
      icon: "fas fa-brain", 
      benefits: {
        point1: "Emotional balance",
        point2: "Stress management",
        point3: "Behavioral guidance",
        point4: "Social skills"
      }
    },
    {
      id: 5,
      title: "Exercise",
      icon: "fas fa-running", 
      benefits: {
        point1: "Strong bones & muscles",
        point2: "Better coordination", 
        point3: "Healthy weight",
        point4: "Improved stamina"
      }
    },
    {
      id: 6,
      title: "Rest & Sleep",
      icon: "fas fa-bed", 
      benefits: {
        point1: "Better growth hormone",
        point2: "Memory enhancement",
        point3: "Mood improvement",
        point4: "Energy restoration"
      }
    }
  ];

  return (
    <section className="health-benefits-section">
      <div className="container-fluid">
        {/* Section Header */}
        <div className="row">
          <div className="col-12">
            <div className="benefits-header">
              <h2 className="benefits-title">
                <i className="fas fa-heart text-danger me-3"></i>
                Children's Health Benefits
              </h2>
              <p className="benefits-subtitle">
                Essential healthcare services for your child's optimal development
              </p>
            </div>
          </div>
        </div>

        <div className="row benefits-grid">
          {healthBenefits.map((benefit, index) => (
            <div key={benefit.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div 
                className="benefit-card-container"
                onMouseEnter={() => setHoveredCard(benefit.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`benefit-card ${hoveredCard === benefit.id ? 'is-flipped' : ''}`}>
                  
                  <div className="card-front">
                    <div className="front-content">
                      <div className="icon-container">
                        <i className={`benefit-icon ${benefit.icon}`}></i>
                      </div>
                      <h3 className="benefit-title">{benefit.title}</h3>
                    {/*   <div className="hover-indicator">
                        <i className="fas fa-mouse-pointer me-2"></i>
                        <span>Hover for details</span>
                      </div> */}
                    </div>
                  </div>

                  <div className="card-back">
                    <div className="back-content">
                      <div className="back-header">
                        <i className={`back-icon ${benefit.icon}`}></i>
                        <h4 className="back-title">{benefit.title}</h4>
                      </div>
                      
                      <div className="benefits-grid-2x2">
                        <div className="benefit-point">
                          <i className="fas fa-check-circle point-icon"></i>
                          <span className="point-text">{benefit.benefits.point1}</span>
                        </div>
                        <div className="benefit-point">
                          <i className="fas fa-check-circle point-icon"></i>
                          <span className="point-text">{benefit.benefits.point2}</span>
                        </div>
                        <div className="benefit-point">
                          <i className="fas fa-check-circle point-icon"></i>
                          <span className="point-text">{benefit.benefits.point3}</span>
                        </div>
                        <div className="benefit-point">
                          <i className="fas fa-check-circle point-icon"></i>
                          <span className="point-text">{benefit.benefits.point4}</span>
                        </div>
                      </div>

                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      
      </div>
    </section>
  );
};

export default HealthBenefitsSection;
