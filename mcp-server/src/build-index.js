#!/usr/bin/env node

/**
 * Standalone script to build the documentation index
 * Can be run independently or as part of the build process
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import removeMarkdown from "remove-markdown";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "../..");
const DOCS_DIR = path.join(PROJECT_ROOT, "docs");
const INDEX_FILE = path.join(__dirname, "docs-index.json");

async function buildIndex() {
  console.log("Building documentation index...");
  const docIndex = [];
  
  async function processDirectory(dir, basePath = "") {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(basePath, entry.name);
      
      if (entry.isDirectory()) {
        await processDirectory(fullPath, relativePath);
      } else if (entry.name.endsWith(".md")) {
        try {
          const content = await fs.readFile(fullPath, "utf-8");
          const { data: frontmatter, content: body } = matter(content);
          
          // Extract text content
          const textContent = removeMarkdown(body);
          
          // Extract headings
          const headings = [];
          const headingRegex = /^#{1,6}\s+(.+)$/gm;
          let match;
          while ((match = headingRegex.exec(body)) !== null) {
            headings.push(match[1].trim());
          }
          
          // Determine category from path
          let category = "general";
          if (relativePath.startsWith("dev/")) category = "developer";
          else if (relativePath.startsWith("user/")) category = "user";
          else if (relativePath.startsWith("dao/")) category = "dao";
          else if (relativePath.startsWith("ecosystem/")) category = "ecosystem";
          
          // Extract version if present
          const versionMatch = relativePath.match(/v([345])/);
          const version = versionMatch ? `v${versionMatch[1]}` : null;
          
          // Determine document type for better search relevance
          let docType = "general";
          let tags = [];
          
          if (relativePath.includes("/build/")) {
            docType = "build";
            tags.push("integration", "development", "tutorial");
          }
          if (relativePath.includes("/api/")) {
            docType = "api";
            tags.push("reference", "contract", "interface");
          }
          if (relativePath.includes("/learn/")) {
            docType = "learn";
            tags.push("concept", "explanation");
          }
          if (relativePath.includes("/examples/")) {
            docType = "example";
            tags.push("code", "tutorial", "integration");
          }
          if (relativePath.includes("/hooks/")) {
            tags.push("hook", "extension", "custom");
          }
          if (relativePath.includes("addresses")) {
            tags.push("address", "deployment");
          }
          
          // Boost priority for integrator-relevant content
          let integratorRelevance = 0;
          if (relativePath.startsWith("dev/v5/build/")) integratorRelevance = 10;
          else if (relativePath.startsWith("dev/v5/api/")) integratorRelevance = 8;
          else if (relativePath.startsWith("dev/v5/build/examples/")) integratorRelevance = 9;
          else if (relativePath.startsWith("dev/v5/")) integratorRelevance = 5;
          
          docIndex.push({
            path: relativePath,
            fullPath: fullPath,
            title: frontmatter.title || headings[0] || path.basename(entry.name, ".md"),
            description: frontmatter.description || textContent.substring(0, 200),
            content: textContent,
            headings: headings,
            category: category,
            version: version,
            docType: docType,
            tags: tags,
            integratorRelevance: integratorRelevance,
            sidebarPosition: frontmatter.sidebar_position || 999,
            url: `https://docs.juicebox.money/${relativePath.replace(/\.md$/, "")}`,
          });
        } catch (error) {
          console.error(`Error processing ${fullPath}:`, error.message);
        }
      }
    }
  }
  
  await processDirectory(DOCS_DIR);
  
  // Save index
  await fs.writeFile(INDEX_FILE, JSON.stringify(docIndex, null, 2));
  console.log(`✓ Indexed ${docIndex.length} documents`);
  console.log(`✓ Index saved to ${INDEX_FILE}`);
  
  // Print summary
  const byCategory = {};
  const byVersion = {};
  
  for (const doc of docIndex) {
    byCategory[doc.category] = (byCategory[doc.category] || 0) + 1;
    if (doc.version) {
      byVersion[doc.version] = (byVersion[doc.version] || 0) + 1;
    }
  }
  
  console.log("\nSummary:");
  console.log("By category:", byCategory);
  console.log("By version:", byVersion);
}

buildIndex().catch(console.error);
