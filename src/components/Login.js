import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"

const Login = () => {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${api}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user)); // Store user session
        navigate("/"); // Redirect to home
        alert("Login successful!");
        window.location.reload(); 
        console.log("✅ Login Response:", data);        
      }else{
        throw new Error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      alert(error.message);
      console.error("❌ Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[70vh] items-center justify-center bg-[#3992CE] px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Phone Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter phone number"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
