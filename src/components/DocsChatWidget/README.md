# Documentation Chat Widget

A floating chat widget that allows users to query the Juicebox documentation inline on any page.

## Features

- **Floating Chat Button**: Always accessible in the bottom-right corner
- **Smart Search**: Automatically detects building/integration queries and filters to v5 docs
- **Real-time Results**: Shows relevant documentation with links
- **Responsive Design**: Works on desktop and mobile
- **Theme Support**: Adapts to light/dark mode

## Usage

The widget is automatically injected via `src/theme/Root.js` and appears on all pages.

## API Integration

Uses the MCP server API at `/api/mcp/search`:
- Automatically filters to v5 for building queries
- Returns top 5 most relevant results
- Formats results with clickable links

## Customization

### Styling

Edit `styles.module.css` to customize:
- Colors (uses Docusaurus theme variables)
- Size and position
- Animation timing

### Behavior

Edit `index.js` to customize:
- Search parameters
- Result formatting
- Welcome message
- Query detection logic

## Example Queries

- "How do I deploy a project?"
- "What are hooks?"
- "How to configure a ruleset?"
- "Show me examples of launching a project"
