// ===============================
// API CONFIGURATION (AgriSync)
// ===============================

// Backend Base URLs
const API_CONFIG = {
  PRODUCTION_URL: "https://agrisync-backend-nvq0.onrender.com",
  DEVELOPMENT_URL: "http://localhost:5000", // 👈 backend port (NOT 8000)

  getApiUrl: () => {
    if (
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1"
    ) {
      return API_CONFIG.PRODUCTION_URL;
    }
    return API_CONFIG.DEVELOPMENT_URL;
  },
};

// Base API URL
export const API_URL = API_CONFIG.getApiUrl();

// ===============================
// AUTH & USER ENDPOINTS
// ===============================
export const AUTH_ENDPOINTS = {
  REGISTER: `${API_URL}/api/auth/register`,
  LOGIN: `${API_URL}/api/auth/login`,
  PROFILE: `${API_URL}/api/users/profile`,
};

// ===============================
// SOIL & CROP ENDPOINTS
// ===============================
export const SOIL_ENDPOINTS = {
  RECOMMEND: `${API_URL}/api/soil/recommend`,
};

export const CROP_ENDPOINTS = {
  ALL: `${API_URL}/api/crops`,
};

// ===============================
// MARKET ENDPOINTS
// ===============================
export const MARKET_ENDPOINTS = {
  RECOMMEND: `${API_URL}/api/market/recommend`,
};

// ===============================
// SMART FINAL RECOMMENDATION
// ===============================
export const SMART_ENDPOINTS = {
  FINAL: `${API_URL}/api/recommendation/final`,
};

// ===============================
// ADMIN ENDPOINTS
// ===============================
export const ADMIN_ENDPOINTS = {
  ADD_CROP: `${API_URL}/api/admin/data/crop`,
  ADD_MARKET: `${API_URL}/api/admin/data/market`,
  DASHBOARD: `${API_URL}/api/admin/dashboard`,
};

// ===============================
// ML / AI ENDPOINTS (existing)
// ===============================
export const ML_ENDPOINTS = {
  PREDICT_DISEASE: `${API_URL}/predict`,
  PREDICT_SOIL: `${API_URL}/predict-soil`,
  MARKET_PREDICTIONS: `${API_URL}/market-predictions`,
  HEALTH_CHECK: `${API_URL}/health`,
  DETAILED_HEALTH: `${API_URL}/healthz`,
};

export default API_CONFIG;

export const ENDPOINTS = {
  HEALTH_CHECK: `${API_URL}/health`,
  DETAILED_HEALTH: `${API_URL}/healthz`,
};

