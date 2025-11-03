import React from "react";
import { useSearchParams } from "react-router-dom";
import BookingForm from "../components/BookingForm.jsx";

export default function Book() {
  const [params] = useSearchParams();
  const preId = params.get("doctorId") || "";

  return (
    <div className="container" style={{maxWidth: 900}}>
      <BookingForm preselectedDoctorId={preId} />
    </div>
  );
}
