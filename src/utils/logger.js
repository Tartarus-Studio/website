/**
 * Logger Utility
 * Centralized logging with different levels and formatting
 */

export class Logger {
  static LOG_LEVELS = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 3
  };

  static currentLevel = Logger.LOG_LEVELS.INFO;

  /**
   * Set logging level
   */
  static setLevel(level) {
    Logger.currentLevel = level;
  }

  /**
   * Log error messages
   */
  static error(message, ...args) {
    if (Logger.currentLevel >= Logger.LOG_LEVELS.ERROR) {
      console.error(`❌ [ERROR] ${message}`, ...args);
    }
  }

  /**
   * Log warning messages
   */
  static warn(message, ...args) {
    if (Logger.currentLevel >= Logger.LOG_LEVELS.WARN) {
      console.warn(`⚠️ [WARN] ${message}`, ...args);
    }
  }

  /**
   * Log info messages
   */
  static info(message, ...args) {
    if (Logger.currentLevel >= Logger.LOG_LEVELS.INFO) {
      console.info(`ℹ️ [INFO] ${message}`, ...args);
    }
  }

  /**
   * Log debug messages
   */
  static debug(message, ...args) {
    if (Logger.currentLevel >= Logger.LOG_LEVELS.DEBUG) {
      console.log(`🐛 [DEBUG] ${message}`, ...args);
    }
  }

  /**
   * Log success messages
   */
  static success(message, ...args) {
    if (Logger.currentLevel >= Logger.LOG_LEVELS.INFO) {
      console.log(`✅ [SUCCESS] ${message}`, ...args);
    }
  }
}
