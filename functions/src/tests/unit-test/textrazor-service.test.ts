import TextRazorService from "../../services/api/textrazor-service";

// TODO: Tests to be written
// TODO: FilterJSON
// DONE: Form Categories
// DONE: Form Topics
// DONE: Get unique categories
const SERVICE = new TextRazorService();

// Test the FilterJSON function
test("Test the get unique categories function", async () => {
  //Arrange
  const categories: { name: string; score: number }[] = [
    { name: "category1", score: 1 },
    { name: "category1", score: 1 },
    { name: "category1", score: 1 },
    { name: "category2", score: 2 },
    { name: "category2", score: 3 },
    { name: "category3", score: 3 },
    { name: "category3", score: 1 }
  ];

  // Act
  const uniqueCategories = SERVICE.getUniqueCategories(categories);

  // Assert
  expect(uniqueCategories.length).toBe(3);
  expect(uniqueCategories[0].name).toBe("category1");
  expect(uniqueCategories[1].name).toBe("category2");
  expect(uniqueCategories[2].name).toBe("category3");
});

test("test the format topics", async () => {
  // Arrang
  const topics: { label: string; score: string }[] = [
    { label: "topic", score: "1" },
    { label: "topic2", score: "0.7" },
    { label: "topic3", score: "0.2" }
  ];
  const json = JSON.parse(JSON.stringify(topics));
  console.log(json);
  // Act
  const formattedTopics: {
    name: string;
    score: number;
  }[] = SERVICE.formatTopics(json);

  // Assert - expect MIN_TOPIC_SCORE to be 0.6
  console.log(formattedTopics);
  expect(formattedTopics.length).toBe(2);
  expect(formattedTopics[0].name).toBe("topic");
  expect(formattedTopics[1].name).toBe("topic2");
  expect(formattedTopics[2]).toBeNull;
});

test("test the format categories", async () => {
  // Arrang
  const categories: { label: string; score: string }[] = [
    { label: "category", score: "1" },
    { label: "category2", score: "0.7" },
    { label: "category3", score: "0.2" }
  ];
  const json = JSON.parse(JSON.stringify(categories));
  // Act
  const formattedCategories: {
    name: string;
    score: number;
  }[] = SERVICE.formatCategories(json);

  // Assert - expect MIN_TOPIC_SCORE to be 0.6
  expect(formattedCategories.length).toBe(2);
  expect(formattedCategories[0].name).toBe("category");
  expect(formattedCategories[1].name).toBe("category2");
  expect(formattedCategories[2]).toBeNull;
});
