const TAG = "DUPAN-V2";

type LOG_LEVEL = "warn" | "info" | "log" | "error" | "debug";

const logFactory = (level: LOG_LEVEL) => {
  if (process.env.NODE_ENV !== "development") {
    return (..._: unknown[]) => {};
  }

  const logger = console[level];
  return (...args: unknown[]): void => {
    if (typeof args[0] === "string") {
      args[0] = `[${TAG}] ${args[0]}`;
    } else {
      args.unshift("[${TAG}] ");
    }

    logger(...args);
  };
};

export const log = logFactory("log");
export const warn = logFactory("warn");
export const info = logFactory("info");
export const error = logFactory("error");
export const debug = logFactory("debug");
