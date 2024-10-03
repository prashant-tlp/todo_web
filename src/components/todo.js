import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

const Todo = () => {
  const [userInput, setInput] = useState("");
  const [data, setData] = useState([]);

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  function submitInput(e) {
    e.preventDefault();
    setData([...data, userInput]);
    console.log(...data);
    setInput("");
    
  }
  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };


  return (
    <div className="h-screen w-screen p-4 bg-orange-400 ">
      <div className="bg-emerald-200  mx-auto md:w-5/6  p-5">
        <h1 className=" font-bold text-center text- text-lg md:text-4xl mb-2">Add Your Tasks</h1>
        <form className="flex justify-center flex-wrap">
          <input
            className=" border-orange-400 border-2 text-2xl m-2 bg-violet-200 md:w-2/4 "
            type="text"
            value={userInput}
            onChange={handleInput}
          ></input>
          <button
            className="m-2 text-2xl border-orange-400 border-2 font-extrabold p-4"
            type="button"
            onClick={submitInput}
          >
            Add Task
          </button>
        </form>
        {/* pad */}
        <div>
          {data.map((val,ind)=>(<ul className="flex justify-center text-xl border-b-2">
            <li className="md:w-7 text-black  p-2 font-bold">{ind+1}</li>
            <li className="w-5/6 p-2">{val}</li>
            <li className=" text-red-800 p-2 ">
              <button onClick={handleDelete}><MdDeleteForever/></button>
            </li>
          </ul> ))}
          <button className="border-4 text-white p-2 font-semibold floa bg-black border-white">Clear All</button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
