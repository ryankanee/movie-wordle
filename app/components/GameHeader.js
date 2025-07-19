/**
 * Main game header component
 */
export const GameHeader = ({ onShowHelp }) => {
  return (
    <div className="header-container">
      <div className="header-left">
        {onShowHelp && (
          <button className="help-button" onClick={onShowHelp} title="Show instructions">
            ?
          </button>
        )}
      </div>
      <h1 className="title">🎬 Movie Wordle</h1>
      <div className="header-right"></div>
    </div>
  );
};
