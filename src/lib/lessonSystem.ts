export interface Lesson {
  id: number;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  keys: string[];
  text: string;
  targetWpm: number;
  targetAccuracy: number;
  isLocked: boolean;
}

export const lessons: Lesson[] = [
  // Beginner - Home Row
  {
    id: 1,
    title: "Home Row Basics",
    description: "Learn F and J keys with home row position",
    difficulty: "beginner",
    category: "Home Row",
    keys: ["F", "J"],
    text: "fff jjj fff jjj fjf jfj fjf jfj fff jjj fjfjfj jfjfjf fjf jfj",
    targetWpm: 15,
    targetAccuracy: 90,
    isLocked: false,
  },
  {
    id: 2,
    title: "Adding D and K",
    description: "Expand to D and K keys",
    difficulty: "beginner",
    category: "Home Row",
    keys: ["F", "J", "D", "K"],
    text: "ddd kkk fff jjj dkf jdk fkj djf ddd kkk fjdk kjfd dkfj jkdf",
    targetWpm: 18,
    targetAccuracy: 90,
    isLocked: false,
  },
  {
    id: 3,
    title: "Complete Home Row",
    description: "Master all home row keys: A S D F J K L ;",
    difficulty: "beginner",
    category: "Home Row",
    keys: ["A", "S", "D", "F", "J", "K", "L", ";"],
    text: "aaa sss ddd fff jjj kkk lll ;;; asdf jkl; fdsa ;lkj ask; las; fad; jak;",
    targetWpm: 20,
    targetAccuracy: 92,
    isLocked: false,
  },
  {
    id: 4,
    title: "Home Row Words",
    description: "Type real words using home row keys",
    difficulty: "beginner",
    category: "Home Row",
    keys: ["A", "S", "D", "F", "J", "K", "L"],
    text: "sad lad dad fad ask flask flask salad salad fall falls flask dad lad sad",
    targetWpm: 22,
    targetAccuracy: 92,
    isLocked: false,
  },

  // Beginner - Top Row
  {
    id: 5,
    title: "Top Row Introduction",
    description: "Learn R and U keys",
    difficulty: "beginner",
    category: "Top Row",
    keys: ["R", "U", "F", "J"],
    text: "rrr uuu fff jjj ruf jur fur ruj ruff juju ruff juru frur juru",
    targetWpm: 20,
    targetAccuracy: 90,
    isLocked: false,
  },
  {
    id: 6,
    title: "Expanding Top Row",
    description: "Add E I O keys to your practice",
    difficulty: "beginner",
    category: "Top Row",
    keys: ["E", "I", "O", "R", "U"],
    text: "eee iii ooo rrr uuu euro euro fire fireoire euro fire ore ire rue",
    targetWpm: 22,
    targetAccuracy: 92,
    isLocked: false,
  },
  {
    id: 7,
    title: "Complete Top Row",
    description: "Master all top row keys: Q W E R T Y U I O P",
    difficulty: "beginner",
    category: "Top Row",
    keys: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    text: "qwerty qwerty type type write write power power query query trip trip",
    targetWpm: 25,
    targetAccuracy: 92,
    isLocked: false,
  },

  // Beginner - Bottom Row
  {
    id: 8,
    title: "Bottom Row Start",
    description: "Learn V and M keys",
    difficulty: "beginner",
    category: "Bottom Row",
    keys: ["V", "M", "F", "J"],
    text: "vvv mmm fff jjj vim vim move move movie movie vamp vamp",
    targetWpm: 20,
    targetAccuracy: 90,
    isLocked: false,
  },
  {
    id: 9,
    title: "Complete Bottom Row",
    description: "Master Z X C V B N M keys",
    difficulty: "beginner",
    category: "Bottom Row",
    keys: ["Z", "X", "C", "V", "B", "N", "M"],
    text: "zzz xxx ccc vvv bbb nnn mmm zinc zone cave cave bomb bomb name name",
    targetWpm: 22,
    targetAccuracy: 92,
    isLocked: false,
  },

  // Intermediate - Common Words
  {
    id: 10,
    title: "Simple Words",
    description: "Practice typing common 3-4 letter words",
    difficulty: "intermediate",
    category: "Words",
    keys: ["All"],
    text: "the and for are but not you all can her was one our out day get has him his how man new now old see two way who boy did its let put say she too use",
    targetWpm: 28,
    targetAccuracy: 93,
    isLocked: false,
  },
  {
    id: 11,
    title: "Common Words",
    description: "Type frequently used English words",
    difficulty: "intermediate",
    category: "Words",
    keys: ["All"],
    text: "time work year back call come hand keep word down give most tell where would about after again could other these think which their because before should through around",
    targetWpm: 30,
    targetAccuracy: 93,
    isLocked: false,
  },
  {
    id: 12,
    title: "Longer Words",
    description: "Practice typing 6-8 letter words",
    difficulty: "intermediate",
    category: "Words",
    keys: ["All"],
    text: "people number system school become during little different present without important another together following something complete question possible condition different available",
    targetWpm: 32,
    targetAccuracy: 94,
    isLocked: false,
  },

  // Intermediate - Sentences
  {
    id: 13,
    title: "Simple Sentences",
    description: "Type complete sentences with punctuation",
    difficulty: "intermediate",
    category: "Sentences",
    keys: ["All"],
    text: "I can type fast. You are doing well. She works every day. He likes to read. They play in the park. We learn new things. This is a good lesson. That was amazing work.",
    targetWpm: 30,
    targetAccuracy: 94,
    isLocked: false,
  },
  {
    id: 14,
    title: "Complex Sentences",
    description: "Practice with longer, complex sentences",
    difficulty: "intermediate",
    category: "Sentences",
    keys: ["All"],
    text: "The quick brown fox jumps over the lazy dog. Practice makes perfect when you type every day. Learning to type quickly improves your productivity. Typing is an essential skill in the modern workplace.",
    targetWpm: 33,
    targetAccuracy: 94,
    isLocked: false,
  },

  // Advanced - Numbers and Symbols
  {
    id: 15,
    title: "Number Row",
    description: "Master typing numbers 0-9",
    difficulty: "advanced",
    category: "Numbers",
    keys: ["0-9"],
    text: "123 456 789 012 345 678 901 234 567 890 1234 5678 9012 3456 7890 12345 67890",
    targetWpm: 28,
    targetAccuracy: 92,
    isLocked: false,
  },
  {
    id: 16,
    title: "Special Characters",
    description: "Practice symbols and special characters",
    difficulty: "advanced",
    category: "Symbols",
    keys: ["!@#$%^&*()"],
    text: "hello@email.com user123! price$50 #trending 100% star* code() item[0] value{x} question? end.",
    targetWpm: 25,
    targetAccuracy: 92,
    isLocked: false,
  },

  // Advanced - Paragraphs
  {
    id: 17,
    title: "Short Paragraph",
    description: "Type a complete paragraph with flow",
    difficulty: "advanced",
    category: "Paragraphs",
    keys: ["All"],
    text: "Typing is an essential skill in today's digital world. Whether you're writing emails, creating documents, or chatting with friends, being able to type quickly and accurately saves time and reduces frustration. With regular practice, anyone can improve their typing speed and accuracy.",
    targetWpm: 35,
    targetAccuracy: 95,
    isLocked: false,
  },
  {
    id: 18,
    title: "Medium Paragraph",
    description: "Practice with a longer, detailed paragraph",
    difficulty: "advanced",
    category: "Paragraphs",
    keys: ["All"],
    text: "The benefits of learning to touch type extend far beyond just speed. Touch typing allows you to focus on your thoughts rather than hunting for keys on the keyboard. This mental freedom enables better creativity and productivity. Professional typists often reach speeds of 60 to 80 words per minute, but even moderate improvements can make a significant difference in your daily work. The key to success is consistent practice and proper finger placement on the home row keys.",
    targetWpm: 38,
    targetAccuracy: 95,
    isLocked: false,
  },
  {
    id: 19,
    title: "Long Paragraph",
    description: "Master typing extended content",
    difficulty: "advanced",
    category: "Paragraphs",
    keys: ["All"],
    text: "In the modern workplace, typing proficiency is no longer optional—it's a fundamental requirement. From software developers writing thousands of lines of code to content creators crafting engaging articles, the ability to translate thoughts into text efficiently is invaluable. Studies have shown that improved typing skills directly correlate with increased productivity and job satisfaction. Moreover, as remote work becomes increasingly common, strong typing abilities are essential for effective digital communication. By dedicating time to structured practice and focusing on accuracy before speed, you can develop this crucial skill and enhance your professional capabilities significantly.",
    targetWpm: 40,
    targetAccuracy: 96,
    isLocked: false,
  },
  {
    id: 20,
    title: "Master Challenge",
    description: "Ultimate typing test with complex text",
    difficulty: "advanced",
    category: "Challenge",
    keys: ["All"],
    text: "Congratulations on reaching the final lesson! You've progressed from learning individual keys to typing complete paragraphs with confidence and accuracy. This journey has strengthened your muscle memory, improved your hand-eye coordination, and developed your ability to type without looking at the keyboard. Remember that mastery comes with continuous practice. Set personal goals, track your progress, and challenge yourself regularly. Whether you're aiming for 50, 70, or even 100 words per minute, consistent practice will get you there. Keep refining your technique, maintain proper posture, and most importantly, enjoy the process of becoming a typing master!",
    targetWpm: 45,
    targetAccuracy: 97,
    isLocked: false,
  },
];

export const getLessonById = (id: number): Lesson | undefined => {
  return lessons.find((lesson) => lesson.id === id);
};

export const getLessonsByDifficulty = (difficulty: string): Lesson[] => {
  return lessons.filter((lesson) => lesson.difficulty === difficulty);
};

export const getLessonsByCategory = (category: string): Lesson[] => {
  return lessons.filter((lesson) => lesson.category === category);
};

export const getNextLesson = (currentId: number): Lesson | null => {
  const currentIndex = lessons.findIndex((l) => l.id === currentId);
  return currentIndex !== -1 && currentIndex < lessons.length - 1
    ? lessons[currentIndex + 1]
    : null;
};

export const calculateProgress = (completedLessons: number[]): number => {
  return Math.round((completedLessons.length / lessons.length) * 100);
};