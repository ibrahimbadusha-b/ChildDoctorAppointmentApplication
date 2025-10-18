import React, { useMemo, useState } from "react";
import { doctors } from "../api/mockData";
import DoctorCard from "../components/DoctorCard.jsx";
import { useNavigate } from "react-router-dom";

export default function Doctors() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const filtered = useMemo(
    () => doctors.filter(d =>
      (d.name + d.specialization).toLowerCase().includes(q.toLowerCase())
    ),
    [q]
  );

  return (
    <div className="container mt-3">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {filtered.map(d => (
          <DoctorCard key={d.id} doctor={d} onBook={(doc) => navigate(`/book?doctorId=${doc.id}`)} />
        ))}
        {filtered.length === 0 && <p className="text-muted">No matches.</p>}
      </div>
    </div>
  );
}
