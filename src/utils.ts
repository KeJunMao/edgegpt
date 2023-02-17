import consola from "consola";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { DELIMITER } from "./constant";
import { Cookie } from "./types";

export const logger = consola.create({
  defaults: {
    tag: "edgegpt",
  },
});

export const createForwardedIp = () => {
  return `13.${_.random(104, 107)}.${_.random(0, 255)}.${_.random(0, 255)}`;
};

export const createHeaders = () => {
  return {
    accept: "application/json",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "sec-ch-ua":
      '"Not_A Brand";v="99", "Microsoft Edge";v="109", "Chromium";v="109"',
    "sec-ch-ua-arch": '"x86"',
    "sec-ch-ua-bitness": '"64"',
    "sec-ch-ua-full-version": '"109.0.1518.78"',
    "sec-ch-ua-full-version-list":
      '"Not_A Brand";v="99.0.0.0", "Microsoft Edge";v="109.0.1518.78", "Chromium";v="109.0.5414.120"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-model": "",
    "sec-ch-ua-platform": '"Windows"',
    "sec-ch-ua-platform-version": '"15.0.0"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-ms-client-request-id": uuidv4(),
    "x-ms-useragent":
      "azsdk-js-api-client-factory/1.0.0-beta.1 core-rest-pipeline/1.10.0 OS/Win32",
    Referer: "https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=hpcodx",
    "Referrer-Policy": "origin-when-cross-origin",
    "x-forwarded-for": createForwardedIp(),
  };
};

export const appendIdentifier = (msg: object) =>
  JSON.stringify(msg) + DELIMITER;

export const stringifyCookie = (cookie: Cookie) =>
  cookie.reduce((pre, cur) => {
    pre += `${cur.name}=${cur.value};`;
    return pre;
  }, "");
