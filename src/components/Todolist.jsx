import {useEffect, useState} from "react";
import { v4 as uuidv4} from "uuid";

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

    console.log(inputText);

    return (
        <div className="container">
            <input type="text" onKeyDown={handleKeyPress} onChange={(e)=>setInputText(e.target.value)} value={inputText}/>
            {
                tasks.map(task => {
                    return <h5 key={uuidv4()}>{task.label}</h5>
                })
            }
        </div>
    );
};

export default Todolist;
