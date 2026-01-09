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
      return `I couldn't find specific documentation matching "${query}". Try rephrasing your question or using different keywords. You might also want to browse the documentation sections directly.`;
    }

    const queryLower = query.toLowerCase();
    const isQuestion = query.trim().endsWith('?');
    const isHowTo = /^(how|what|when|where|why|can|does|do|is|are)\b/i.test(query);
    
    let intro = '';
    if (isQuestion || isHowTo) {
      intro = `Based on your question about "${query}", `;
    } else {
      intro = `Here's what I found about "${query}": `;
    }

    if (results.length === 1) {
      return `${intro}I found a relevant document that should help: **${results[0].title}**. ${results[0].description ? `It covers ${results[0].description.toLowerCase()}.` : ''} This should answer your question.`;
    }

    const topResult = results[0];
    const otherCount = results.length - 1;
    
    let response = `${intro}I found ${results.length} relevant ${results.length === 1 ? 'document' : 'documents'}. `;
    response += `The most relevant is **${topResult.title}**${topResult.description ? `, which covers ${topResult.description.toLowerCase()}` : ''}. `;
    
    if (otherCount > 0) {
      response += `I also found ${otherCount} other ${otherCount === 1 ? 'document' : 'documents'} that might be helpful. `;
    }
    
    response += `Check out the results below for more details.`;
    
    return response;
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
