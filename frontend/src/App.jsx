import React, { useState } from "react";

export default function UserFormTable() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    skill: "",
    qualification: "",
    color: "white",
  });

  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  
  const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 const handleSubmit = (e) => {
  e.preventDefault();
  if (editIndex !== null) {
      const updatedData = [...data];
      updatedData[editIndex] = formData;
      setData(updatedData);
      setEditIndex(null);
    } else {
    setData([...data, formData]);
    }
  setFormData({
      name: "",
      age: "",
      skill: "",
      qualification: "",
      color: "white",
    });
  };

  
  const handleDelete = (index) => {
  const filteredData = data.filter((_, i) => i !== index);
    setData(filteredData);
  };

  const handleEdit = (index) => {
  setFormData(data[index]); 
    setEditIndex(index);
  };


  const handleColor = (index) => {
   const updatedData = [...data];
  updatedData[index] = { ...updatedData[index], appliedColor: updatedData[index].color };
    setData(updatedData);
  };

  return (
    <div style={{ padding: "20px"}}>
      <h2>User Details Form</h2>
      <form onSubmit={handleSubmit}>
        <input
       type="text"
     name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="skill"
          placeholder="Enter Skill"
          value={formData.skill}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="qualification"
          placeholder="Enter Qualification"
          value={formData.qualification}
          onChange={handleChange}
          required
        />
        <select name="color" value={formData.color} onChange={handleChange}>
          <option value="white">White</option>
          <option value="red">Red</option>
        <option value="green">Green</option>
          <option value="black">Black</option>
          <option value="yellow">Yellow</option>
         <option value="pink">Pink</option>
        </select>
        <button type="submit">{editIndex !== null ? "Update" : "Add"}</button>
      </form>

      <h3>Submitted Data</h3>
    {data.length > 0 ? (
        <table border="1"  style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
            <tr>
            <th>Name</th>
              <th>Age</th>
            <th>Skill</th>
         <th>Qualification</th>
              <th>Color</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((t, index) => (
              <tr key={index} style={{ backgroundColor: t.appliedColor || "white" }}>
                <td>{t.name}</td>
            <td>{t.age}</td>
                <td>{t.skill}</td>
            <td>{t.qualification}</td>
                <td>{t.color}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
       <button onClick={() => handleDelete(index)}>Delete</button>
<button onClick={() => handleColor(index)}>Color</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data submitted yet.</p>
      )}
    </div>
  );
}
