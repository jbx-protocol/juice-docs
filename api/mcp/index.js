/**
 * Root endpoint for /api/mcp/
 * Vercel catch-all routes don't match the root path, so we need this file
 */

export { default } from "./[...path].js";
