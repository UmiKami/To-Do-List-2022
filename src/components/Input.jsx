import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "../store/todo";

const Input = () => {
    const [inputText, setInputText] = useState("");
    const dispatch = useDispatch();

    const tasks = useSelector(state => state.todo.taskList)

    const handleChange = (e) => setInputText(e.target.value);

    const handleKeyPress = (e) => {
        if (e.code === "Enter") {
            // if the expression is false, that means the string has a length of 0 after stripping white spaces
            const onlyWhiteSpaces = !inputText.replace(/\s/g, "").length;

            !onlyWhiteSpaces &&
                dispatch(
                    todoActions.addTask({ label: inputText, done: false })
                );
            setInputText("");
        }
    };

    return (
        <section className="my-5">
            <input
                type="text"
                aria-label="Write text for new task"
                className="form-control form-control-lg ps-3"
                onKeyDown={(e) => handleKeyPress(e)}
                onChange={(e) => handleChange(e)}
                placeholder="Add a new task"
                value={inputText}
            />
            <p className="text-light mt-2">You have {tasks.length} {tasks.length === 1 ? "item" : "items"} left</p>
        </section>
    );
};

export default Input;
