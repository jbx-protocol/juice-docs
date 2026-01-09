# Claude Integration Setup

This documentation site now uses Claude (Anthropic's AI) to provide intelligent, context-aware responses to questions about the Juicebox documentation.

## How It Works

1. **User asks a question** in the search bar
2. **System searches** the documentation index for relevant documents
3. **Top 5 documents** are retrieved with full content
4. **Claude receives** the question + full document context
5. **Claude responds** with an intelligent answer based on the documentation

## Setup Instructions

### 1. Get an Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (starts with `sk-ant-...`)

### 2. Configure in Vercel

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add a new variable:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: Your API key (e.g., `sk-ant-...`)
   - **Environment**: Production, Preview, and Development (or as needed)
4. Save and redeploy

### 3. Local Development

For local development, create a `.env.local` file in the project root:

```bash
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

**Note**: The `.env.local` file should be in `.gitignore` and never committed.

## API Endpoint

The Claude integration is available at:

- **POST** `/api/mcp/ask`

### Request Body

```json
{
  "query": "How do I deploy a Juicebox project?",
  "category": "developer",  // optional, defaults to "all"
  "version": "all",          // optional, defaults to "all"
  "maxDocs": 5               // optional, defaults to 5
}
```

### Response

```json
{
  "query": "How do I deploy a Juicebox project?",
  "response": "Claude's intelligent response based on the documentation...",
  "sources": [
    {
      "title": "Getting Started",
      "path": "dev/v5/build/getting-started",
      "url": "/dev/v5/build/getting-started",
      "description": "..."
    }
  ],
  "totalSources": 5
}
```

## Features

- **Full Document Context**: Claude receives the complete content of relevant documents (up to 8000 chars per doc)
- **Smart Search**: Uses the same intelligent search ranking as the regular search
- **Automatic Filtering**: Automatically filters to v5 for building/integration queries
- **Source Attribution**: Shows which documents were used to generate the response
- **Error Handling**: Graceful fallback if API key is missing or API fails

## Cost Considerations

- Claude API usage is pay-per-use
- Current model: `claude-3-5-sonnet-20241022`
- Each query includes up to 5 full documents in context
- Typical cost: ~$0.003-0.015 per query (depending on response length)

## Troubleshooting

### "ANTHROPIC_API_KEY environment variable is not set"

- Make sure you've added the environment variable in Vercel
- For local dev, check your `.env.local` file
- Redeploy after adding environment variables

### Slow Responses

- Claude API calls can take 2-5 seconds
- The endpoint has a 60-second timeout
- Consider reducing `maxDocs` if responses are too slow

### Rate Limits

- Anthropic has rate limits based on your plan
- Free tier: Limited requests per minute
- Paid plans: Higher limits

## Fallback Behavior

If the Claude API is unavailable or fails:
- The frontend will show an error message
- Users can still use the regular search functionality
- The `/search` endpoint remains available as a fallback
