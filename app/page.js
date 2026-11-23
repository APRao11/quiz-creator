
"use client";

import { useState, useEffect } from "react";
import { createQuizQuestion, getQuizQuestions } from "./quizManager";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("A");

  const [savedQuestions, setSavedQuestions] = useState([]);
  const [message, setMessage] = useState("");

  async function loadQuestions() {
    const data = await getQuizQuestions();
    setSavedQuestions(data);
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const questionData = {
      question,
      options: {
        A: optionA,
        B: optionB,
        C: optionC,
        D: optionD
      },
      correctAnswer
    };

    const result = await createQuizQuestion(questionData);

    if (result) {
      setMessage("Question saved successfully!");

      setQuestion("");
      setOptionA("");
      setOptionB("");
      setOptionC("");
      setOptionD("");
      setCorrectAnswer("A");

      await loadQuestions();
    } else {
      setMessage("Failed to save question.");
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold text-center mb-6">
          Quiz Creator
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1 font-semibold">Question</label>
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter quiz question"
              required
              className="w-full border p-3 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Option A</label>
            <input
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
              required
              className="w-full border p-3 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Option B</label>
            <input
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
              required
              className="w-full border p-3 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Option C</label>
            <input
              value={optionC}
              onChange={(e) => setOptionC(e.target.value)}
              required
              className="w-full border p-3 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Option D</label>
            <input
              value={optionD}
              onChange={(e) => setOptionD(e.target.value)}
              required
              className="w-full border p-3 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Correct Answer
            </label>
            <select
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="w-full border p-3 rounded"
            >
              <option value="A">Option A</option>
              <option value="B">Option B</option>
              <option value="C">Option C</option>
              <option value="D">Option D</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black p-3 rounded font-semibold hover:bg-blue-700"
          >
            Save Question
          </button>

          {message && (
            <p className="text-center">{message}</p>
          )}

        </form>

        <hr className="my-8" />

        <h2 className="text-2xl font-bold mb-4">
          Saved Questions
        </h2>

        {savedQuestions.length === 0 ? (
          <p>No questions saved yet.</p>
        ) : (
          savedQuestions.map((item) => (
            <div key={item.id} className="border p-4 rounded mb-4">

              <h3 className="font-bold text-lg mb-2">
                {item.question}
              </h3>

              <p>Option A: {item.options.A}</p>
              <p>Option B: {item.options.B}</p>
              <p>Option C: {item.options.C}</p>
              <p>Option D: {item.options.D}</p>

              <p className="text-green-700 font-semibold mt-2">
                Correct Answer: Option {item.correctAnswer}
              </p>

            </div>
          ))
        )}

      </div>
    </main>
  );
}
