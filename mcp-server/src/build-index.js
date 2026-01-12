#!/usr/bin/env node

/**
 * Standalone script to build the documentation index
 * Can be run independently or as part of the build process
 *
 * Enhanced to extract:
 * - Code examples with language tags
 * - Contract addresses
 * - SDK usage patterns
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
const CODE_EXAMPLES_FILE = path.join(__dirname, "code-examples-index.json");

/**
 * Extract code blocks from markdown content
 * Returns array of { language, code, context } objects
 */
function extractCodeBlocks(content, docTitle, docPath) {
  const codeBlocks = [];
  // Match fenced code blocks with optional language
  const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let match;

  while ((match = codeRegex.exec(content)) !== null) {
    const language = match[1] || "text";
    const code = match[2].trim();

    // Skip very short code blocks (likely not useful examples)
    if (code.length < 20) continue;

    // Get surrounding context (heading before the code block)
    const beforeCode = content.substring(0, match.index);
    const headingMatch = beforeCode.match(/#{1,6}\s+(.+)$/m);
    const context = headingMatch ? headingMatch[1].trim() : docTitle;

    // Categorize the code example
    let category = "general";
    if (language === "solidity" || code.includes("contract ") || code.includes("function ")) {
      category = "contract";
    } else if (language === "typescript" || language === "javascript" || language === "ts" || language === "js") {
      if (code.includes("useWrite") || code.includes("useRead") || code.includes("useJB")) {
        category = "sdk-react";
      } else if (code.includes("wagmi") || code.includes("viem")) {
        category = "web3";
      } else if (code.includes("fetch") || code.includes("axios") || code.includes("graphql")) {
        category = "api";
      } else {
        category = "javascript";
      }
    } else if (language === "json") {
      category = "config";
    } else if (language === "bash" || language === "shell") {
      category = "cli";
    } else if (language === "graphql") {
      category = "graphql";
    }

    codeBlocks.push({
      language,
      code,
      context,
      category,
      docPath,
      docTitle,
    });
  }

  return codeBlocks;
}

async function buildIndex() {
  console.log("Building documentation index...");
  const docIndex = [];
  const codeExamples = [];
  
  async function processDirectory(dir, basePath = "") {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(basePath, entry.name);
      
      // Skip blog, town-hall, and excluded dao directories
      if (entry.isDirectory()) {
        if (
          entry.name === "blog" || 
          entry.name === "town-hall" || 
          entry.name === "archive" ||
          entry.name === "reference" ||
          entry.name === "security" ||
          basePath.includes("/blog") || 
          basePath.includes("/town-hall") ||
          basePath.includes("/dao/archive") ||
          basePath.includes("/dao/reference") ||
          basePath.includes("/dao/security") ||
          basePath.includes("docusaurus-plugin-content-blog")
        ) {
          continue;
        }
        await processDirectory(fullPath, relativePath);
      } else if (entry.name.endsWith(".md")) {
        // Skip files in blog, town-hall, or excluded dao paths
        if (
          relativePath.includes("/blog") || 
          relativePath.includes("/town-hall") ||
          relativePath.includes("/dao/archive") ||
          relativePath.includes("/dao/reference") ||
          relativePath.includes("/dao/security") ||
          relativePath.includes("docusaurus-plugin-content-blog")
        ) {
          continue;
        }
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
          // Higher score = higher priority for learn/build, lower for API
          let integratorRelevance = 0;
          if (relativePath.startsWith("dev/v5/build/examples/")) integratorRelevance = 10; // Examples highest
          else if (relativePath.startsWith("dev/v5/build/")) integratorRelevance = 9; // Build guides high
          else if (relativePath.startsWith("dev/v5/learn/")) integratorRelevance = 8; // Learn content high
          else if (relativePath.startsWith("dev/v5/api/core/")) integratorRelevance = 7; // Core API highest priority
          else if (relativePath.startsWith("dev/v5/api/suckers/")) integratorRelevance = 6; // Suckers API
          else if (relativePath.startsWith("dev/v5/api/721-hook/")) integratorRelevance = 6; // 721 hook API
          else if (relativePath.startsWith("dev/v5/api/buyback-hook/")) integratorRelevance = 6; // Buyback hook API
          else if (relativePath.startsWith("dev/v5/api/revnet/")) integratorRelevance = 6; // Revnet API
          else if (relativePath.startsWith("dev/v5/api/")) integratorRelevance = 3; // Other API lower priority
          else if (relativePath.startsWith("dev/v5/")) integratorRelevance = 5;

          // Extract code examples from the document
          const docTitle = frontmatter.title || headings[0] || path.basename(entry.name, ".md");
          const extractedCode = extractCodeBlocks(body, docTitle, relativePath);
          codeExamples.push(...extractedCode);

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

  // Save documentation index
  await fs.writeFile(INDEX_FILE, JSON.stringify(docIndex, null, 2));
  console.log(`✓ Indexed ${docIndex.length} documents`);
  console.log(`✓ Index saved to ${INDEX_FILE}`);

  // Save code examples index
  await fs.writeFile(CODE_EXAMPLES_FILE, JSON.stringify(codeExamples, null, 2));
  console.log(`✓ Extracted ${codeExamples.length} code examples`);
  console.log(`✓ Code examples saved to ${CODE_EXAMPLES_FILE}`);

  // Print summary
  const byCategory = {};
  const byVersion = {};
  const codeByCategory = {};
  const codeByLanguage = {};

  for (const doc of docIndex) {
    byCategory[doc.category] = (byCategory[doc.category] || 0) + 1;
    if (doc.version) {
      byVersion[doc.version] = (byVersion[doc.version] || 0) + 1;
    }
  }

  for (const example of codeExamples) {
    codeByCategory[example.category] = (codeByCategory[example.category] || 0) + 1;
    codeByLanguage[example.language] = (codeByLanguage[example.language] || 0) + 1;
  }

  console.log("\nDocumentation Summary:");
  console.log("By category:", byCategory);
  console.log("By version:", byVersion);
  console.log("\nCode Examples Summary:");
  console.log("By category:", codeByCategory);
  console.log("By language:", codeByLanguage);
}

buildIndex().catch(console.error);
