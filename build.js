const fs = require("fs");
const path = require("path");
const dts = require("dts-bundle");

const srcFile = "./node_modules/jotai/index.d.ts";
const tempFile = "temp.d.ts";
const outputFile = "jotai.d.ts";

const srcContent = fs.readFileSync(path.resolve(srcFile), "utf8");
const srcPatched = srcContent.replace(/jotai\//g, "./node_modules/jotai/");
fs.writeFileSync(path.resolve(tempFile), srcPatched, "utf8");

dts.bundle({
  name: "jotai",
  main: tempFile,
  out: outputFile,
});
fs.unlinkSync(path.resolve(tempFile));

// patch
const outputContent = fs.readFileSync(path.resolve(outputFile), "utf8");
const outputPatched = outputContent.replace(/jotai\/node_modules\//g, "");
fs.writeFileSync(path.resolve(outputFile), outputPatched, "utf8");
