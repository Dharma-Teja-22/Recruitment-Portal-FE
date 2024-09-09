// import React, { useState, useEffect } from 'react';

// function FormData() {
//   const [err, setErr] = useState<Partial<Record<keyof formData, string>>>({});
//   const [timeZone, setTimeZone] = useState('Asia/Kolkata'); // Default to India time zone

//   const timeZones = [
//     { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' },
//     { value: 'America/New_York', label: 'New York (EST)' },
//     { value: 'Europe/London', label: 'London (GMT)' },
//     { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
//     { value: 'Australia/Sydney', label: 'Sydney (AEDT)' },
//   ];

//   const [formData, setFormData] = useState<formData>({
//     dateTime: "",
//   });

//   const handleClear = () => {
//     setFormData({
//       dateTime: "",
//     });
//     setErr({});
//   };

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]:
//         type === "checkbox"
//           ? checked
//           : type === "range" || type === "number"
//           ? +value
//           : value,
//     });
//   };

//   const handleTimeZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setTimeZone(e.target.value);
//   };

//   const getConvertedDateTime = (dateTime: string) => {
//     if (!dateTime) return '';

//     const date = new Date(dateTime);
//     return date.toLocaleString('sv-SE', { timeZone }).replace(' ', 'T');
//   };

//   useEffect(() => {
//     if (formData.dateTime) {
//       const convertedDateTime = getConvertedDateTime(formData.dateTime);
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         dateTime: convertedDateTime,
//       }));
//     }
//   }, [timeZone]);

//   function displayData(event: React.FormEvent): void {
//     event.preventDefault();
//     console.log("Form Data Submitted:", formData);
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Form Submission</h1>
//       <form className="space-y-6" onSubmit={displayData}>
//         {/* Existing form fields */}
//         <div className="flex flex-col space-y-2">
//           <label className="text-lg font-medium text-gray-700">Application Date along with Time</label>
//           <input
//             type="datetime-local"
//             name="dateTime"
//             value={formData.dateTime}
//             onChange={handleChange}
//             className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {err.dateTime && <p className="text-red-600 text-sm mt-1">{err.dateTime}</p>}
//         </div>
//         <div className="flex flex-col space-y-2">
//           <label className="text-lg font-medium text-gray-700">Select Time Zone</label>
//           <select
//             name="timeZone"
//             value={timeZone}
//             onChange={handleTimeZoneChange}
//             className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {timeZones.map((zone) => (
//               <option key={zone.value} value={zone.value}>
//                 {zone.label}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="flex space-x-4">
//           <button
//             type="submit"
//             className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
//           >
//             Submit
//           </button>
//           <button
//             type="button"
//             onClick={handleClear}
//             className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
//           >
//             Clear
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default FormData;

import React, { useState } from 'react';

const App = () => {
  const [selectedGender, setSelectedGender] = useState('');

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedGender(event.target.value);
  };

  return (
    <div>
      <h1>Select Gender</h1>
      <div>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={selectedGender === 'male'}
            onChange={handleChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={selectedGender === 'female'}
            onChange={handleChange}
          />
          Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="others"
            checked={selectedGender === 'others'}
            onChange={handleChange}
          />
          Others
        </label>
      </div>

      {selectedGender === 'male' && (
        <div>
          <h2>Question for Male</h2>
          <p>What is your favorite sport?</p>
        </div>
      )}

      {selectedGender === 'female' && (
        <div>
          <h2>Question for Female</h2>
          <p>What is your favorite book?</p>
        </div>
      )}

      {selectedGender === 'others' && (
        <div>
          <h2>Question for Others</h2>
          <p>What is your favorite hobby?</p>
        </div>
      )}
    </div>
  );
};

export default App;

