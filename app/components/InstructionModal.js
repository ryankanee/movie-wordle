/**
 * Modal component that displays game instructions on first load
 */
export const InstructionModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="instruction-modal-overlay">
      <div className="instruction-modal">
        <div className="instruction-modal-header">
          <h2>🎯 How to Play Movie Wordle</h2>
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="instruction-modal-content">
          <div className="instructions-text">
            <p>🎬 <strong>Guess the movie title in 6 tries or fewer!</strong></p>
            <p>📝 Start typing to see movie suggestions, then click to make your guess</p>
            <p>🎨 Each guess will show you movie information with color-coded hints</p>
          </div>
          
          <div className="legend">
            <h3>Color Guide:</h3>
            <div className="legend-item">
              <div className="legend-tile tile-correct">✓</div>
              <span><strong>Green</strong> - Exact match</span>
            </div>
            <div className="legend-item">
              <div className="legend-tile tile-close">~</div>
              <span><strong>Yellow</strong> - Close match (Year: ±5, Gross: ±$50M, Oscars: ±1)</span>
            </div>
            <div className="legend-item">
              <div className="legend-tile tile-incorrect">✗</div>
              <span><strong>Red</strong> - No match</span>
            </div>
          </div>
        </div>
        
        <div className="instruction-modal-footer">
          <button className="btn-primary" onClick={onClose}>
            Start Playing!
          </button>
        </div>
      </div>
    </div>
  );
};
