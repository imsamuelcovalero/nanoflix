/* src/server.js */
require('dotenv').config();
const app = require('./app');
const logger = require('./utils/customLogger');

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
  logger.info("Server", `✅ Server is running on`, `http://localhost:${PORT}`);
}).on("error", (err) => {
  logger.error("Server", `❌ Failed to start server:`, err.message);
  process.exit(1);
});