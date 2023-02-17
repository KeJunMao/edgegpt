<div align="center">

# Edge GPT

_The reverse engineering the chat feature of the new version of Bing **WIP**_

</div>

## Quick Start

```bash
npx edgegpt --cookies=cookies.json
```

## CLI Usage

```bash
npx edgegpt [...args]
```

## Developer Usage

```ts
import { Chatbot, loadEdgeGPTConfig } from "edgegpt";
const config = await loadEdgeGPTConfig({
  cookies: options.cookies,
  async: options.async,
});

const chatBot = new ChatBot(config);
await chatBot.create();

console.log(await chatBot.askAsync("hello!"));
```

**Arguments:**

- `--async`: async, **false** will be used as default.
- `--cookies`: Cookie json file, **cookies.json** will be used as default.

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
