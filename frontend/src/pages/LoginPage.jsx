import React, { useState } from "react";
import { Eye, EyeOff, LogIn, User, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AUTH_ENDPOINTS } from "../config/api";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 🔥 REAL BACKEND LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAnimating(true);

    try {
      const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Save token & user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Redirect
      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsAnimating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <div
          className={`bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-500 ${
            isAnimating ? "scale-95 opacity-80" : "scale-100"
          }`}
        >
          {/* Header */}
          <div className="bg-smart-green p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-smart-yellow rounded-full p-3 shadow-lg">
                <User size={30} className="text-smart-green" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-smart-yellow">
              Welcome Back
            </h2>
            <p className="text-gray-200 mt-1">Login to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isAnimating}
              className="w-full py-2 bg-smart-green text-white rounded-md"
            >
              {isAnimating ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center pb-6">
            <a
              href="/RegisterPage"
              className="text-smart-green font-medium hover:text-smart-yellow"
            >
              Create new account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
