// Very basic for now; you can enhance later with ML
const dailyQuests = [
  "Watch the sunset and journal about your day.",
  "Treat yourself to a solo dessert at your favorite place.",
  "Write a letter to your future self.",
  "Dance to your favorite song alone.",
  "Visit a quiet spot and just breathe for 10 minutes.",
  "Draw your current mood using just colors.",
  "Record yourself talking about your happiest memory."
];

function generateRandomQuest() {
  const randomIndex = Math.floor(Math.random() * dailyQuests.length);
  return {
    title: "Solo Spark Quest",
    description: dailyQuests[randomIndex],
    type: "daily"
  };
}

module.exports = { generateRandomQuest };
