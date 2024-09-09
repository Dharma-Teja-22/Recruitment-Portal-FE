import { useState } from "react";

const Task2 = () => {
  const [checkedA, setCheckedA] = useState([false, false, false, false]);
  const [checkedB, setCheckedB] = useState([false, false, false, false]);

  const allChecked = (group) => group.every((item) => item);

  const handleGroupChange = (index, group, setGroup) => {
    const newGroup = [...group];
    newGroup[index] = !newGroup[index];
    setGroup(newGroup);
  };

  const handleSuperToggle = (group, setGroup) => {
    const allTrue = allChecked(group);
    setGroup(group.map(() => !allTrue));
  };
 
  const checkedSuperA = allChecked(checkedA);
  const checkedSuperB = allChecked(checkedB);
  const checkedSuper = checkedSuperA && checkedSuperB;

  return (
    <div className="flex flex-col  mt-10 text-balck gap-6">
      <div>
        <label>Super
        <input
          type="radio"
          value="one"
          onClick={() => {
            handleSuperToggle([...checkedA, ...checkedB], (group) => {
              setCheckedA(group.slice(0, 4));
              setCheckedB(group.slice(4, 8));
            });
          }}
          checked={checkedSuper}
        />
        </label>
      </div>

     
        <label className="flex gap-2"> Super A       
        <input
          type="radio"
          value="one"
          onClick={() => handleSuperToggle(checkedA, setCheckedA)}
          checked={checkedSuperA}
        />
        </label>

     
      <div className="flex flex-col gap-2">
        {checkedA.map((checked, i) => (
          <label key={`A${i + 1}`} className="mr-4">
            <input
              type="radio"
              value={`A${i + 1}`}
              onClick={() => handleGroupChange(i, checkedA, setCheckedA)}
              checked={checked}
            />
            A{i + 1}
          </label>
        ))}
      </div>

     
        <label className="flex gap-2">Super B
        <input
          type="radio"
          value="one"
          onClick={() => handleSuperToggle(checkedB, setCheckedB)}
          checked={checkedSuperB}
        /></label>

      <div className="flex flex-col gap-2 ml-16">
        {checkedB.map((checked, i) => (
          <label key={`B${i + 1}`} className="mr-4">
            <input
              type="radio"
              value={`B${i + 1}`}
              onClick={() => handleGroupChange(i, checkedB, setCheckedB)}
              checked={checked}
            />
            B{i + 1}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Task2;