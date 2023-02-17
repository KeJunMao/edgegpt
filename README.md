<div align="center">

[![Bing](./assets/bing.svg)][bing-href]
[![Bing](./assets/node.svg)][node-href]

# Edge GPT

_The reverse engineering the chat feature of the new version of Bing **WIP**_

[![npm version][npm-version-src]][npm-version-href]

</div>

> **Warning**
>
> By using this library, you are breaking Microsoft TOS. Be careful of account suspension. I have tried my best to spoof headers and tls fingerprint

## Quick Start

```bash
npx edgegpt
```

## CLI Usage

```bash
npx edgegpt [options]
```

**Arguments:**

- `--stream`: Used stream mode, **true** will be used as default, you can use `--no-stream` to set `false`.
- `-f, --cookie-file`: Cookie json file path, **cookie.json** will be used as default.

## Module Usage

```ts
import { Chatbot, loadEdgeGPTConfig } from "edgegpt";
const config = await loadEdgeGPTConfig();

const chatBot = new ChatBot(config);
await chatBot.create();

console.log(await chatBot.askAsync("hello!"));
```

## Configuration

Configuration is loaded by [unjs/c12](https://github.com/unjs/c12) from cwd. You can use either `edgegpt.config.json`, `edgegpt.config.{ts,js,mjs,cjs}`, `.edgegptrc`.

See [./src/config.ts](./src/config.ts) for available options and defaults.

## 💻 Development

- Clone this repository
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

## License

Made with 💛

Published under [MIT License](./LICENSE).

## Acknowledgement

- [EdgeGPT](https://github.com/acheong08/EdgeGPT/)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/edgegpt?style=flat-square
[npm-version-href]: https://npmjs.com/package/edgegpt
[bing-href]: https://www.bing.com/search?q=Bing+AI&showconv=1
[node-href]: https://nodejs.org
