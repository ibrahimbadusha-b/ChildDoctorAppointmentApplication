import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { doctors } from "../api/mockData";
import DoctorCard from "../components/DoctorCard.jsx";
import HeroBanner from "../components/HeroBanner.jsx";
import "./common.css";
import HealthBenefitsSection from "../components/HealthBenefitsSection.jsx";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <HeroBanner />

      {/* Doctors */}
     <section className="doctors-section">
  
  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
    {doctors.map(d => (
      <DoctorCard key={d.id} doctor={d} onBook={(doc) => navigate(`/book?doctorId=${doc.id}`)} />
    ))}
  </div>
</section>
   <section>
    <HealthBenefitsSection />
   </section>
    </div>
  );
}
