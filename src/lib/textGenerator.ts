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
