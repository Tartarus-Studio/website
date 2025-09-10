/**
 * Main Entry Point
 * Initialize and start the Tartarus Studio application
 */

import { TartarusApp } from './TartarusApp.js';

// Initialize the application
const app = new TartarusApp();

// Make app available globally for debugging (development only)
if (typeof window !== 'undefined') {
  window.TartarusApp = app;
}

// Export for module usage
export default app;
