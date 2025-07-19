/**
 * Navigation bar component with clickable title, About, and Help sections
 */
export const Navbar = ({
  onShowHelp,
  onShowHome,
  onShowAbout,
  activeSection = "home",
}) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <button className="navbar-title-button" onClick={onShowHome}>
            🎬 Movie Wordle
          </button>
        </div>

        <div className="navbar-right">
          <button
            className="help-button"
            onClick={onShowHelp}
            title="Show instructions"
          >
            ?
          </button>
          <button
            className={`nav-link ${activeSection === "about" ? "active" : ""}`}
            onClick={onShowAbout}
          >
            About
          </button>
        </div>
      </div>
    </nav>
  );
};
