<div align="center">

[![Bing](./assets/bing.svg)][bing-href]
[![Bing](./assets/node.svg)][node-href]

# Edge GPT

_new Bing 的聊天功能的逆向工程_

[![npm version][npm-version-src]][npm-version-href]

</div>

[English](./README.md) | 简体中文

## 快速开始

```shell
npx edgegpt
```

## 命令行用法

```shell
npx edgegpt -h
Usage: edgegpt [options]

        !reset Reset the conversation
        !exit Exit the program

Options:
  -f, --cookie-file  Cookie file path                     [default: cookie.json]
      --stream       Used stream mode                  [boolean] [default: true]
  -h, --help         Show help                                         [boolean]
  -v, --version      Show version number                               [boolean]

Examples:
  edgegpt -f cookie.json

Repo: https://github.com/kejunmao/edgegpt
By: KeJun
License: MIT
```

**参数:**

- `--stream`: Used stream mode, **true** will be used as default, you can use `--no-stream` to set `false`.
- `-f, --cookie-file`: Cookie json file path, **cookie.json** will be used as default.

## 模块用法

```ts
import { ChatBot, loadEdgeGPTConfig } from "edgegpt";
const config = await loadEdgeGPTConfig();

const chatBot = new ChatBot(config);
await chatBot.create();

console.log(await chatBot.askAsync("hello!"));
```

## 配置

配置项使用 [unjs/c12](https://github.com/unjs/c12) 自动从 cwd 中加载。 你可以使用 `edgegpt.config.json`, `edgegpt.config.{ts,js,mjs,cjs}` 或者 `.edgegptrc`.

有关可用选项和默认值，请参见 [./src/config.ts](./src/config.ts)

## 协议

用 💛 发电

根据 [MIT License](./LICENSE) 发布

## 致谢

- [EdgeGPT](https://github.com/acheong08/EdgeGPT/)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/edgegpt?style=flat-square
[npm-version-href]: https://npmjs.com/package/edgegpt
[bing-href]: https://www.bing.com/search?q=Bing+AI&showconv=1
[node-href]: https://nodejs.org
