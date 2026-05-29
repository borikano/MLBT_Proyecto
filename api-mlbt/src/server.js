import { app } from "./app.js";
import { config } from "./config/env.js";

if (process.argv.includes("--check")) {
  console.log("OK: API MLBT configurada correctamente.");
  process.exit(0);
}

app.listen(config.port, () => {
  console.log("API MLBT ejecutandose en http://localhost:" + config.port);
});
