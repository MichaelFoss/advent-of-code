const logLevel = (logLevel, ...args) => {
  if (Number.isInteger(Number(process.env.DEBUG)) && Number(process.env.DEBUG) >= logLevel) {
    console.log(...args);
  }
};

/**
 * Used for very verbose logging.
 * Logs if level >= 3.
 * @param {...any} args
 */
const log3 = (...args) => logLevel(3, ...args);
/**
 * Used for verbose logging.
 * Logs if level >= 2.
 * @param {...any} args
 */
const log2 = (...args) => logLevel(2, ...args);
/**
 * Used for more-detailed logging.
 * Logs if level >= 1.
 * @param {...any} args
 */
const log1 = (...args) => logLevel(1, ...args);
/**
 * Used for logging when logging is turned on.
 * Logs if level >= 0.
 * @param {...any} args
 */
const log0 = (...args) => logLevel(0, ...args);
/**
 * Alias for log0.
 * Used for logging when logging is turned on.
 * Logs if level >= 0.
 * @param {...any} args
 */
const log = (...args) => logLevel(0, ...args);

module.exports = {
  log,
  log0,
  log1,
  log2,
  log3,
};
