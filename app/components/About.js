/**
 * About section component
 */
export const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2>About Movie Wordle</h2>
        
        <div className="about-section">
          <h3>🎬 What is Movie Wordle?</h3>
          <p>
            Movie Wordle is a fun twist on the classic word-guessing game, but instead of words, 
            you&apos;re guessing movie titles! Test your film knowledge by trying to identify the 
            mystery movie in 6 guesses or fewer.
          </p>
        </div>

        <div className="about-section">
          <h3>🎯 How It Works</h3>
          <p>
            Each guess reveals information about the movie including its year, director, genre, 
            box office gross, and Oscar wins. Color-coded hints help guide you:
          </p>
          <ul>
            <li><span className="color-indicator green"></span> <strong>Green:</strong> Exact match</li>
            <li><span className="color-indicator yellow"></span> <strong>Yellow:</strong> Close match (within range)</li>
            <li><span className="color-indicator red"></span> <strong>Red:</strong> No match</li>
          </ul>
        </div>

        <div className="about-section">
          <h3>🎪 Features</h3>
          <ul>
            <li>🎭 Curated selection of popular movies</li>
            <li>📊 Smart hint system with movie metadata</li>
            <li>🎨 Beautiful, intuitive interface</li>
            <li>📱 Fully responsive design</li>
            <li>🎮 New puzzle every session</li>
          </ul>
        </div>

        <div className="about-section">
          <h3>🚀 Built With</h3>
          <p>
            Movie Wordle is built with Next.js and React, featuring a modern design 
            and smooth user experience. The game includes a comprehensive database 
            of movies with detailed metadata for accurate hint generation.
          </p>
        </div>

        <div className="about-footer">
          <p>Ready to test your movie knowledge? Click Home to start playing! 🍿</p>
        </div>
      </div>
    </div>
  );
};
