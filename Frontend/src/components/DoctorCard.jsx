import React from "react";
import "./DoctorCard.css";

export default function DoctorCard({ doctor, onBook }) {
  const getDoctorDetails = (doctor) => {
    const hospitalInfo = {
      hospital: "KidCare Children's Hospital",
      location: "Medical District, Mumbai",
      address: "123 Healthcare Avenue, Andheri East, Mumbai - 400069"
    };

    const doctorSpecificDetails = {
      "Dr. Priya Sharma": {
        qualification: "MBBS, MD Pediatrics",
        experience: "12+ years",
        consultationFee: "₹800",
        specialties: ["General Child Care", "Vaccination", "Growth Monitoring"],
        timing: "8:00 AM - 5:00 PM"
      },
      "Dr. Rajesh Kumar": {
        qualification: "MBBS, MD Pediatrics, DM Neonatology",
        experience: "5+ years",
        consultationFee: "₹1200",
        specialties: ["Newborn Care", "NICU Management", "Premature Babies"],
        timing: "9:00 AM - 6:00 PM"
      },
      "Dr. Kavitha Menon": {
        qualification: "MBBS, MS Surgery, MCh Pediatric Surgery",
        experience: "8+ years",
        consultationFee: "₹1500",
        specialties: ["Pediatric Surgery", "Hernia Repair", "Congenital Defects"],
        timing: "7:30 AM - 4:00 PM"
      },
      "Dr. Arjun Reddy": {
        qualification: "MBBS, MD Psychiatry, Fellowship Child Psychology",
        experience: "10+ years",
        consultationFee: "₹1000",
        specialties: ["Behavioral Issues", "ADHD Treatment", "Child Counseling"],
        timing: "9:00 AM - 6:00 PM"
      }
    };

    const specificInfo = doctorSpecificDetails[doctor.name] || doctorSpecificDetails["Dr. Priya Sharma"];
    
    return {
      ...hospitalInfo,
      ...specificInfo
    };
  };

  const doctorDetails = getDoctorDetails(doctor);

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <div className="doctor-card" id="doctorCard">
        {/* Doctor Image Section */}
        <div className="doctor-image-container">
          <img 
            src={doctor.image} 
            alt={`${doctor.name} - ${doctor.specialization}`}
            className="doctor-image"
            loading="lazy"
          />
          
         
        </div>

        {/* Doctor Information Section */}
        <div className="doctor-info">
          {/* Header */}
          <div className="doctor-header">
            <h3 className="doctor-name">{doctor.name}</h3>
            <p className="doctor-specialization">
              {doctor.specialization}
            </p>
            <p className="doctor-qualification">
              <i className="fas fa-graduation-cap qualification-icon"></i>
              {doctorDetails.qualification}
            </p>
          </div>

          {/* Experience and Hospital */}
          <div className="doctor-credentials">
            <div className="credential-item">
              <i className="fas fa-user-md credential-icon"></i>
              <span className="credential-text text-dark">{doctorDetails.experience} Experience</span>
            </div>
           
          </div>

          {/* Availability */}
          <div className="availability-info">
            <div className="availability-item">
              <i className="fas fa-calendar-check availability-icon"></i>
              <div className="availability-details">
                <span className="available-days">Available: {doctor.days}</span>
                <span className="timing">
                  <i className="fas fa-clock timing-icon"></i>
                  {doctorDetails.timing}
                </span>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="specialties-section">
            <h4 className="specialties-title">
              <i className="fas fa-stethoscope specialties-icon"></i>
              Specialties
            </h4>
            <div className="specialties-tags">
              {doctorDetails.specialties.map((specialty, index) => (
                <span key={index} className="specialty-tag">
                  <i className="fas fa-check-circle specialty-check"></i>
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Book Appointment Button */}
          <button 
            className="book-appointment-btn"
            onClick={() => onBook(doctor)}
            aria-label={`Book appointment with ${doctor.name}`}
          >
            <i className="fas fa-calendar-plus btn-icon"></i>
            <span>Book Appointment</span>
          </button>
        </div>
      </div>
    </div>
  );
}