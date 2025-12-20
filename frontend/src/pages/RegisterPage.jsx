import React, { useState } from "react";
import { Eye, EyeOff, UserPlus, User, Mail, Lock, CheckCircle } from "lucide-react";
import { AUTH_ENDPOINTS } from "../config/api";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const nextStep = (e) => {
    e.preventDefault();
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setStep(2);
    }, 300);
  };

  const prevStep = (e) => {
    e.preventDefault();
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setStep(1);
    }, 300);
  };

  // 🔥 REAL BACKEND REGISTER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsAnimating(true);

    try {
      const response = await fetch(AUTH_ENDPOINTS.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: "farmer",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setStep(3); // ✅ success screen
    } catch (error) {
      alert(error.message);
    } finally {
      setIsAnimating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
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
                <UserPlus size={30} className="text-smart-green" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-smart-yellow">
              Create Account
            </h2>
            <p className="text-gray-200 mt-1">Join our community today</p>
          </div>

          {/* Form */}
          <div className={`p-6 space-y-6 ${step === 3 ? "text-center" : ""}`}>
            {step === 1 && (
              <form onSubmit={nextStep} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium">Full Name</label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>

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

                <button className="w-full py-2 bg-smart-green text-white rounded-md">
                  Continue
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-full py-2 border rounded-md"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isAnimating}
                    className="w-full py-2 bg-smart-green text-white rounded-md"
                  >
                    Register
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="py-8">
                <CheckCircle size={48} className="mx-auto text-green-500" />
                <h3 className="text-xl font-bold mt-4">
                  Registration Successful 🎉
                </h3>
                <a
                  href="/LoginPage"
                  className="inline-block mt-6 px-6 py-2 bg-smart-green text-white rounded-md"
                >
                  Go to Login
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
