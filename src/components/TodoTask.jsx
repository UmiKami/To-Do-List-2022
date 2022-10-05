import React from "react";

const TodoTask = ({ text, done, id, setTasks }) => {

    const removeTask = () => {
        setTasks(tasks => tasks.filter((task, taskIndex) => taskIndex !== id))
    }

    return (
        <div
            className="alert alert-primary d-flex justify-content-between"
            role="alert"
        >
            {text}
            <button type="button" className="btn-close" onClick={removeTask}></button>
        </div>
    );
};

export default TodoTask;
