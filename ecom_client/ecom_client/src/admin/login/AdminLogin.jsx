import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [loginCustomer, setLoginCustomer] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log("Login clicked");
        try {
            const baseUrl = "http://localhost:8080"; // backend server
            const response = await axios.post(
                `${baseUrl}/admin/login`,
                loginCustomer,
                { headers: { "Content-Type": "application/json" } }
            );

            // if backend sends { token: "..." }
            localStorage.setItem("token", response.data.token);

            alert("Welcome to app. You have logged in successfully.");
            navigate("/admin");
        } catch (err) {
            console.error("Login error:", err);
            alert("Login failed. Check console/network tab for details.");
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/admin");
        }
    }, [navigate]);

    return (
        <>
            <h3>Login</h3>
            <div className="container">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Username (email)</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            value={loginCustomer.email}
                            onChange={(e) =>
                                setLoginCustomer({ ...loginCustomer, email: e.target.value })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={loginCustomer.password}
                            onChange={(e) =>
                                setLoginCustomer({ ...loginCustomer, password: e.target.value })
                            }
                        />
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </form>
            </div>
        </>
    );
}
