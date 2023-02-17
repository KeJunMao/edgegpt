import { loadConfig } from "c12";
import { readFileSync } from "fs";
import { resolve } from "path";
import { EdgeGPTConfig, ResolvedEdgeGPTConfig } from "./types";
import { logger } from "./utils";

const configDefaults: EdgeGPTConfig = {
  cookies: "cookies.json",
  async: false,
};

export const loadEdgeGPTConfig = async (
  overrides?: Partial<EdgeGPTConfig>,
  cwd = process.cwd()
) => {
  const { config } = await loadConfig<EdgeGPTConfig>({
    name: "edgegpt",
    defaults: configDefaults,
    overrides: {
      ...(overrides as EdgeGPTConfig),
    },
    cwd,
  });
  if (!config?.cookies) {
    const error = new Error(`Cookies can not be empty!`);
    logger.error(error);
    throw error;
  }
  if (typeof config?.cookies === "string") {
    config.cookies = [config.cookies];
  }
  config.cookies = config.cookies.map((c) => {
    const f = readFileSync(resolve(cwd, c), {
      encoding: "utf-8",
    });
    return JSON.parse(f);
  });
  return config as unknown as ResolvedEdgeGPTConfig;
};
