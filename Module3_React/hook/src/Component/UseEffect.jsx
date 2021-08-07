import React, { useState, useEffect } from "react";

const UseEffect = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  let handleAddTask = () => {
    let newTaskList = [...taskList, { id: Date.now(), task: task }];
    setTaskList(newTaskList);
    setTask("");
  };

  /********************************* NOTE ********************************/
  //1) Everytime At the start useEffect will be executed
  //2) If some condition is passed then useEffect will be executed on that given condition
  //3) If no conditon is passed then it will be executed everytime any change is made
  //4) If an empty condition is passed Eg :- "[]" then useEffect will only be executed once after render

  useEffect(() => {
    console.log("Will be executed after every render");
  }); // no condition passed

  useEffect(() => {
    console.log("This will be executed only once after first render");
  }, []); // empty condition passed

  useEffect(() => {
    console.log("This will be executed only after tasklist is updated")

    return function(){
      console.log("This is a cleanup function"); // it executes when the next useEffect executes (before the body of useEffect runs)
    }
  }, [taskList]); // tasklist is passed as the condition of invokation

  return (
    <div>
      <div className="task-input">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask}>addTask</button>
      </div>

      <div className="task-list">
        {taskList.map((taskObj) => {
          return (
            <div className="task" key={taskObj.id}>
              {taskObj.task}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UseEffect;
