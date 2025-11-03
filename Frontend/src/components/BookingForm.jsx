import React, { useState } from "react";
import { doctors, timeSlots } from "../api/mockData";
import "./BookingForm.css";
import { auth } from "../config/firebase-config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BookingForm({ preselectedDoctorId }) {
  const user = auth.currentUser;

  const [form, setForm] = useState({
    authEmail: user.email,
    doctorName: preselectedDoctorId || "",
    date: "",
    time: "",
    childName: "",
    childAge: "",
    phone: "",
    issue: ""
  });


  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.doctorName) newErrors.doctorName = "Please select a doctor";
    if (!form.date) newErrors.date = "Please select a date";
    if (!form.time) newErrors.time = "Please select a time";
    if (!form.childName.trim()) newErrors.childName = "Child's name is required";
    if (!form.childAge) newErrors.childAge = "Child's age is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.issue.trim()) newErrors.issue = "Please describe the health issue";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    fetch("https://child-doctor-appointment-application.vercel.app/api/users/storeUserData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    }).then((res) => res.json()).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    })

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const selectedDoctor = doctors.find(d => d.id == form.doctorName);

      toast.success("Appointment Booked Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: "#14532d", 
          color: "#fff",
          fontWeight: "500",
        },
      });
      setForm({
        authEmail: user.email,
        doctorName: "", date: "", time: "", childName: "", childAge: "",
        phone: "", issue: ""
      });

    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedDoctor = doctors.find(d => d.name == form.doctorName);

  return (
    <div className="booking-form-container">
      <div className="booking-form-header">
        <h2 className="form-title">
          <i className="fas fa-calendar-plus"></i>
          Book Appointment
        </h2>
        <p className="form-subtitle">Schedule your child's consultation</p>
      </div>

      <form className="professional-booking-form" onSubmit={handleSubmit}>

        {/* Doctor & DateTime Row */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Select Doctor :</label>
            <div className="select-wrapper">
              <select
                className={`form-control ${errors.doctorName ? 'error' : ''}`}
                name="doctorName"
                value={form.doctorName}
                onChange={handleChange}
              >
                <option value="">Choose Doctor...</option>
                {doctors.map(d => (
                  <option key={d.id} value={d.name}>
                    {d.name} - {d.specialization}
                  </option>
                ))}
              </select>
              <i className="fas fa-chevron-down select-arrow"></i>
            </div>
            {errors.doctorName && <span className="error-message">{errors.doctorName}</span>}
          </div>

          <div className="form-group-half">
            <div className="form-group">
              <label className="form-label">Date :</label>
              <input
                className={`form-control ${errors.date ? 'error' : ''}`}
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Time :</label>
              <div className="select-wrapper">
                <select
                  className={`form-control ${errors.time ? 'error' : ''}`}
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                >
                  <option value="">Select Time...</option>
                  {timeSlots.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <i className="fas fa-chevron-down select-arrow"></i>
              </div>
              {errors.time && <span className="error-message">{errors.time}</span>}
            </div>
          </div>
        </div>

        {/* Patient Info Row */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Child's Name :</label>
            <input
              className={`form-control ${errors.childName ? 'error' : ''}`}
              type="text"
              name="childName"
              placeholder="Enter child's full name"
              value={form.childName}
              onChange={handleChange}
            />
            {errors.childName && <span className="error-message">{errors.childName}</span>}
          </div>

          <div className="form-group-small">
            <label className="form-label">Age :</label>
            <input
              className={`form-control ${errors.childAge ? 'error' : ''}`}
              type="number"
              name="childAge"
              placeholder="Age"
              min="0"
              max="18"
              value={form.childAge}
              onChange={handleChange}
            />
            {errors.childAge && <span className="error-message">{errors.childAge}</span>}
          </div>
        </div>

        {/* Parent Info Row */}
        <div className="form-row">

          <div className="form-group">
            <label className="form-label">Phone Number :</label>
            <input
              className={`form-control ${errors.phone ? 'error' : ''}`}
              type="tel"
              name="phone"
              placeholder="+91"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
        </div>

        {/* Issue Description */}
        <div className="form-group">
          <label className="form-label">Health Issue/Concern :</label>
          <textarea
            className={`form-control ${errors.issue ? 'error' : ''}`}
            name="issue"
            rows="3"
            placeholder="Please describe symptoms or reason for visit..."
            value={form.issue}
            onChange={handleChange}
          ></textarea>
          {errors.issue && <span className="error-message">{errors.issue}</span>}
        </div>

        {/* Submit Button */}
        <button
          className={`btn-book-appointment ${isSubmitting ? 'loading' : ''}`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="spinner"></div>
              <span>Booking...</span>
            </>
          ) : (
            <>
              <i className="fas fa-calendar-check"></i>
              <span>Book Appointment</span>
            </>
          )}
        </button>
      </form>
      <div className="booking-form-container">
        <ToastContainer />
      </div>
    </div>
  );
}
