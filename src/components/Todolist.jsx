import {useEffect, useState} from "react";
import { v4 as uuidv4} from "uuid";
import TodoTask from "./TodoTask";

const Todolist = () => {
    const [tasks, setTasks] = useState([{label: "Sample Task", done: false}]);
    const [inputText, setInputText] = useState("");

    const handleKeyPress = (event) => {
        if(event.code === "Enter"){
            // if the expression is false, that means the string has a length of 0 after stripping white spaces
            const onlyWhiteSpaces = !inputText.replace(/\s/g, "").length;

            !onlyWhiteSpaces && setTasks([...tasks, { label: inputText, done: false }]);
            setInputText("")
        }
    }

    return (
        <div className="container">
            <input type="text" onKeyDown={handleKeyPress} onChange={(e)=>setInputText(e.target.value)} value={inputText}/>
            {
                tasks.map((task, index) => {
                    return <TodoTask key={uuidv4()} text={task.label} done={task.done} id={index} setTasks={setTasks}/>
                })
            }
        </div>
    );
};

export default Todolist;
