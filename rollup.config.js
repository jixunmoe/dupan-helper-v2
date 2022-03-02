import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";

import vue from "rollup-plugin-vue2";
import postcss from "rollup-plugin-postcss";
import postcssUrl from "postcss-url";
import prettier from "rollup-plugin-prettier";

const userScript = require("./user-script/rollup-user-script");

export default {
  input: "src/entry.ts",
  output: {
    format: "cjs",
    file: "dist/baidu.user.js",
  },
  plugins: [
    vue(),
    postcss({
      extensions: [".css", ".postcss"],
      inject: (cssVariableName) => `styleInject(${cssVariableName});`,
      plugins: [
        postcssUrl({
          url: "inline",
        }),
      ],
    }),
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".ts"],
    }),
    commonjs(),
    resolve({
      extensions: [".js", ".ts"],
    }),
    prettier({
      tabWidth: 2,
      singleQuote: false,
      parser: "babel",
    }),
    userScript(false),
  ],
};
