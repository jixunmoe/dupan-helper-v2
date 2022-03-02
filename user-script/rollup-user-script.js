const fs = require("fs");

const pkg = require("../package.json");

function updateVersion(str) {
  return str.replace(/\b__VERSION__\b/g, pkg.version);
}

const loader = fs.readFileSync(`${__dirname}/loader.js`, "utf-8");
const meta = updateVersion(fs.readFileSync(`${__dirname}/meta.js`, "utf-8"));
const styleInject = updateVersion(
  fs.readFileSync(`${__dirname}/style-inject.js`, "utf-8")
);

const indent = (str) => str.replace(/\n/g, "\n  ");

const wrapUserScript = (code, isLegacy) =>
  `
${meta.replace(/( *){{LEGACY:(.+?)}}( *)/g, isLegacy ? "$1$2$3" : "")}
function entryPoint () {
  ${indent(code)}
  ${indent(styleInject)}
}
${loader}
`.trimStart();

function rollupUserScript(isLegacy) {
  return {
    name: "user-script",

    generateBundle(options, bundle) {
      for (const key of Object.keys(bundle)) {
        bundle[key].code = wrapUserScript(bundle[key].code, isLegacy);
      }
    },
  };
}

module.exports = rollupUserScript;
