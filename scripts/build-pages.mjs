import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const result = spawnSync(
  process.execPath,
  [require.resolve("next/dist/bin/next"), "build"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      GITHUB_PAGES: "true",
    },
  },
);

if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);

// Required when serving files through GitHub Pages without Jekyll processing.
writeFileSync("out/.nojekyll", "");
