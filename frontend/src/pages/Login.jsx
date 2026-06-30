import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {

    e.preventDefault();

    try {

        const formData = new URLSearchParams();
        formData.append("grant_type", "password");
        formData.append("username", username);
        formData.append("password", password);

        const response = await api.post(
            "/auth/login",
            formData,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        login(response.data.access_token);

        navigate("/dashboard");

    } catch (err) {

    console.log(err);

    console.log(err.response);

    console.log(err.response?.data);

    alert(JSON.stringify(err.response?.data));

}

}

    return (

        <div style={{ padding: "40px" }}>

            <h1>RecallOS Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <br /><br />

                <button>

                    Login

                </button>

            </form>

        </div>

    );

}

export default Login;
