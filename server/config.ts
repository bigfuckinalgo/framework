// All configurations will extend these options
// ============================================
export const config = {

  // Error Handling in helpers.js
  errorHandlingDisabled: false,

  // Demo/Simulation Mode
  simulationMode: false,

  // Server host
  host: process.env.HOST || '0.0.0.0' || 'localhost',

  // Server port
  port: 3030,

};

export default config;
