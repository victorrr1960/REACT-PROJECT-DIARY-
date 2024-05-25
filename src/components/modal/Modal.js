import React, { useState } from "react";
import { DateTime } from "luxon";
import "./modal.css";

import { Alert } from "@mui/material";

function Modal({ category, title, text, id, onSubmitted, cancel }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [formTitle, setTitle] = useState(title);
  const [formText, setText] = useState(text);
  const [formCategory, setFormCategory] = useState(category || "Work");
  const jwtToken = process.env.REACT_APP_JWT_TOKEN;

  const categories = ["Work", "Personal", "School", "Community"]; 

  const MoodSelector = () => (
    <div>
      <select
        value={formCategory}
        onChange={(e) => setFormCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        category: formCategory,
        title: formTitle,
        text: formText,
        date: DateTime.now().toLocaleString(DateTime.DATETIME_MED),
      }),
      headers: new Headers({
        Authorization: jwtToken,
        "Content-Type": "application/json",
      }),
    };
    try {
      let response;
      if (id) {
        response = await fetch(
          "https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/books/" +
            id,
          { ...requestOptions, method: "PUT" }
        );
      } else {
        response = await fetch(
          "https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/books",
          requestOptions
        );
      }

      const data = await response.json();

      if (data) {
        onSubmitted();
        console.log("Save successful");
        setErrorMessage("");
      } else {
        setErrorMessage("Error creating document");
      }
    } catch (error) {
      console.error("Error creating document:", error);
      setErrorMessage("Error creating document");
    }
  };
  return (
    <div className="modal_container">
      <div className="modal_content">
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label>category</label>
              <MoodSelector />
            </div>

            <label>Title</label>
            <input
              placeholder="Enter title"
              value={formTitle}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label>Text</label>
            <textarea
              placeholder="Enter text"
              value={formText}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="form-buttons">
            <button type="button" className="btn error" onClick={cancel}>
              Cancel
            </button>
            <button type="submit" className="btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
