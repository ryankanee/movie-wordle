import { useState, useEffect, useRef } from "react";
import { getMovieSuggestions, isValidMovieTitle } from "../lib/wordList";

/**
 * Input component for entering guesses with autocomplete
 */
export const GuessInput = ({ onSubmit, isPlaying, guesses }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputValue.length >= 1) {
      const movieSuggestions = getMovieSuggestions(inputValue);
      setSuggestions(movieSuggestions);
      setShowSuggestions(movieSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedSuggestion(-1);
  }, [inputValue]);

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (value.length <= 5 && /^[A-Za-z]*$/.test(value)) {
      setInputValue(value);
      setError("");
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedSuggestion((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedSuggestion((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Tab":
      case "Enter":
        if (selectedSuggestion >= 0) {
          e.preventDefault();
          selectSuggestion(suggestions[selectedSuggestion]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
        break;
    }
  };

  const selectSuggestion = (suggestion) => {
    const guess = suggestion.toLowerCase();

    // Check if guess has already been made
    if (guesses.includes(guess)) {
      setError("You've already guessed that word!");
      return;
    }

    // Automatically submit the guess
    const success = onSubmit(guess);
    if (success) {
      setInputValue("");
      setError("");
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="guess-input-container">
      <div className="guess-form">
        <div className="input-group">
          <div className="autocomplete-wrapper">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter movie title..."
              className="guess-input"
              disabled={!isPlaying}
              autoFocus
              autoComplete="off"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="suggestions-dropdown">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={suggestion}
                    className={`suggestion-item ${
                      index === selectedSuggestion ? "selected" : ""
                    }`}
                    onClick={() => selectSuggestion(suggestion)}
                  >
                    {suggestion.toUpperCase()}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <p className="input-hint">
          Click on a movie suggestion to make your guess • {6 - guesses.length}{" "}
          guesses remaining
        </p>
      </div>
    </div>
  );
};
