import React, { useState } from 'react';
import './ServicePage.css';

const ServicePage = () => {
  const [activeTab, setActiveTab] = useState('general');

  // Main Pediatric Services
  const generalServices = [
    {
      id: 1,
      title: "General Pediatric Care",
      description: "Comprehensive medical care for children from birth to 18 years, including routine checkups and preventive care.",
      icon: "fas fa-user-md",
      features: ["Regular Health Checkups", "Growth Monitoring", "Preventive Care", "Health Education"]
    },
    {
      id: 2,
      title: "Newborn Care",
      description: "Specialized care for newborns from birth to 1 month, ensuring healthy development and early health screening.",
      icon: "fas fa-baby",
      features: ["Birth Examinations", "Feeding Guidance", "Jaundice Screening", "Growth Assessment"]
    },
    {
      id: 3,
      title: "Infant Care",
      description: "Comprehensive care for infants aged 1 month to 2 years, focusing on development milestones and health monitoring.",
      icon: "fas fa-child",
      features: ["Development Tracking", "Feeding Support", "Sleep Guidance", "Safety Education"]
    },
    {
      id: 4,
      title: "Vaccination Services",
      description: "Complete immunization schedules following CDC guidelines to protect your child from preventable diseases.",
      icon: "fas fa-syringe",
      features: ["Routine Immunizations", "Travel Vaccines", "Catch-up Schedules", "Vaccine Education"]
    },
    {
      id: 5,
      title: "Growth & Development",
      description: "Monitoring physical and cognitive development to ensure your child reaches important milestones.",
      icon: "fas fa-chart-line",
      features: ["Height & Weight Tracking", "Milestone Assessment", "Development Screening", "Early Intervention"]
    },
    {
      id: 6,
      title: "Nutritional Counseling",
      description: "Expert guidance on nutrition and healthy eating habits for optimal growth and development.",
      icon: "fas fa-apple-alt",
      features: ["Diet Planning", "Nutrition Education", "Feeding Problems", "Healthy Eating Habits"]
    }
  ];

  // Specialized Services
  const specializedServices = [
    {
      id: 7,
      title: "Pediatric Emergency Care",
      description: "24/7 urgent medical attention for children with immediate medical needs and emergency situations.",
      icon: "fas fa-ambulance",
      features: ["24/7 Emergency Care", "Urgent Medical Attention", "Trauma Care", "Critical Care"]
    },
    {
      id: 8,
      title: "Behavioral Health",
      description: "Mental health services for children including counseling, therapy, and behavioral assessments.",
      icon: "fas fa-brain",
      features: ["Child Psychology", "Behavioral Therapy", "ADHD Management", "Anxiety Treatment"]
    },
    {
      id: 9,
      title: "Pediatric Surgery",
      description: "Minor surgical procedures performed by specialized pediatric surgeons in a child-friendly environment.",
      icon: "fas fa-cut",
      features: ["Minor Surgery", "Day Surgery", "Pre-op Preparation", "Post-op Care"]
    },
    {
      id: 10,
      title: "Allergy Testing & Treatment",
      description: "Comprehensive allergy testing and treatment for food allergies, environmental allergies, and asthma.",
      icon: "fas fa-allergies",
      features: ["Allergy Testing", "Food Allergy Management", "Environmental Allergies", "Asthma Care"]
    },
    {
      id: 11,
      title: "Respiratory Care",
      description: "Treatment for breathing disorders, asthma management, and respiratory health monitoring.",
      icon: "fas fa-lungs",
      features: ["Asthma Management", "Breathing Disorders", "Respiratory Therapy", "Lung Function Tests"]
    },
    {
      id: 12,
      title: "Developmental Assessments",
      description: "Early screening and assessment for developmental delays, autism spectrum disorders, and learning disabilities.",
      icon: "fas fa-puzzle-piece",
      features: ["Autism Screening", "Development Delays", "Learning Disabilities", "Early Intervention"]
    }
  ];

  // Diagnostic Services
  const diagnosticServices = [
    {
      id: 13,
      title: "Laboratory Testing",
      description: "Comprehensive laboratory services including blood work, urine tests, and other diagnostic tests.",
      icon: "fas fa-vial",
      features: ["Blood Tests", "Urine Analysis", "Culture Tests", "Genetic Testing"]
    },
    {
      id: 14,
      title: "Imaging Services",
      description: "Advanced imaging services including X-rays, ultrasounds, and other diagnostic imaging.",
      icon: "fas fa-x-ray",
      features: ["Digital X-rays", "Ultrasound", "CT Scans", "MRI Services"]
    },
    {
      id: 15,
      title: "Vision & Hearing Screening",
      description: "Early detection programs for vision and hearing problems to ensure proper development.",
      icon: "fas fa-eye",
      features: ["Vision Screening", "Hearing Tests", "Eye Examinations", "Hearing Aid Consultation"]
    },
    {
      id: 16,
      title: "Cardiac Screening",
      description: "Heart health monitoring and screening for congenital heart conditions and cardiac abnormalities.",
      icon: "fas fa-heartbeat",
      features: ["Heart Screening", "ECG Testing", "Cardiac Monitoring", "Congenital Heart Care"]
    }
  ];

  // Support Services
  const supportServices = [
    {
      id: 17,
      title: "Parent Education",
      description: "Educational programs and resources to help parents provide the best care for their children.",
      icon: "fas fa-graduation-cap",
      features: ["Parenting Classes", "Health Education", "Safety Training", "Development Guidance"]
    },
    {
      id: 18,
      title: "Telemedicine",
      description: "Virtual consultations and remote monitoring for convenient healthcare access from home.",
      icon: "fas fa-video",
      features: ["Virtual Consultations", "Remote Monitoring", "Online Prescriptions", "Digital Health Records"]
    },
    {
      id: 19,
      title: "24/7 Nurse Hotline",
      description: "Round-the-clock medical advice and support from qualified pediatric nurses.",
      icon: "fas fa-phone-alt",
      features: ["Medical Advice", "Health Questions", "Emergency Guidance", "Symptom Assessment"]
    },
    {
      id: 20,
      title: "Insurance Assistance",
      description: "Help with insurance coverage questions, claims processing, and payment options.",
      icon: "fas fa-file-medical-alt",
      features: ["Insurance Verification", "Claims Support", "Payment Plans", "Coverage Information"]
    }
  ];

  const getServices = (category) => {
    switch(category) {
      case 'general': return generalServices;
      case 'specialized': return specializedServices;
      case 'diagnostic': return diagnosticServices;
      case 'support': return supportServices;
      default: return generalServices;
    }
  };

  const ServiceCard = ({ service }) => (
    <div className="col-lg-6 col-md-6 mb-4" key={service.id}>
      <div className="service-card h-100">
        <div className="service-header">
          <div className="service-icon">
            <i className={service.icon}></i>
          </div>
          <div className="service-title-area">
            <h4 className="service-title">{service.title}</h4>
          </div>
        </div>
        <div className="service-body">
          <p className="service-description">{service.description}</p>
          <div className="service-features">
            <h6>Key Services:</h6>
            <ul className="feature-list">
              {service.features.map((feature, index) => (
                <li key={index}>
                  <i className="fas fa-check-circle"></i>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="service-page">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content">
                <h1 className="hero-title">
                  Comprehensive Pediatric Services
                </h1>
                <p className="hero-description">
                  Expert medical care for children from birth to 18 years. Our dedicated team of pediatricians 
                  provides comprehensive healthcare services in a warm, child-friendly environment.
                </p>
                <div className="hero-stats">
                  <div className="stat-item">
                    <div className="stat-number">4</div>
                    <div className="stat-label">Expert Doctors</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">2000+</div>
                    <div className="stat-label">Services</div>
                  </div>
                 
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image">
               
                <div className="floating-card">
                  <div className="floating-content">
                    <i className="fas fa-heart"></i>
                    <div>
                      <h6>Trusted Care</h6>
                      <p>1000+ Happy Families</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-header text-center mb-5">
                <h2 className="section-title">Our Medical Services</h2>
               
              </div>
            </div>
          </div>

          {/* Service Navigation */}
          <div className="row">
            <div className="col-12">
              <nav className="service-nav mb-5">
                <div className="nav nav-pills service-nav-pills" role="tablist">
                  <button 
                    className={`nav-link ${activeTab === 'general' ? 'active' : ''}`}
                    onClick={() => setActiveTab('general')}
                  >
                    <i className="fas fa-user-md"></i>
                    General Care
                  </button>
                  <button 
                    className={`nav-link ${activeTab === 'specialized' ? 'active' : ''}`}
                    onClick={() => setActiveTab('specialized')}
                  >
                    <i className="fas fa-stethoscope"></i>
                    Specialized
                  </button>
                  <button 
                    className={`nav-link ${activeTab === 'diagnostic' ? 'active' : ''}`}
                    onClick={() => setActiveTab('diagnostic')}
                  >
                    <i className="fas fa-microscope"></i>
                    Diagnostic
                  </button>
                  <button 
                    className={`nav-link ${activeTab === 'support' ? 'active' : ''}`}
                    onClick={() => setActiveTab('support')}
                  >
                    <i className="fas fa-hands-helping"></i>
                    Support
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Service Cards */}
          <div className="row service-cards-container">
            {getServices(activeTab).map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
