import React, { useState } from "react";

import axiosWithAuth from "../utils/axiosWithAuth";
import useForm from "./../custom hooks/useForm";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [col, handleColor] = useForm("")
  const [hex, handleHex] = useForm("")
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
      // Make a put request to save your updated color
      // think about where will you get the id from...
      // where is is saved right now?
      e.preventDefault();
      const id = colorToEdit.id
      axiosWithAuth()
        .put(`http://localhost:5000/api/colors/${ id }`, colorToEdit)
        .then(res => updateColors(colors.map(v => (v.id === id)? (colorToEdit) : v)))
        .catch(err => console.log("there was an error updating color", err.message))
        setEditing(false)
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
        .delete(`http://localhost:5000/api/colors/${ color.id }`)
        .then(res => updateColors(colors.filter(v => v.id !== color.id)))
  };
  const handleSubmit = (e) => {
      e.preventDefault()
      axiosWithAuth()
        .post("http://localhost:5000/api/colors", { color: col, code: { hex } })
        .then(res => updateColors(res.data))
        .catch(err => console.log("there was an error adding color", err.message))
  }
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      <div>
      {/* stretch - build another form here to add a color */}
      <form onSubmit={ handleSubmit }>
          <input type="text" onChange={ (e) => handleColor(e.target.value) } placeholder="color name" value={ col } />
          <input type="text" onChange={ (e) => handleHex(e.target.value) } placeholder="hex code" value={ hex } />
          <button type="submit">Add Color</button>
      </form>
    </div>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

    </div>
  );
};

export default ColorList;
