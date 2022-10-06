import { memo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import TodoTask from "./TodoTask";


const TodoForm = () => {
    // shallowEqual prevents unnecessary re-renders which can lead to an infinite loop
    // it compares the current state with the previous one, if they are the same, it does not re-render the component
    const tasks = useSelector((state) => state.todo.taskList, shallowEqual);

     const renderTasks = tasks.map((task, index) => {
         return (
             <TodoTask
                 key={uuidv4()}
                 task={task}
                 targetIndex={index}
             />
         );
     });

     return <div className="container">{renderTasks}</div>;
};

export default memo(TodoForm);
