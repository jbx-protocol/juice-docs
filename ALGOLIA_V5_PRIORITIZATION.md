# Prioritizing v5 Content in Algolia Search

## Problem
Algolia search is not prioritizing v5 documentation over previous versions (v1-v4).

## Solution

Algolia ranking is primarily controlled through the **Algolia Dashboard**, not through Docusaurus configuration. Here are the steps to fix this:

### Option 1: Custom Ranking (Recommended)

1. **Go to Algolia Dashboard**
   - Navigate to: https://www.algolia.com/apps/6C0XLHGK46/explorer/browse/juicebox
   - Login with your Algolia account

2. **Configure Custom Ranking**
   - Go to **Indices** > **juicebox** > **Ranking** tab
   - Scroll to **Custom Ranking** section
   - Add a new custom ranking attribute (e.g., `version_priority`)
   - Set ranking values:
     - v5 docs: `10` (highest)
     - v4 docs: `5`
     - v3 docs: `3`
     - v2 docs: `2`
     - v1 docs: `1`
     - No version: `0`

3. **Update Index Records**
   - You'll need to add the `version_priority` attribute to each record
   - This can be done via:
     - Algolia API (bulk update)
     - Algolia Dashboard (manual, not recommended for large indices)
     - Custom indexing script

### Option 2: Use Facets and Filters

1. **Enable Version Facet**
   - In Algolia Dashboard, go to **Indices** > **juicebox** > **Facets**
   - Add `version` as a facet attribute (if it exists in your index)
   - Or add `url` as a facet and use pattern matching

2. **Update Docusaurus Config**
   - If you have a `version` facet, you can use:
     ```javascript
     searchParameters: {
       optionalFilters: ['version:v5'],
     }
     ```

### Option 3: Custom Search Component

Create a custom search component that modifies the search query to boost v5 results:

1. Create `src/theme/SearchBar/index.js`
2. Override the default Algolia search component
3. Add custom ranking logic in the search query

### Option 4: Re-index with Version Metadata

If Docusaurus's Algolia plugin doesn't include version information:

1. Check what attributes are currently indexed
2. If `version` is not indexed, you may need to:
   - Use a custom Algolia plugin
   - Or modify the Docusaurus Algolia plugin configuration
   - Or use a post-processing script to add version attributes

## Current Configuration

The `docusaurus.config.js` file includes `searchParameters` that can be used once custom ranking is set up in the Algolia dashboard.

## Testing

After making changes:
1. Wait for Algolia to re-index (can take a few minutes)
2. Test searches in the documentation site
3. Verify v5 results appear first

## Notes

- Docusaurus's `@docusaurus/theme-search-algolia` plugin automatically indexes:
  - `title`
  - `content`
  - `headings`
  - `url`
  - `type` (page, doc, etc.)
  
- Custom attributes like `version` may not be automatically indexed unless configured in the Algolia plugin or dashboard.

- The MCP server has version extraction logic, but this is separate from Algolia indexing.
