import React, { useState } from 'react';

const Task3: React.FC = () => {
  const [formData, setFormData] = useState({
    text: '',
    email: '',
    password: '',
    number: '',
    date: '',
    time: '',
    color: '',
    range: '50',
    checkbox: false,
    radio: '',
    textarea: '',
    select: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleClear = () => {
    setFormData({
      text: '',
      email: '',
      password: '',
      number: '',
      date: '',
      time: '',
      color: '',
      range: '50',
      checkbox: false,
      radio: '',
      textarea: '',
      select: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Input Types Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">TFull Name</label>
          <input
            type="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>

        <div className="mb-4">
          <label className="block">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>

        <div className="mb-4">
          <label className="block">Password </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>

        <div className="mb-4">
          <label className="block">Age</label>
          <input
            type="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>

        <div className="mb-4">
          <label className="block">Date of Birth</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>

        <div className="mb-4">
          <label className="block">Time Input</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>

        <div className="mb-4">
          <label className="block">Favpurte Colour</label>
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>

        <div className="mb-4">
          <label className="block">Range</label>
          <input
            type="range"
            name="range"
            value={formData.range}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>

        <div className="mb-4">
          <label className="block">Checkbox Input</label>
          <input
            type="checkbox"
            name="checkbox"
            checked={formData.checkbox}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>

        <div className="mb-4">
          <label className="block">Gender</label>
          <input
            type="radio"
            name="radio"
            value="option1"
            checked={formData.radio === 'option1'}
            onChange={handleChange}
            className="mr-2"
          /> Male
          <input
            type="radio"
            name="radio"
            value="option2"
            checked={formData.radio === 'option2'}
            onChange={handleChange}
            className="ml-4 mr-2"
          /> Female
        </div>

        <div className="mb-4">
          <label className="block">Feedback</label>
          <textarea
            name="textarea"
            value={formData.textarea}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block">Select Input</label>
          <select
            name="select"
            value={formData.select}
            onChange={handleChange}
            className="border px-2 py-1"
          >
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Task3;
