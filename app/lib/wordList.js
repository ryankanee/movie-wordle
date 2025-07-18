export const WORD_LIST = [
  // Classic Movies
  "rocky", "alien", "jaws", "ghost", "speed", "drive", "blade", "crash", "birds", "twins",
  
  // Action Movies
  "taken", "focus", "panic", "heist", "sneak", "beast", "storm", "vault", "alpha", "bravo",
  
  // Horror Movies
  "scream", "smile", "fresh", "weird", "creep", "curse", "demon", "witch", "grave", "blood",
  
  // Comedy Movies
  "borat", "dumb", "smart", "funny", "laugh", "silly", "goofy", "crazy", "super", "buddy",
  
  // Drama Movies
  "ocean", "fight", "seven", "chess", "quest", "dream", "magic", "power", "glory", "honor",
  
  // Sci-Fi Movies
  "matrix", "space", "lunar", "cyber", "robot", "clone", "neuro", "virus", "logic", "titan",
  
  // Disney/Pixar
  "coco", "soul", "brave", "moana", "cars", "bugs", "wall", "nemo", "up", "inside",
  
  // Marvel/DC
  "joker", "flash", "arrow", "venom", "spawn", "storm", "raven", "beast", "robin", "hulk",
  
  // More Recent
  "dune", "tenet", "roma", "green", "shape", "three", "lady", "star", "waves", "sound"
];

export function getRandomWord() {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}

export function getMovieSuggestions(input) {
  if (!input || input.length < 1) return [];
  
  const lowerInput = input.toLowerCase();
  return WORD_LIST.filter(movie => 
    movie.toLowerCase().startsWith(lowerInput)
  ).slice(0, 10); // Limit to 10 suggestions
}

export function isValidMovieTitle(title) {
  return WORD_LIST.includes(title.toLowerCase());
}
