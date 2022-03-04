import replace from "@rollup/plugin-replace";
import typescript from "rollup-plugin-typescript2";
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
    //
    replace({
      preventAssignment: false,
      values: {
        "_c('el-": "_c('u-",
      },
    }),
    vue(),
    typescript({
      // 编译时不进行检查。
      // 而且 Vue 插件进行了魔改来适应用户脚本注入的情况。
      check: false,
    }),
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
