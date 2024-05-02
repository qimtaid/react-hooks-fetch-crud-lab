import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Function to add a new question to the list
  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={addQuestion} /> : <QuestionList questions={questions} />}
    </main>
  );
}

export default App;
