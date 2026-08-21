/**
 * Simple logging utility
 * Can be replaced with a more robust solution (e.g., Pino, Winston) in production
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentLevel: LogLevel =
  (process.env.LOG_LEVEL as LogLevel) ||
  (process.env.NODE_ENV === "production" ? "info" : "debug");

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[currentLevel];
}

function formatEntry(entry: LogEntry): string {
  if (process.env.NODE_ENV === "production") {
    // JSON format for production (easier to parse in log aggregators)
    return JSON.stringify(entry);
  }

  // Human-readable format for development
  const { level, message, timestamp, data, error } = entry;
  let output = `[${timestamp}] ${level.toUpperCase()}: ${message}`;

  if (data) {
    output += `\n  Data: ${JSON.stringify(data, null, 2)}`;
  }

  if (error) {
    output += `\n  Error: ${error.name}: ${error.message}`;
    if (error.stack) {
      output += `\n  Stack: ${error.stack}`;
    }
  }

  return output;
}

function createEntry(
  level: LogLevel,
  message: string,
  data?: unknown,
  error?: Error
): LogEntry {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
  };

  if (data !== undefined) {
    entry.data = data;
  }

  if (error) {
    entry.error = {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return entry;
}

function log(
  level: LogLevel,
  message: string,
  data?: unknown,
  error?: Error
): void {
  if (!shouldLog(level)) return;

  const entry = createEntry(level, message, data, error);
  const formatted = formatEntry(entry);

  switch (level) {
    case "debug":
      console.debug(formatted);
      break;
    case "info":
      console.info(formatted);
      break;
    case "warn":
      console.warn(formatted);
      break;
    case "error":
      console.error(formatted);
      break;
  }
}

/**
 * Logger instance
 */
/**
 * Child logger type
 */
export interface ChildLogger {
  debug: (message: string, data?: unknown) => void;
  info: (message: string, data?: unknown) => void;
  warn: (message: string, data?: unknown) => void;
  error: (message: string, error?: Error, data?: unknown) => void;
}

/**
 * Creates a child logger with a prefix
 */
function createChildLogger(prefix: string): ChildLogger {
  return {
    debug: (message: string, data?: unknown) =>
      log("debug", `[${prefix}] ${message}`, data),
    info: (message: string, data?: unknown) =>
      log("info", `[${prefix}] ${message}`, data),
    warn: (message: string, data?: unknown) =>
      log("warn", `[${prefix}] ${message}`, data),
    error: (message: string, error?: Error, data?: unknown) =>
      log("error", `[${prefix}] ${message}`, data, error),
  };
}

export const logger = {
  /**
   * Debug level logging - for detailed debugging info
   */
  debug: (message: string, data?: unknown) => log("debug", message, data),

  /**
   * Info level logging - for general information
   */
  info: (message: string, data?: unknown) => log("info", message, data),

  /**
   * Warning level logging - for potential issues
   */
  warn: (message: string, data?: unknown) => log("warn", message, data),

  /**
   * Error level logging - for errors
   */
  error: (message: string, error?: Error, data?: unknown) =>
    log("error", message, data, error),

  /**
   * Creates a child logger with a prefix
   */
  child: createChildLogger,
};

export type Logger = typeof logger;
