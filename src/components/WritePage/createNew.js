import React, { useState } from "react";
import "./CreateNew.styles.css";

function CreateNew({ onSubmit }) {
  const [formData, setFormData] = useState({
    type: "text",
    content: ""
  });

  function handleInputChange({ target }) {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const id = Math.floor(Math.random() * (999999 - 99) + 99);
    const user = {
      id: 1,
      name: "katarina toren",
      image: "https://randomuser.me/api/portraits/thumb/women/20.jpg"
    };
    const postData = {
      ...formData,
      id,
      user
    };

    onSubmit(postData);
  }

  const { content, type } = formData;

  return (
    <form className="create-new" onSubmit={handleFormSubmit}>
      <div className="control-wrapper">
        <label>Content Type</label>
        <select name="type" value={type} onChange={handleInputChange}>
          <option value="image">Image</option>
          <option value="text">Text</option>
        </select>
      </div>

      {type === "image" ? (
        <div className="control-wrapper">
          <label>Image URL</label>
          <input
            name="content"
            type="text"
            value={content}
            onChange={handleInputChange}
          />
        </div>
      ) : (
        <div className="control-wrapper">
          <label>Blog Text</label>
          <textarea
            name="content"
            value={content}
            onChange={handleInputChange}
          />
        </div>
      )}

      <button type="Submit">Submit</button>
    </form>
  );
}

export default CreateNew;
