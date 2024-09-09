import { useEffect, useState } from "react";

const Task2 = () => {
  const [checkedA1, setCheckedA1] = useState(false);
  const [checkedA2, setCheckedA2] = useState(false);
  const [checkedA3, setCheckedA3] = useState(false);
  const [checkedA4, setCheckedA4] = useState(false);
  const [checkedB1, setCheckedB1] = useState(false);
  const [checkedB2, setCheckedB2] = useState(false);
  const [checkedB3, setCheckedB3] = useState(false);
  const [checkedB4, setCheckedB4] = useState(false);

  const [checkedSuperA, setCheckedSuperA] = useState(false);
  const [checkedSuperB, setCheckedSuperB] = useState(false);
  const [checkedSuper, setCheckedSuper] = useState(false);

  const toggleSection = (section: string) => {
    if (section === "SuperA") {
      const newCheckedA = !checkedSuperA;
      setCheckedSuperA(newCheckedA);
      setCheckedA1(newCheckedA);
      setCheckedA2(newCheckedA);
      setCheckedA3(newCheckedA);
      setCheckedA4(newCheckedA);
    } else if (section === "SuperB") {
      const newCheckedB = !checkedSuperB;
      setCheckedSuperB(newCheckedB);
      setCheckedB1(newCheckedB);
      setCheckedB2(newCheckedB);
      setCheckedB3(newCheckedB);
      setCheckedB4(newCheckedB);
    } else if (section === "Super") {
      const newCheckedSuper = !checkedSuper;
      setCheckedSuper(newCheckedSuper);
      setCheckedSuperA(newCheckedSuper);
      setCheckedSuperB(newCheckedSuper);
      setCheckedA1(newCheckedSuper);
      setCheckedA2(newCheckedSuper);
      setCheckedA3(newCheckedSuper);
      setCheckedA4(newCheckedSuper);
      setCheckedB1(newCheckedSuper);
      setCheckedB2(newCheckedSuper);
      setCheckedB3(newCheckedSuper);
      setCheckedB4(newCheckedSuper);
    }
  };

  useEffect(() => {
    const allASelected = checkedA1 && checkedA2 && checkedA3 && checkedA4;
    setCheckedSuperA(allASelected);
  }, [checkedA1, checkedA2, checkedA3, checkedA4]);

  useEffect(() => {
    const allBSelected = checkedB1 && checkedB2 && checkedB3 && checkedB4;
    setCheckedSuperB(allBSelected);
  }, [checkedB1, checkedB2, checkedB3, checkedB4]);

  useEffect(() => {
    setCheckedSuper(checkedSuperA && checkedSuperB);
  }, [checkedSuperA, checkedSuperB]);

  return (
    <div className="flex flex-col gap-10 mt-10 text-black">
      <div>
        <input
          type="radio"
          onClick={() => toggleSection('Super')}
          checked={checkedSuper}
        />
        Super            
      </div>

      <div>
        <input
          type="radio"
          onClick={() => toggleSection('SuperA')}
          checked={checkedSuperA}
        />
        Super A
      </div>

      <div className="flex flex-col gap-2">
        <label>
          <input
            type="radio"
            onClick={() => setCheckedA1(!checkedA1)}
            checked={checkedA1}
          />
          A1
        </label>
        <label>
          <input
            type="radio"
            onClick={() => setCheckedA2(!checkedA2)}
            checked={checkedA2}
          />
          A2
        </label>
        <label>
          <input
            type="radio"
            onClick={() => setCheckedA3(!checkedA3)}
            checked={checkedA3}
          />
          A3
        </label>
        <label>
          <input
            type="radio"
            onClick={() => setCheckedA4(!checkedA4)}
            checked={checkedA4}
          />
          A4
        </label>
      </div>

      <div>
        <input
          type="radio"
          onClick={() => toggleSection('SuperB')}
          checked={checkedSuperB}
        />
        Super B
      </div>

      <div className="flex flex-col gap-2">
        <label>
          <input
            type="radio"
            onClick={() => setCheckedB1(!checkedB1)}
            checked={checkedB1}
          />
          B1
        </label>
        <label>
          <input
            type="radio"
            onClick={() => setCheckedB2(!checkedB2)}
            checked={checkedB2}
          />
          B2
        </label>
        <label>
          <input
            type="radio"
            onClick={() => setCheckedB3(!checkedB3)}
            checked={checkedB3}
          />
          B3
        </label>
        <label>
          <input
            type="radio"
            onClick={() => setCheckedB4(!checkedB4)}
            checked={checkedB4}
          />
          B4
        </label>
      </div>
    </div>
  );
};

export default Task2;
