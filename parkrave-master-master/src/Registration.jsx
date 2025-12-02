import React, { useState } from "react";
import './registration.css';
import img4 from './Assets/name.png';
import img1 from './Assets/mail2.png';
import img2 from './Assets/pass3.png';
import img3 from './Assets/phone2.png';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Registration = () => {
    const navigate =useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isPlotOwner, setIsPlotOwner] = useState(null);
    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Validate form fields
    const validate = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = "Name is required.";
        if (!formData.phone || !/^\d{10}$/.test(formData.phone))
            tempErrors.phone = "Valid 10-digit phone number is required.";
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
            tempErrors.email = "Valid email is required.";
        if (!formData.password) tempErrors.password = "Password is required.";
        if (formData.password !== formData.confirmPassword)
            tempErrors.confirmPassword = "Passwords do not match.";
        if (isPlotOwner === null)
            tempErrors.isPlotOwner = "Please select if you are a plot owner.";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!validate()) {
            return;
        }

        const payload = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            password: formData.password,
        };

        try {
            if (isPlotOwner) {
                // Call plot owner API
                const response = await axios.post("http://localhost:8081/api/add/addPlotOwner", payload);
                alert("Plot owner registered successfully!");
            } else {
                // Call regular user registration API
                const response = await axios.post("http://localhost:8081/api/add/addUser", payload);
                alert("User registered successfully!");
            }
            navigate("/")
        } catch (error) {
            console.error("Registration error:", error);
            alert("An error occurred during registration. Please try again.");
        }
    };

    return (
        <div className="container">
            <div className="ll">
                <div className="main1">
                    <span className="head1">Get started!</span>
                    <span className="font1">Let's register your account</span>
                    
                    <div className="bb1">
                    <img className="img4" src={img4} alt="name icon" />
                        <input
                            className="bbb1"
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <div className="error">{errors.name}</div>}
                    </div>
                    <div className="dd">
                    <img className="img3" src={img3} alt="phone icon" />
                        <input
                            className="bbb1"
                            type="text"
                            name="phone"
                            placeholder="Enter your phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <div className="error">{errors.phone}</div>}
                    </div>
                    <div className="bb1">
                        <img className="img1" src={img1} alt="Mail Icon" />
                        <input
                            className="bbb1"
                            type="text"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>
                    <div className="bb1">
                        <img className="img1" src={img2} alt="Password Icon" />
                        <input
                            className="bbb1"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <div className="error">{errors.password}</div>}
                    </div>
                    <div className="bb1">
                        <img className="img1" src={img2} alt="Confirm Password Icon" />
                        <input
                            className="bbb1"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                    </div>

                    <div className="plot-owner-section">
                        <span className="font1">Are you a plot owner?</span>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="plotOwner"
                                    value="yes"
                                    onChange={() => setIsPlotOwner(true)}
                                />
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="plotOwner"
                                    value="no"
                                    onChange={() => setIsPlotOwner(false)}
                                />
                                No
                            </label>
                        </div>
                        {errors.isPlotOwner && <div className="error">{errors.isPlotOwner}</div>}
                    </div>

                    <input
                        className="nn"
                        type="button"
                        value="Register Now"
                        onClick={handleSubmit}
                    />
                    <Link to="/">
                        <div className="font1">or sign in!</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Registration;
