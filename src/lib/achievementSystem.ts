export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "speed" | "accuracy" | "consistency" | "milestone";
  requirement: {
    type: "wpm" | "accuracy" | "lessons" | "streak";
    value: number;
  };
  unlocked: boolean;
  unlockedAt?: Date;
}

export const achievements: Achievement[] = [
  // Speed Achievements
  {
    id: "speed_beginner",
    title: "Speed Starter",
    description: "Reach 20 WPM",
    icon: "🚀",
    category: "speed",
    requirement: { type: "wpm", value: 20 },
    unlocked: false,
  },
  {
    id: "speed_intermediate",
    title: "Fast Typer",
    description: "Reach 40 WPM",
    icon: "⚡",
    category: "speed",
    requirement: { type: "wpm", value: 40 },
    unlocked: false,
  },
  {
    id: "speed_advanced",
    title: "Speed Demon",
    description: "Reach 60 WPM",
    icon: "🔥",
    category: "speed",
    requirement: { type: "wpm", value: 60 },
    unlocked: false,
  },
  {
    id: "speed_expert",
    title: "Lightning Fingers",
    description: "Reach 80 WPM",
    icon: "⚡",
    category: "speed",
    requirement: { type: "wpm", value: 80 },
    unlocked: false,
  },
  {
    id: "speed_master",
    title: "Speed Champion",
    description: "Reach 100 WPM",
    icon: "👑",
    category: "speed",
    requirement: { type: "wpm", value: 100 },
    unlocked: false,
  },

  // Accuracy Achievements
  {
    id: "accuracy_good",
    title: "Accuracy Apprentice",
    description: "Achieve 90% accuracy",
    icon: "🎯",
    category: "accuracy",
    requirement: { type: "accuracy", value: 90 },
    unlocked: false,
  },
  {
    id: "accuracy_great",
    title: "Precision Typist",
    description: "Achieve 95% accuracy",
    icon: "🎯",
    category: "accuracy",
    requirement: { type: "accuracy", value: 95 },
    unlocked: false,
  },
  {
    id: "accuracy_perfect",
    title: "Accuracy Master",
    description: "Achieve 98% accuracy",
    icon: "💎",
    category: "accuracy",
    requirement: { type: "accuracy", value: 98 },
    unlocked: false,
  },
  {
    id: "accuracy_flawless",
    title: "Flawless Execution",
    description: "Achieve 100% accuracy",
    icon: "⭐",
    category: "accuracy",
    requirement: { type: "accuracy", value: 100 },
    unlocked: false,
  },

  // Milestone Achievements
  {
    id: "lessons_5",
    title: "Getting Started",
    description: "Complete 5 lessons",
    icon: "📚",
    category: "milestone",
    requirement: { type: "lessons", value: 5 },
    unlocked: false,
  },
  {
    id: "lessons_10",
    title: "Dedicated Learner",
    description: "Complete 10 lessons",
    icon: "📖",
    category: "milestone",
    requirement: { type: "lessons", value: 10 },
    unlocked: false,
  },
  {
    id: "lessons_15",
    title: "Committed Student",
    description: "Complete 15 lessons",
    icon: "🎓",
    category: "milestone",
    requirement: { type: "lessons", value: 15 },
    unlocked: false,
  },
  {
    id: "lessons_all",
    title: "Course Complete",
    description: "Complete all 20 lessons",
    icon: "🏆",
    category: "milestone",
    requirement: { type: "lessons", value: 20 },
    unlocked: false,
  },

  // Consistency Achievements
  {
    id: "streak_3",
    title: "Building Momentum",
    description: "Practice 3 days in a row",
    icon: "📅",
    category: "consistency",
    requirement: { type: "streak", value: 3 },
    unlocked: false,
  },
  {
    id: "streak_7",
    title: "Week Warrior",
    description: "Practice 7 days in a row",
    icon: "🔥",
    category: "consistency",
    requirement: { type: "streak", value: 7 },
    unlocked: false,
  },
  {
    id: "streak_30",
    title: "Monthly Master",
    description: "Practice 30 days in a row",
    icon: "💪",
    category: "consistency",
    requirement: { type: "streak", value: 30 },
    unlocked: false,
  },
];

export interface UserProgress {
  completedLessons: number[];
  bestWpm: number;
  bestAccuracy: number;
  totalPracticeTime: number; // in minutes
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string;
  achievements: Achievement[];
}

export const getDefaultProgress = (): UserProgress => ({
  completedLessons: [],
  bestWpm: 0,
  bestAccuracy: 0,
  totalPracticeTime: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastPracticeDate: "",
  achievements: achievements.map((a) => ({ ...a })),
});

export const saveProgress = (progress: UserProgress): void => {
  localStorage.setItem("typingProgress", JSON.stringify(progress));
};

export const loadProgress = (): UserProgress => {
  const saved = localStorage.getItem("typingProgress");
  if (saved) {
    return JSON.parse(saved);
  }
  return getDefaultProgress();
};

export const checkAndUnlockAchievements = (
  progress: UserProgress,
  currentWpm: number,
  currentAccuracy: number
): { unlockedNew: Achievement[]; updated: UserProgress } => {
  const unlockedNew: Achievement[] = [];
  const updatedAchievements = progress.achievements.map((achievement) => {
    if (achievement.unlocked) return achievement;

    let shouldUnlock = false;

    switch (achievement.requirement.type) {
      case "wpm":
        shouldUnlock = currentWpm >= achievement.requirement.value;
        break;
      case "accuracy":
        shouldUnlock = currentAccuracy >= achievement.requirement.value;
        break;
      case "lessons":
        shouldUnlock =
          progress.completedLessons.length >= achievement.requirement.value;
        break;
      case "streak":
        shouldUnlock = progress.currentStreak >= achievement.requirement.value;
        break;
    }

    if (shouldUnlock) {
      unlockedNew.push(achievement);
      return { ...achievement, unlocked: true, unlockedAt: new Date() };
    }

    return achievement;
  });

  return {
    unlockedNew,
    updated: { ...progress, achievements: updatedAchievements },
  };
};

export const updateStreak = (progress: UserProgress): UserProgress => {
  const today = new Date().toDateString();
  const lastPractice = progress.lastPracticeDate
    ? new Date(progress.lastPracticeDate).toDateString()
    : "";

  if (lastPractice === today) {
    return progress; // Already practiced today
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();

  let newStreak = progress.currentStreak;

  if (lastPractice === yesterdayStr) {
    newStreak += 1; // Continue streak
  } else if (lastPractice !== today) {
    newStreak = 1; // Start new streak
  }

  const newLongest = Math.max(newStreak, progress.longestStreak);

  return {
    ...progress,
    currentStreak: newStreak,
    longestStreak: newLongest,
    lastPracticeDate: today,
  };
};