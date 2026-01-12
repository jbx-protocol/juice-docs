import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

// API base URL - works in production, may need local server in development
const API_BASE = '/api/mcp';

function NavbarSearchBar() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [response, setResponse] = useState('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const overlayRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  // Conversation history
  const [messages, setMessages] = useState([]);
  
  // Store conversation context when closing
  const [savedContext, setSavedContext] = useState(null);
  
  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Handle click outside to close overlay
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOverlayOpen &&
        overlayRef.current &&
        !overlayRef.current.contains(event.target) &&
        !inputRef.current?.contains(event.target)
      ) {
        // Save context before closing
        if (hasSearched || results.length > 0 || response || messages.length > 0) {
          setSavedContext({
            results,
            response,
            input,
            hasSearched,
            messages,
          });
        }
        setIsOverlayOpen(false);
      }
    };

    if (isOverlayOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOverlayOpen, hasSearched, results, response, input]);

  useEffect(() => {
    if (isOverlayOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOverlayOpen]);

  const handleSearch = async (query) => {
    if (!query.trim() || isLoading) return;

    // Add user message to conversation
    const userMessage = { type: 'user', content: query };
    setMessages(prev => [...prev, userMessage]);
    setHasSearched(true);
    setIsLoading(true);
    setIsOverlayOpen(true);
    
    // Clear input after adding message
    setInput('');

    try {
      // Auto-detect if query is about building/integration (will auto-filter to v5)
      const isBuildingQuery = /\b(build|integrate|integration|deploy|launch|setup|configure|implement|develop|code|api|contract|hook|example|tutorial|how to|getting started)\b/i.test(query);
      
      // Try Claude-powered ask endpoint first, fallback to regular search if it fails
      let claudeSuccess = false;
      let assistantResponse = '';
      let assistantSources = [];
      
      try {
        const claudeResponse = await fetch(`${API_BASE}/ask`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: query,
            category: isBuildingQuery ? 'developer' : 'all',
            version: 'all',
            maxDocs: 5,
          }),
        });

        if (claudeResponse.ok) {
          const data = await claudeResponse.json();
          assistantResponse = data.response || 'No response from Claude.';
          assistantSources = (data.sources || []).map((source, index) => ({
            title: source.title,
            url: source.url,
            description: source.description || `Documentation source ${index + 1}`,
            path: source.path,
          }));
          setResponse(assistantResponse);
          setResults(assistantSources);
          claudeSuccess = true;
        }
      } catch (claudeErr) {
        // Claude failed, will fall back to regular search
        console.warn('Claude API unavailable, using fallback search:', claudeErr);
      }

      // Fallback to regular search if Claude isn't available
      if (!claudeSuccess) {
        const searchResponse = await fetch(`${API_BASE}/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: query,
            category: isBuildingQuery ? 'developer' : 'all',
            version: 'all',
            limit: 5,
          }),
        });

        if (!searchResponse.ok) {
          const errorData = await searchResponse.json().catch(() => ({ error: `HTTP ${searchResponse.status}` }));
          throw new Error(errorData.error || `Search failed with status ${searchResponse.status}`);
        }

        const searchData = await searchResponse.json();
        assistantSources = searchData.results || [];
        setResults(assistantSources);
        
        // Generate template-based conversational response
        assistantResponse = generateConversationalResponse(assistantSources, query);
        setResponse(assistantResponse);
      }
      
      // Add assistant message to conversation
      const assistantMessage = {
        type: 'assistant',
        content: assistantResponse,
        sources: assistantSources,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      const errorMessage = `I encountered an error: ${error.message}. Please try again.`;
      setResponse(errorMessage);
      
      // Add error message to conversation
      const errorAssistantMessage = {
        type: 'assistant',
        content: errorMessage,
        sources: [],
      };
      setMessages(prev => [...prev, errorAssistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate conversational response when Claude isn't available
  const generateConversationalResponse = (results, query) => {
    if (!results || results.length === 0) {
      return `I couldn't find documentation matching "${query}". Try rephrasing or browse the docs directly.`;
    }

    // Keep it simple - just point to the most relevant doc
    const topResult = results[0];
    return `I found **${topResult.title}** which should help. Check it out below, or ask me a follow-up question for more details.`;
  };

  // Render markdown-like text with basic formatting
  const renderMarkdown = (text) => {
    if (!text) return null;
    
    // Split by lines to handle line breaks
    const lines = text.split('\n');
    
    return lines.map((line, lineIdx) => {
      // Handle code blocks (```code```)
      if (line.trim().startsWith('```')) {
        return <div key={lineIdx} className={styles.codeBlock}>{line.replace(/```/g, '')}</div>;
      }
      
      // Handle inline code (`code`)
      const parts = line.split(/(`[^`]+`)/g);
      const formattedParts = parts.map((part, partIdx) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={partIdx} className={styles.inlineCode}>{part.slice(1, -1)}</code>;
        }
        // Handle bold (**text**)
        const boldParts = part.split(/(\*\*.+?\*\*)/g);
        return boldParts.map((boldPart, boldIdx) => 
          boldPart.startsWith('**') && boldPart.endsWith('**') ? (
            <strong key={boldIdx}>{boldPart.slice(2, -2)}</strong>
          ) : (
            <span key={boldIdx}>{boldPart}</span>
          )
        );
      });
      
      return <div key={lineIdx} className={styles.responseLine}>{formattedParts}</div>;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      // Save context before closing
      if (hasSearched || results.length > 0 || response || messages.length > 0) {
        setSavedContext({
          results,
          response,
          input,
          hasSearched,
          messages,
        });
      }
      setIsOverlayOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    // Expand overlay when user starts typing
    if (value.trim()) {
      setIsOverlayOpen(true);
    }
  };
  
  const handleInputFocus = () => {
    // Restore previous context when clicking back into the input
    if (savedContext && !isOverlayOpen) {
      setResults(savedContext.results || []);
      setResponse(savedContext.response || '');
      setInput(savedContext.input || '');
      setHasSearched(savedContext.hasSearched || false);
      setMessages(savedContext.messages || []);
      setIsOverlayOpen(true);
    } else if (!isOverlayOpen) {
      setIsOverlayOpen(true);
    }
  };
  
  const handleClear = () => {
    setInput('');
    setResults([]);
    setResponse('');
    setHasSearched(false);
    setMessages([]);
    setSavedContext(null);
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Compact Input in Navbar */}
      <div className={styles.searchContainer}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <div className={styles.searchInputWrapper}>
            <svg
              className={styles.chatIcon}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              placeholder="Ask"
              className={styles.searchInput}
              disabled={isLoading}
            />
            {isLoading && (
              <div className={styles.loadingDots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            {input && !isLoading && (
              <button
                type="button"
                onClick={handleClear}
                className={styles.clearButton}
                aria-label="Clear search"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Centered Overlay */}
      {isOverlayOpen && (
        <div className={styles.overlayBackdrop} onClick={() => {
          if (hasSearched || results.length > 0 || response) {
            setSavedContext({ results, response, input, hasSearched });
          }
          setIsOverlayOpen(false);
        }}>
          <div 
            ref={overlayRef}
            className={styles.overlayContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Overlay Header */}
            <div className={styles.overlayHeader}>
              <div className={styles.overlayHeaderLeft}>
                <svg
                  className={styles.chatIcon}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <h3>Ask the docs with GPT</h3>
              </div>
              <button
                className={styles.closeButton}
                onClick={() => {
                  if (hasSearched || results.length > 0 || response || messages.length > 0) {
                    setSavedContext({ results, response, input, hasSearched, messages });
                  }
                  setIsOverlayOpen(false);
                }}
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Overlay Content */}
            <div ref={resultsRef} className={styles.overlayContentArea}>
              {messages.length === 0 && !isLoading ? (
                <div className={styles.welcomeMessage}>
                  <p>👋 Hi! I'm your Juicebox documentation assistant. I can help you build on the Juicebox protocol.</p>
                  <p><strong>Common developer questions:</strong></p>
                  <ul className={styles.suggestionList}>
                    <li onClick={() => { setInput('How do I build a pay button for my project?'); }} className={styles.suggestionItem}>
                      "How do I build a pay button for my project?"
                    </li>
                    <li onClick={() => { setInput('How do I query project data with Bendystraw?'); }} className={styles.suggestionItem}>
                      "How do I query project data with Bendystraw?"
                    </li>
                    <li onClick={() => { setInput('What SDK hooks do I need for a token dashboard?'); }} className={styles.suggestionItem}>
                      "What SDK hooks do I need for a token dashboard?"
                    </li>
                    <li onClick={() => { setInput('How do cash outs and redemptions work?'); }} className={styles.suggestionItem}>
                      "How do cash outs and redemptions work?"
                    </li>
                  </ul>
                  <p className={styles.suggestionHint}><strong>Or ask about:</strong> rulesets, reserved tokens, NFT hooks, omnichain projects, contract addresses, SDK setup</p>
                </div>
              ) : (
                <div className={styles.messagesContainer}>
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={message.type === 'user' ? styles.userMessage : styles.assistantMessage}
                    >
                      {message.type === 'user' ? (
                        <div className={styles.messageContent}>
                          <div className={styles.messageText}>{message.content}</div>
                        </div>
                      ) : (
                        <div className={styles.messageContent}>
                          <div className={styles.assistantResponse}>
                            {renderMarkdown(message.content)}
                          </div>
                          {message.sources && message.sources.length > 0 && (
                            <div className={styles.resultsList}>
                              <div className={styles.resultsHeader}>Relevant documentation:</div>
                              {message.sources.map((result, resultIndex) => (
                                <a
                                  key={resultIndex}
                                  href={result.url}
                                  className={styles.resultItem}
                                  onClick={() => {
                                    // Don't close overlay, just navigate
                                  }}
                                >
                                  <div className={styles.resultTitle}>{result.title}</div>
                                  {result.description && (
                                    <div className={styles.resultDescription}>
                                      {result.description.substring(0, 120)}
                                      {result.description.length > 120 ? '...' : ''}
                                    </div>
                                  )}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className={styles.assistantMessage}>
                      <div className={styles.messageContent}>
                        <div className={styles.loadingState}>
                          <div className={styles.thinkingChatbot}>
                            <svg 
                              className={styles.chatbotIcon}
                              width="24" 
                              height="24" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2"
                            >
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <div className={styles.thinkingDots}>
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Overlay Input - Fixed at Bottom */}
            <form onSubmit={handleSubmit} className={styles.overlayForm}>
              <div className={styles.overlayInputWrapper}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question about the documentation..."
                  className={styles.overlayInput}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className={styles.sendButton}
                  aria-label="Send"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default NavbarSearchBar;
