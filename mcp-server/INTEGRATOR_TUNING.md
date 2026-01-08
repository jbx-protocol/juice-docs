# Fine-Tuning the MCP Server for Integrators

This document outlines the enhancements made to optimize the MCP server for integrators and developers building with Juicebox.

## Key Features

### 1. Automatic v5 Filtering for Building Queries

**Query Intent Detection**: The server automatically detects building/integration queries and filters to v5 documentation.

**Trigger Keywords:**
- `build`, `integrate`, `integration`, `deploy`, `launch`
- `setup`, `configure`, `implement`, `develop`
- `code`, `api`, `contract`, `hook`
- `example`, `tutorial`, `how to`, `getting started`

**Example:**
```bash
# Automatically filters to v5
curl -X POST https://docs.juicebox.money/api/mcp/search \
  -d '{"query": "how to deploy a project"}'

# Explicitly requests v5
curl -X POST https://docs.juicebox.money/api/mcp/search \
  -d '{"query": "deploy project", "version": "v5"}'
```

### 2. Enhanced Metadata Extraction

Each document is now indexed with:
- **Document Type**: `build`, `api`, `learn`, `example`
- **Tags**: Automatic tagging based on content (e.g., `integration`, `hook`, `tutorial`)
- **Integrator Relevance Score**: 0-10 scale prioritizing integrator-relevant content

**Relevance Scoring:**
- `dev/v5/build/` → 10 (highest priority)
- `dev/v5/build/examples/` → 9
- `dev/v5/api/` → 8
- `dev/v5/` → 5
- Other docs → 0

### 3. Improved Search Ranking

**Search Weights:**
- Title: 35% (was 40%)
- Description: 25% (was 30%)
- Content: 15% (was 20%)
- Headings: 10% (unchanged)
- **Tags: 15%** (new - boosts tagged content)

**Re-ranking for Building Queries:**
- Results are re-ranked by `integratorRelevance` score
- Build guides and examples are prioritized
- API documentation gets higher ranking

### 4. Smart Query Routing

The server intelligently routes queries:

| Query Type | Auto-Filter | Priority Boost |
|------------|-------------|----------------|
| Building/Integration | v5 only | High (build guides, examples) |
| API Reference | All versions | Medium (API docs) |
| Concepts/Learning | All versions | Low (learn docs) |
| General | All | None |

## Additional Fine-Tuning Suggestions

### 1. Add Code Example Extraction

Extract and index code blocks separately for better code search:

```javascript
// Extract code blocks
const codeBlocks = [];
const codeRegex = /```[\s\S]*?```/g;
// Index code separately with higher weight for code queries
```

### 2. Add Contract Address Indexing

Create a separate index for contract addresses and deployment info:

```javascript
// Special handling for addresses.md
if (relativePath.includes("addresses")) {
  // Extract contract names and addresses
  // Make them searchable separately
}
```

### 3. Add Related Documents

Link related documents in the index:

```javascript
// Extract "See also" links
// Link related API docs, examples, and guides
relatedDocs: extractRelatedLinks(content)
```

### 4. Query Expansion

Expand common queries to include synonyms:

```javascript
const queryExpansions = {
  "deploy": ["launch", "create", "setup"],
  "hook": ["extension", "custom", "plugin"],
  "ruleset": ["funding cycle", "configuration"],
};
```

### 5. Context-Aware Responses

Return contextual information with results:

```javascript
// Include related concepts
// Suggest next steps
// Highlight code examples
```

### 6. Version Comparison Tool

Add a tool to compare differences between versions:

```javascript
{
  name: "compare_versions",
  description: "Compare documentation or features between v3, v4, and v5"
}
```

### 7. API Endpoint Discovery

Help integrators find the right API endpoints:

```javascript
{
  name: "find_api_endpoint",
  description: "Find API endpoints for a specific task (e.g., 'deploy project', 'add hook')"
}
```

### 8. Code Snippet Extraction

Extract and index code snippets separately:

```javascript
// Index code examples with language tags
// Make them searchable with syntax highlighting context
```

### 9. Common Patterns Library

Index common integration patterns:

```javascript
// Tag common patterns: "multisig", "governance", "payments", etc.
// Create pattern-based search
```

### 10. Error Message Mapping

Map common errors to documentation:

```javascript
// Index error messages and link to troubleshooting docs
// Help integrators debug issues faster
```

## Current Implementation

✅ **Implemented:**
- Automatic v5 filtering for building queries
- Enhanced metadata (docType, tags, integratorRelevance)
- Improved search weights with tag support
- Re-ranking for integrator-relevant content

🔄 **Recommended Next Steps:**
1. Extract and index code blocks separately
2. Add contract address special handling
3. Implement query expansion
4. Add related documents linking
5. Create pattern-based search

## Testing

Test the improvements:

```bash
# Building query (auto-filters to v5)
curl -X POST https://docs.juicebox.money/api/mcp/search \
  -d '{"query": "how to deploy a project"}'

# Should return only v5 docs, prioritized by integrator relevance
```
