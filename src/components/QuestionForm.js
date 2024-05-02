import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(event) {
    if (["answer1", "answer2", "answer3", "answer4"].includes(event.target.name)) {
      const answers = [...formData.answers];
      answers[event.target.name.slice(-1) - 1] = event.target.value;
      setFormData({ ...formData, answers });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, correctIndex: parseInt(formData.correctIndex) })
    })
      .then(res => res.json())
      .then(newQuestion => {
        onAddQuestion(newQuestion); // Add new question to the list
        setFormData({
          prompt: "",
          answers: ["", "", "", ""],
          correctIndex: 0
        });
      });
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input type="text" name="prompt" value={formData.prompt} onChange={handleChange} />
        </label>
        {formData.answers.map((answer, index) => (
          <label key={index}>
            Answer {index + 1}:
            <input type="text" name={`answer${index + 1}`} value={answer} onChange={handleChange} />
          </label>
        ))}
        <label>
          Correct Answer:
          <select name="correctIndex" value={formData.correctIndex} onChange={handleChange}>
            {formData.answers.map((answer, index) => (
              <option key={index} value={index}>{answer || `Answer ${index + 1}`}</option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
