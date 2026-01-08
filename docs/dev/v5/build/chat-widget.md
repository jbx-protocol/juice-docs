---
sidebar_position: 11
---

# Documentation Chat Widget

The Juicebox documentation includes an AI-powered chat widget that allows you to query the documentation directly from any page.

## Using the Chat Widget

1. **Open the widget**: Click the chat icon in the bottom-right corner of any page
2. **Ask a question**: Type your question about Juicebox documentation
3. **Get results**: The widget will search the documentation and return relevant results with links

## Example Queries

- "How do I deploy a project?"
- "What are hooks and how do I use them?"
- "How to configure a ruleset?"
- "Show me examples of launching a project"
- "What contracts do I need to interact with?"

## Features

- **Smart Search**: Automatically detects building/integration queries and filters to v5 documentation
- **Context-Aware**: Understands the context of your question
- **Direct Links**: Results include clickable links to relevant documentation pages
- **Always Available**: Accessible from any page on the documentation site

## How It Works

The chat widget uses the [MCP Server](/docs/dev/v5/build/mcp-server.md) API to search the documentation. It:

1. Analyzes your query to detect intent (building, API reference, concepts, etc.)
2. Automatically filters to v5 documentation for building queries
3. Returns the most relevant results with descriptions
4. Provides direct links to documentation pages

## Tips

- Be specific: "How do I deploy a project with custom hooks?" is better than "deploy"
- Use natural language: The widget understands questions, not just keywords
- Click results: Links open in new tabs so you can keep the chat open
