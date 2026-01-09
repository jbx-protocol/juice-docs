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
  
  // Store conversation context when closing
  const [savedContext, setSavedContext] = useState(null);

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
        if (hasSearched || results.length > 0 || response) {
          setSavedContext({
            results,
            response,
            input,
            hasSearched,
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

    setHasSearched(true);
    setIsLoading(true);
    setIsOverlayOpen(true);

    try {
      // Auto-detect if query is about building/integration (will auto-filter to v5)
      const isBuildingQuery = /\b(build|integrate|integration|deploy|launch|setup|configure|implement|develop|code|api|contract|hook|example|tutorial|how to|getting started)\b/i.test(query);
      
      // Try Claude-powered ask endpoint first, fallback to regular search if it fails
      let claudeSuccess = false;
      
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
          setResponse(data.response || 'No response from Claude.');
          setResults((data.sources || []).map((source, index) => ({
            title: source.title,
            url: source.url,
            description: source.description || `Documentation source ${index + 1}`,
            path: source.path,
          })));
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
        setResults(searchData.results || []);
        
        // Generate template-based conversational response
        const conversationalResponse = generateConversationalResponse(searchData.results || [], query);
        setResponse(conversationalResponse);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setResponse(`I encountered an error: ${error.message}. Please try again.`);
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
      if (hasSearched || results.length > 0 || response) {
        setSavedContext({
          results,
          response,
          input,
          hasSearched,
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
              placeholder="Ask the docs with GPT"
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
                  if (hasSearched || results.length > 0 || response) {
                    setSavedContext({ results, response, input, hasSearched });
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

            {/* Overlay Input */}
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

            {/* Overlay Content */}
            <div ref={resultsRef} className={styles.overlayContentArea}>
              {isLoading ? (
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
              ) : results.length === 0 && !hasSearched ? (
                <div className={styles.welcomeMessage}>
                  <p>👋 Hi! I can help you find information in the Juicebox documentation.</p>
                  <p>Try asking:</p>
                  <ul>
                    <li>"How do I deploy a project?"</li>
                    <li>"What are hooks?"</li>
                    <li>"How to configure a ruleset?"</li>
                  </ul>
                </div>
              ) : results.length === 0 ? (
                <div className={styles.noResults}>
                  <div className={styles.gptResponse}>
                    {response ? renderMarkdown(response) : <p>No results found. Try different keywords or check your spelling.</p>}
                  </div>
                </div>
              ) : (
                <>
                  {response && (
                    <div className={styles.gptResponse}>
                      {renderMarkdown(response)}
                    </div>
                  )}
                  <div className={styles.resultsList}>
                    <div className={styles.resultsHeader}>Relevant documentation:</div>
                    {results.map((result, index) => (
                      <a
                        key={index}
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
                </>
              )}
            </div>
          {isLoading ? (
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
          ) : results.length === 0 ? (
            <div className={styles.noResults}>
              <div className={styles.gptResponse}>
                {response ? renderMarkdown(response) : <p>No results found. Try different keywords or check your spelling.</p>}
              </div>
            </div>
          ) : (
            <>
              {response && (
                <div className={styles.gptResponse}>
                  {renderMarkdown(response)}
                </div>
              )}
              <div className={styles.resultsList}>
                <div className={styles.resultsHeader}>Relevant documentation:</div>
                {results.map((result, index) => (
                  <a
                    key={index}
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
            </>
          )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavbarSearchBar;
