
import { ref, push, set, get } from "firebase/database";
import { database } from "./firebaseConfig";

// Save quiz question
export async function createQuizQuestion(questionData) {
  try {
    const questionRef = push(ref(database, "quiz-questions"));

    await set(questionRef, questionData);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Fetch quiz questions
export async function getQuizQuestions() {
  try {
    const questionsRef = ref(database, "quiz-questions");

    const snapshot = await get(questionsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      return Object.entries(data).map(([id, question]) => ({
        id,
        ...question
      }));
    }

    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
}
