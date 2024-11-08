// client/src/config.js

const config = {
    PORT: process.env.Port || "5050",
    API_URL: process.env.VITE_API_URL || "http://localhost:5050",
    ATLAS_URI: process.env.ATLAS_URI || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
  };
  
  export default config;
  