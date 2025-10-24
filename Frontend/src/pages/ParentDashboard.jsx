import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase-config";

export default function ParentDashboard() {
  const user = auth.currentUser;
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        let url = "";
        if (user.email === "admin@gmail.com") {
          url = "https://child-doctor-appointment-application.vercel.app/api/users/getUsersData";
        } else {
          url = `https://child-doctor-appointment-application.vercel.app/api/users/singleUserData/${user.email}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setAppointments(data.userDatas || []);
      } catch (err) {
        console.log(err);
      }
    };

    getAllUsers();
  }, []);

  const deleteHandler = async (id) => {
    await fetch(`https://child-doctor-appointment-application.vercel.app/api/users/cancelAppointment/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    });

    setAppointments((prev) => prev.filter((user) => user._id !== id));
  };

  return (
    <div className="container py-4">
      <h1 className="h3 text-center fw-bold text-success mb-4">
        {user.email === "admin@gmail.com" ? "Admin Dashboard" : "My Appointments"}
      </h1>

      {appointments.length === 0 ? (
        <div className="text-center text-muted fs-5">No appointments found.</div>
      ) : (
        appointments.map((user) => (
          <div className="card mb-4 shadow-sm border-0 rounded-3" key={user._id}>
            <div className="card-body">
              <div className="mb-2">
                <span className="fw-semibold text-secondary">Email:</span>{" "}
                <span className="fw-bold text-dark">{user.authEmail}</span>
              </div>

              <div className="row mb-2 text-capitalize">
                <div className="col-md-3 col-12 mb-2">
                  <span className="fw-semibold text-secondary">Doctor:</span>{" "}
                  <span className="text-primary fw-medium">{user.doctorName}</span>
                </div>
                <div className="col-md-2 col-12 mb-2">
                  <span className="fw-semibold text-secondary">Date:</span>{" "}
                  <span className="fw-bold text-success">{user.date}</span>
                </div>
                <div className="col-md-2 col-6 mb-2">
                  <span className="fw-semibold text-secondary">Time:</span>{" "}
                  <span className="fw-bold text-success">{user.time}</span>
                </div>
                <div className="col-md-2 col-6 mb-2">
                  <span className="fw-semibold text-secondary">Child:</span>{" "}
                  <span className="text-dark fw-semibold">{user.childName}</span>
                </div>
                <div className="col-md-1 col-3 mb-2">
                  <span className="fw-semibold text-secondary">Age:</span>{" "}
                  <span className="fw-semibold text-dark">{user.childAge}</span>
                </div>
                <div className="col-md-2 col-9 mb-2">
                  <span className="fw-semibold text-secondary">Phone:</span>{" "}
                  <span className="text-dark">{user.phone}</span>
                </div>
              </div>

              <div className="mb-3">
                <span className="fw-semibold text-secondary">Issue:</span>{" "}
                <span className="fst-italic text-muted">{user.issue}</span>
              </div>

              <div className="text-end">
                <button
                  className="btn btn-outline-danger btn-sm fw-semibold px-3"
                  onClick={() => deleteHandler(user._id)}
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
