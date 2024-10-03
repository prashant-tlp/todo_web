import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ServerTodo() {
  const [note, setNote] = useState("");
  const [list, setList] = useState([]);
  const handleInput = (e) => {
    setNote(e.target.value);
  };

  ////////////////post/////////
  const submit = () => {
    axios
      .post("http://localhost:3001/post-data", { note })
      .then((res) => toast(res.data.message,{type:"success"}))
      .then(()=>{setNote("")})
      .then(()=>{
        getDta()
      })
     
  };

  ///////////////get//////////
  const getDta = () => {
    axios
      .get("http://localhost:3001/ftch")
      .then((res) => {
        setList(res.data.result);
      })
  };
  useEffect(() => {
    getDta();
  }, []);

  ///////////delete data//////////
  const handleDelete = (id) => {
    axios.delete("http://localhost:3001/delete/" + id)
    .then((res)=>{toast(res.data.message,{type:"info"})})
    .then(() => {
      getDta();
    });
  };
  const clearData = () => {
    axios.delete("http://localhost:3001/deleteall")
    .then((res)=>{
      toast(res.data.message,{type:'warning'})
    })
    .then(() => {
      getDta();
    });
  };
  return (
    <div className="h-screen w-screen p-4 ">
      <div className="bg-orange-400 rounded-2xl mx-auto md:w-3/6  p-5 shadow-2xl">
        <h1 className=" font-bold text-center text-white text-lg md:text-2xl mb-2">
          ADD YOUR TASKS
        </h1>
        <form className="flex m-2 justify-center flex-wrap">
          <input
            className=" border-black mx-2 border-2 text-lg p-1 sm:h-10 bg-violet-200 md:w-2/4 "
            type="text"
            value={note}
            onChange={handleInput}
          ></input>
          <button
            className=" border-black sm:h-10 bg-amber-400 border-2 p-1 font-semibold "
            type="button"
            onClick={submit}
          >
            Add Task
          </button>
        </form>
        <div className="flex flex-col items-center" >
          <button  onClick={clearData} className="border-2 p-2 font-semibold  bg-amber-300 border-black">
            Clear All
          </button>
        </div>
        <div>
          {list.map((val, ind) => (
            <ul
              className="flex justify-center text-xl border-b-2"
              key={val._id}
            >
              <li className="md:w-7 text-black  p-2 font-bold">{ind + 1}</li>
              <li className="w-5/6 uppercase p-2">{val.note}</li>
              <li className=" text-red-800 p-2 ">
                <button onClick={() => handleDelete(val._id)}>
                  <MdDeleteForever />
                </button>
              </li>
            </ul>
          ))}
        </div>
      </div>
      <ToastContainer/>
    </div>
    
  );
}

export default ServerTodo;
