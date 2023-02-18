import { expect, test, describe } from "vitest";

import { ChatBot, loadEdgeGPTConfig } from "../src";

describe("ChatBot", async () => {
  const config = await loadEdgeGPTConfig();
  const bot = new ChatBot(config);
  await bot.create();

  test("should response a question", async () => {
    const res = await bot.askAsync("What is Vue.js?");
    expect(res).toMatchInlineSnapshot(`
      "[1]: https://www.javatpoint.com/vue-js \\"Vue.js Tutorial - javatpoint\\"
      [2]: https://v2.vuejs.org/v2/guide/index.html \\"Introduction — Vue.js\\"
      [3]: https://vuejs.org/ \\"Vue.js - The Progressive JavaScript Framework | Vue.js\\"
      [4]: https://vuejs.org/guide/introduction.html \\"Introduction | Vue.js\\"
      [5]: https://v2.vuejs.org/ \\"Vue.js\\"

      Vue.js is a **progressive framework for building user interfaces**[^1^][1] [^2^][2] using JavaScript. It is **easy to integrate** with other projects and libraries[^1^][1] and can be used to develop **single-page applications**[^1^][1].

      Are you interested in learning more about Vue.js? 😊
      "
    `)
    bot.close();
  },{timeout: 100000});
});
