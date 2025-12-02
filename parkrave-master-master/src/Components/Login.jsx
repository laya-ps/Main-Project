import React, { useState } from "react";
import './login.css';
import img1 from '../Assets/mail2.png';
import img2 from '../Assets/pass3.png';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdminLogin, setIsAdminLogin] = useState(false); // Toggle for Admin login
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError(""); // Reset error message
        if (!email || !password) {
            setError("Email and Password are required.");
            return;
        }

        try {
            const url = isAdminLogin
                ? "http://localhost:8081/api/auth/AdminLogin"
                : "http://localhost:8081/api/auth/login";

            const response = await axios.post(url, { email, password });
            const { user } = response.data;

            console.log(user);

            // Save to localStorage
            localStorage.setItem("user", JSON.stringify(user));

            // Redirect based on userType
            if (isAdminLogin) {
                navigate("/AdminHome");
            } else if (user.user_type === "Plot Owner") {
                navigate("/Ownerhome");
            } else if (user.user_type === "User") {
                navigate("/UserHome");
            } else {
                setError("Unknown user type. Please contact support.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="lcontainer">
            <div className="cc">
                <div className="main">
                    <span className="head">{isAdminLogin ? "ADMIN SIGN IN" : "SIGN IN!"}</span>
                    <span className="font">
                        {isAdminLogin
                            ? "Enter admin credentials to access the portal"
                            : "Begin your journey with Porta"}
                    </span>

                    <div className="bb">
                        <img className="img1" src={img1} alt="Mail Icon" />
                        <input
                            className="bbb"
                            type="text"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="bb">
                        <img className="img1" src={img2} alt="Password Icon" />
                        <input
                            className="bbb"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <div className="error">{error}</div>}

                        <input
                            className="aa"
                            type="button"
                            value={isAdminLogin ? "Login as Admin" : "Login Now"}
                            onClick={handleLogin}
                        />

                    {!isAdminLogin && (
                        <Link to="/Register">
                            <div className="font">or register</div>
                        </Link>
                    )}

                    <div className="toggle">
                        <span
                            className="toggle-link"
                            onClick={() => setIsAdminLogin(!isAdminLogin)}
                        >
                            {isAdminLogin ? "Login as User/Plot Owner" : "Login as Admin"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
