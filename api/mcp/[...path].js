/**
 * Vercel Serverless Function for MCP HTTP API
 * 
 * Routes all /api/mcp/* requests to the HTTP server
 */

import app from "../../mcp-server/src/http-server.js";

export default app;
