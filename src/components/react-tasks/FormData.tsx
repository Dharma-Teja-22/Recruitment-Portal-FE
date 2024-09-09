import { useState } from "react";
import { z } from "zod";

function FormData() {
  const [err, setErr] = useState<Partial<Record<keyof formData, string>>>({});
  const currentDate = new Date();
  const [timeZone, setTimeZone] = useState("Asia/Kolkata"); // Default to India time zone

  const timeZones = [
    { value: "Asia/Kolkata", label: "India Standard Time (IST)" },
    { value: "America/New_York", label: "New York (EST)" },
    { value: "Europe/London", label: "London (GMT)" },
    { value: "Asia/Tokyo", label: "Tokyo (JST)" },
    { value: "Australia/Sydney", label: "Sydney (AEDT)" },
  ];

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Must be at least 8 characters long" })
      .refine(
        (val) =>
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            val
          ),
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
        }
      ),
    DOB: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid Date" })
      .refine((val) => new Date(val) <= currentDate, {
        message: "Date cannot be in the future",
      }),
    age: z.number().min(18, { message: "Age must be at least 18" }),
    color: z.string(),
    range: z.number().min(2, { message: "Rate your Technical skills" }),
    dateTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid datetime string! Must be UTC.",
    }),
    gen: z.string().min(1, "Gender is required"),
    ans: z.string().min(10, {message:"answer should contains atleast 10 characters"}),
    // file: z.any().refine((file) => file?.size > 0, "File is required"),
    // file: z.string().length(5,{message:"Choose file"}),
    url: z.string().url({ message: "Invalid URL" }),
    time: z.string(),
    interest: z.string().array(),
    food:  z.string().min(10, {message:"Food tag should contains atleast 10 characters "}) 
  });

  type formDataSchema = z.infer<typeof formSchema>;

  const [formData, setFormData] = useState<formDataSchema>({
    name: "",
    email: "",
    password: "",
    DOB: "",
    age: 0,
    color: "#000000",
    range: 0,
    dateTime: "",
    gen: "",
    // file: "",
    url: "",
    time: "",
    ans:"",
    interest:[],
    food:""
  });

  const handleClear = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      DOB: "",
      age: 0,
      color: "",
      range: 0,
      dateTime: "",
      gen: "",
      // file: "",
      url: "",
      time: "",
      ans:"",interest:[], food:""
    });
    setErr({});
  };

  const getConvertedDateTime = () => {
    if (!formData.dateTime) return "";

    const date = new Date(formData.dateTime);
    const dateStr = date.toLocaleString("en-US", { timeZone });
    const ndate = new Date(dateStr);
    const year = ndate.getFullYear();
    const month = String(ndate.getMonth() + 1).padStart(2, "0");
    const day = String(ndate.getDate()).padStart(2, "0");
    const hours = String(ndate.getHours()).padStart(2, "0");
    const minutes = String(ndate.getMinutes()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    return formattedDate;
  };

  const handleTimeZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeZone(e.target.value);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement 
    >
  ) => {
    const { name, value, type, checked } = e.target;
    if(type === "checkbox"){
      setFormData((prevData : formDataSchema) => {
        const newArray : string[] = checked ? [...(prevData[name as keyof formDataSchema] as string[]),value] : (prevData[name as keyof formDataSchema]as string[]).filter(item => item != value)
        return {
          ...prevData,
          [name]:newArray
        };
      })
    }
    else{
    setFormData({
      ...formData,
      [name]: 
        // type === "checkbox"
        //   ? checked
        type === "range" || type === "number"
          ? +value
          : value,
    });}
  };

  function displayData(event: React.FormEvent): void {
    event.preventDefault();
    const validation = formSchema.safeParse(formData);

    if (validation.success) {
      console.log("Form Data Submitted:", formData);
      setErr({});
      setFormData({
        name: "",
        email: "",
        password: "",
        DOB: "",
        age: 0,
        color: "",
        range: 0,
        dateTime: "",
        gen: "",
        // file: "",
        url: "",
        time: "",
        ans:"",interest:[], food:""
      });
    } else {
      const errors: Partial<Record<keyof formDataSchema, string>> = {};
      validation.error.errors.forEach((error) => {
        const key = error.path[0] as keyof formDataSchema;
        const msg = error.message;
        errors[key] = msg;
      });
      setErr(errors);
      console.log(err)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Form Submission
      </h1>
      <form className="space-y-6" onSubmit={displayData}>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Enter Your Full Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {err.name && <p className="text-red-600 text-sm mt-1">{err.name}</p>}
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {err.email && (
            <p className="text-red-600 text-sm mt-1">{err.email}</p>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {err.password && (
            <p className="text-red-600 text-sm mt-1">{err.password}</p>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
            className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {err.DOB && <p className="text-red-600 text-sm mt-1">{err.DOB}</p>}
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {err.age && <p className="text-red-600 text-sm mt-1">{err.age}</p>}
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Favourite Colour
          </label>
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="p-1 border border-gray-400 rounded-md focus:outline-none"
          />
          {err.color && (
            <p className="text-red-600 text-sm mt-1">{err.color}</p>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Tech Skills (E.g: Node.js, React)
          </label>
          <input
            type="range"
            name="range"
            className="w-full bg-blue-700 rounded-md"
            value={formData.range}
            onChange={handleChange}
          />
          <p className="text-lg font-medium text-gray-700">
            Range Value: {formData.range}%
          </p>{" "}
         
          {err.range && (
            <p className="text-red-600 text-sm mt-1">{err.range}</p>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Preferred Working Time
          </label>
          <div className="flex space-x-4">
            <input
              type="time"
              className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="time"
              className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {err.time && <p className="text-red-600 text-sm mt-1">{err.time}</p>}
        </div>
        {/* <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Application Date along with Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
            className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {err.dateTime && <p className="text-red-600 text-sm mt-1">{err.dateTime}</p>}
        </div> */}
        <div className="flex gap-36 ">
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-700">
              Application Date along with Time
            </label>
            <input
              type="datetime-local"
              name="dateTime"
              value={getConvertedDateTime()}
              onChange={handleChange}
              className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {err.dateTime && (
              <p className="text-red-600 text-sm mt-1">{err.dateTime}</p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-700">
              Select Time Zone
            </label>
            <select
              name="timeZone"
              value={timeZone}
              onChange={handleTimeZoneChange}
              className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {timeZones.map((zone) => (
                <option key={zone.value} value={zone.value}>
                  {zone.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* <div className="flex  space-y-1 gap-6">
          <p className="text-lg font-medium text-gray-700">
            Converted Date and Time:
          </p>
          <p>{getConvertedDateTime()}</p>
        </div> */}

        <div className="flex flex-col space-y-1 ">
          <span className="text-lg font-medium text-gray-700">Gender</span>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gen"
                className="mr-2"
                value="Male"
                checked={formData.gen === "Male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gen"
                className="mr-2"
                value="Female"
                checked={formData.gen === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gen"
                className="mr-2"
                value="Other"
                checked={formData.gen === "Other"}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
          {formData.gen == "Male" && (
            <div className="flex flex-col justify-center place-items-center gap-2">
              <h2 className="font-semibold text-green-800">
                Question for Male
              </h2>
              <p>1. What is your favorite Technologies?</p>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="coding"
                  name="interest"
                  value="Nodejs"
                />
                <label htmlFor="Nodejs">Node.js</label>
                <input
                  type="checkbox"
                  id="coding"
                  name="interest"
                  value="React"
                />
                <label htmlFor="coding">React</label>
                <input
                  type="checkbox"
                  id="coding"
                  name="interest"
                  value="Python"
                />
                <label htmlFor="Python">Python</label>

                {err.interest && formData.gen == "Male" && <p className="text-red-600 text-sm mt-1">{err.interest}</p>}

              </div>
              <p>2. If You Could Travel Anywhere, Where Would You Go?</p>
              <input
                type="text"
                name="ans"
                value={formData.ans}
                onChange={handleChange}
                className="border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {err.ans &&  formData.gen == "Male" && <p className="text-red-600 text-sm mt-1">{err.ans}</p>}

            </div>
          )}
          {formData.gen == "Female" && (
            <div className="flex flex-col justify-center place-items-center gap-2">
              <h2 className="font-semibold text-green-800">
                Question for Female
              </h2>
              <p className="text-black">
                1. What is your favorite Technologies?
              </p>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="coding"
                  name="interest"
                  value="Node.js"
                />
                <label htmlFor="Node.js">Node.js</label>
                <input
                  type="checkbox"
                  id="coding"
                  name="interest"
                  value="React"
                />
                <label htmlFor="coding">React</label>
                <input
                  type="checkbox"
                  id="coding"
                  name="interest"
                  value="Python"
                />
                <label htmlFor="Python">Python</label>
                {err.interest &&   formData.gen=="Female"  && <p className="text-red-600 text-sm mt-1">{err.interest}</p>}

              </div>
              <p>2. What is your favorite book? Give me the reason for that</p>
              <input
                type="text"
                name="ans"
                value={formData.ans}
                onChange={handleChange}
                className="border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {err.ans &&  formData.gen == "Female" && <p className="text-red-600 text-sm mt-1">{err.ans}</p>}
            </div>

          )}
          {formData.gen == "Other" && (
            <div className="flex flex-col justify-center place-items-center gap-2">
              <h2 className="font-semibold text-green-800">
                Question for Others
              </h2>
              <p className="text-black">1. What is your favorite Food?</p>
              <input
                type="text"
                name="food"
                value={formData.food}
                onChange={handleChange}
                className="border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {err.food && formData.gen=="Other"  &&  <p className="text-red-600 text-sm mt-1">{err.food}</p>}

              <p>2. What is your favorite book? Give me the reason for that</p>
              <input
                type="text"
                name="ans"
                value={formData.ans}
                onChange={handleChange}
                className="border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {err.ans && formData.gen=="Other"  &&  <p className="text-red-600 text-sm mt-1">{err.ans}</p>}

            </div>
          )}
          {err.gen && <p className="text-red-600 text-sm mt-1">{err.gen}</p>}
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Upload Resume
          </label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* {err.file && <p className="text-red-600 text-sm mt-1">{err.file}</p>} */}
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            LinkedIn or any other relevant profile
          </label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {err.url && <p className="text-red-600 text-sm mt-1">{err.url}</p>}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormData;
