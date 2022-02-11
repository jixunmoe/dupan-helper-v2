import vue from "rollup-plugin-vue2";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import postcss from 'rollup-plugin-postcss';
import postcssUrl from 'postcss-url';

const userScript = require("./user-script/rollup-user-script");

export default {
  input: "src/script.js",
  output: {
    format: "cjs",
    file: "dist/baidu.user.js",
  },
  plugins: [
    vue(),
    postcss({
      extensions: ['.css', '.postcss'],
      inject: (cssVariableName) => `styleInject(${cssVariableName});`,
      plugins: [
        postcssUrl({
          url: 'inline',
        }),
      ],
    }),
    commonjs(),
    resolve(),
    userScript(false),
  ],
};
