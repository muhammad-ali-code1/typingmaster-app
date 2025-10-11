const easyWords = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
];

const mediumWords = [
  "about", "which", "when", "make", "like", "time", "just", "know", "take", "person",
  "into", "year", "your", "good", "some", "could", "them", "see", "other", "than",
  "then", "now", "look", "only", "come", "its", "over", "think", "also", "back",
  "after", "use", "two", "how", "our", "work", "first", "well", "way", "even",
];

const hardWords = [
  "government", "development", "information", "management", "education", "relationship",
  "understanding", "communication", "organization", "implementation", "environment",
  "technology", "performance", "responsibility", "opportunity", "professional",
  "experience", "international", "significantly", "consideration", "infrastructure",
  "comprehensive", "appropriate", "demonstrate", "particularly", "characteristic",
  "substantial", "contemporary", "distribution", "establishment", "fundamental",
];

// Words organized by letter count for progressive mode
const wordsByLength: Record<number, string[]> = {
  2: ["at", "is", "it", "be", "to", "of", "in", "on", "by", "or", "an", "my", "we", "so", "up", "do", "no", "me", "as", "go"],
  4: ["make", "just", "know", "take", "come", "good", "work", "time", "year", "back", "then", "over", "also", "well", "only", "some", "into", "them", "look", "like"],
  6: ["person", "become", "number", "people", "follow", "change", "around", "system", "before", "school", "during", "public", "little", "family", "really", "simple", "always", "myself", "happen", "appear"],
  8: ["although", "children", "continue", "question", "business", "thousand", "material", "interest", "position", "American", "national", "possible", "probably", "decision", "remember", "consider", "actually", "describe", "standard", "increase"],
  10: ["government", "production", "everything", "understand", "individual", "difference", "management", "experience", "technology", "especially", "throughout", "themselves", "particular", "population", "scientific", "opportunity", "generation", "community", "activities", "responsible"],
  12: ["relationship", "organization", "development", "professional", "significance", "contemporary", "distribution", "neighborhood", "construction", "performance", "environmental", "unemployment", "entertainment", "independence", "international", "contribution", "availability", "appreciation", "consequences", "recognition"],
};

export const generateText = (
  difficulty: "easy" | "medium" | "hard" = "medium",
  wordCount: number = 50
): string => {
  let wordList: string[];
  
  switch (difficulty) {
    case "easy":
      wordList = easyWords;
      break;
    case "hard":
      wordList = hardWords;
      break;
    default:
      wordList = mediumWords;
  }

  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    words.push(wordList[randomIndex]);
  }

  return words.join(" ");
};

export const generateWordsByLength = (letterCount: number, wordCount: number = 5): string => {
  const wordList = wordsByLength[letterCount] || wordsByLength[2];
  const words: string[] = [];
  
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    words.push(wordList[randomIndex]);
  }
  
  return words.join(" ");
};
