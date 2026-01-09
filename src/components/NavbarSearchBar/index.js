import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

// API base URL - works in production, may need local server in development
const API_BASE = '/api/mcp';

function NavbarSearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [response, setResponse] = useState('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target) &&
        !inputRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSearch = async (query) => {
    if (!query.trim() || isLoading) return;

    setHasSearched(true);
    setIsLoading(true);
    setIsOpen(true);

    try {
      // Auto-detect if query is about building/integration (will auto-filter to v5)
      const isBuildingQuery = /\b(build|integrate|integration|deploy|launch|setup|configure|implement|develop|code|api|contract|hook|example|tutorial|how to|getting started)\b/i.test(query);
      
      // Call Claude-powered ask endpoint
      const response = await fetch(`${API_BASE}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query,
          category: isBuildingQuery ? 'developer' : 'all',
          version: 'all', // Server will auto-filter to v5 for building queries
          maxDocs: 5, // Number of docs to include in context
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
        const errorMessage = errorData.error || `Request failed with status ${response.status}`;
        
        // Check if it's an API key error
        if (errorMessage.includes('ANTHROPIC_API_KEY')) {
          throw new Error('Claude API key not configured. Please set ANTHROPIC_API_KEY in your environment variables.');
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Set Claude's response
      setResponse(data.response || 'No response from Claude.');
      
      // Convert sources to results format for display
      setResults((data.sources || []).map((source, index) => ({
        title: source.title,
        url: source.url,
        description: source.description || `Documentation source ${index + 1}`,
        path: source.path,
      })));
    } catch (error) {
      console.error('Claude API error:', error);
      setResults([]);
      setResponse(`I encountered an error: ${error.message}. Please try again or check that the Claude API key is configured.`);
    } finally {
      setIsLoading(false);
    }
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
      setIsOpen(false);
      setInput('');
      setResults([]);
      setResponse('');
      setHasSearched(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value.trim()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setResults([]);
      setResponse('');
      setHasSearched(false);
    }
  };

  return (
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
            onFocus={() => {
              if (input.trim() || hasSearched) {
                setIsOpen(true);
              }
            }}
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
              onClick={() => {
                setInput('');
                setResults([]);
                setResponse('');
                setIsOpen(false);
                setHasSearched(false);
                inputRef.current?.focus();
              }}
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

      {/* Results Dropdown */}
      {isOpen && (hasSearched || results.length > 0) && (
        <div ref={resultsRef} className={styles.resultsDropdown}>
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
                      setIsOpen(false);
                      setInput('');
                      setResults([]);
                      setResponse('');
                      setHasSearched(false);
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
      )}
    </div>
  );
}

export default NavbarSearchBar;
