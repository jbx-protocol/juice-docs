import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

// API base URL - works in production, may need local server in development
const API_BASE = '/api/mcp';

function DocsChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSearch = async (query) => {
    if (!query.trim() || isLoading) return;

    const userMessage = { type: 'user', content: query };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Auto-detect if query is about building/integration (will auto-filter to v5)
      const isBuildingQuery = /\b(build|integrate|integration|deploy|launch|setup|configure|implement|develop|code|api|contract|hook|example|tutorial|how to|getting started)\b/i.test(query);
      
      const response = await fetch(`${API_BASE}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query,
          category: isBuildingQuery ? 'developer' : 'all',
          version: 'all', // Server will auto-filter to v5 for building queries
          limit: 5,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
        throw new Error(errorData.error || `Search failed with status ${response.status}`);
      }

      const data = await response.json();
      
      // Format the response
      const assistantMessage = {
        type: 'assistant',
        content: formatSearchResults(data),
        results: data.results,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Documentation search error:', error);
      let errorContent = `Sorry, I encountered an error searching the documentation: ${error.message}`;
      
      // Provide helpful message for development
      if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        errorContent += '\n\n**Note:** In development mode, the API route may not be available. The chat widget will work when deployed to production.';
      }
      
      const errorMessage = {
        type: 'assistant',
        content: errorContent,
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatSearchResults = (data) => {
    if (!data.results || data.results.length === 0) {
      return 'I couldn\'t find any relevant documentation for that query. Try rephrasing or using different keywords.';
    }

    let response = `Found ${data.results.length} relevant ${data.results.length === 1 ? 'result' : 'results'}:\n\n`;
    
    data.results.forEach((result, index) => {
      response += `${index + 1}. **[${result.title}](${result.url})**\n`;
      if (result.description) {
        response += `   ${result.description.substring(0, 150)}${result.description.length > 150 ? '...' : ''}\n`;
      }
      response += '\n';
    });

    return response;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className={clsx(styles.chatButton, isOpen && styles.chatButtonOpen)}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open documentation assistant"
        title="Ask questions about the documentation"
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderContent}>
              <h3>Documentation Assistant</h3>
              <p>Ask questions about Juicebox documentation</p>
            </div>
            <div className={styles.chatHeaderActions}>
              <button
                onClick={clearChat}
                className={styles.clearButton}
                title="Clear chat"
                aria-label="Clear chat"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.chatMessages}>
            {messages.length === 0 && (
              <div className={styles.welcomeMessage}>
                <p>👋 Hi! I can help you find information in the Juicebox documentation.</p>
                <p>Try asking:</p>
                <ul>
                  <li>"How do I deploy a project?"</li>
                  <li>"What are hooks?"</li>
                  <li>"How to configure a ruleset?"</li>
                </ul>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={clsx(
                  styles.message,
                  message.type === 'user' ? styles.userMessage : styles.assistantMessage,
                  message.isError && styles.errorMessage
                )}
              >
                <div className={styles.messageContent}>
                  {message.type === 'user' ? (
                    <div className={styles.userBubble}>{message.content}</div>
                  ) : (
                    <div className={styles.assistantBubble}>
                      <div className={styles.markdownContent}>
                        {message.content.split('\n').map((line, i) => {
                          // Simple markdown-like rendering
                          if (line.match(/^\d+\.\s+\*\*\[.+\]\(.+\)\*\*/)) {
                            // Link format: 1. **[Title](url)**
                            const match = line.match(/^\d+\.\s+\*\*\[(.+)\]\((.+)\)\*\*/);
                            if (match) {
                              return (
                                <div key={i} className={styles.resultItem}>
                                  <a 
                                    href={match[2]} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    onClick={() => setIsOpen(false)} // Close chat when clicking link
                                  >
                                    {match[1]}
                                  </a>
                                </div>
                              );
                            }
                          }
                          if (line.trim().startsWith('   ')) {
                            // Indented description
                            return (
                              <div key={i} className={styles.resultDescription}>
                                {line.trim()}
                              </div>
                            );
                          }
                          if (line.trim() === '') {
                            return <br key={i} />;
                          }
                          // Bold text
                          if (line.includes('**')) {
                            const parts = line.split(/(\*\*.+?\*\*)/g);
                            return (
                              <div key={i}>
                                {parts.map((part, j) => 
                                  part.startsWith('**') && part.endsWith('**') ? (
                                    <strong key={j}>{part.slice(2, -2)}</strong>
                                  ) : (
                                    <span key={j}>{part}</span>
                                  )
                                )}
                              </div>
                            );
                          }
                          return <div key={i}>{line}</div>;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className={clsx(styles.message, styles.assistantMessage)}>
                <div className={styles.assistantBubble}>
                  <div className={styles.loadingDots}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className={styles.chatInput}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about the documentation..."
              disabled={isLoading}
              className={styles.input}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={styles.sendButton}
              aria-label="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default DocsChatWidget;
