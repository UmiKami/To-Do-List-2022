import { useState } from "react";
import { useDispatch } from "react-redux";
import { todoActions } from "../store/todo";
import "../styles/TodoTask.css";

const TodoTask = ({ task, targetIndex }) => {
    const { label, done } = task;
    const [newText, setNewText] = useState();

    // console.log("Task: ", task);
    // console.log("Task index: ", targetIndex);

    const dispatch = useDispatch();
    const removeTask = () => {
        console.log("Click");
        dispatch(todoActions.deleteTask(targetIndex));
    };

    const check = (e) => {
        const isChecked = e.target.checked;
        console.log("Checked? ", isChecked);
        isChecked
            ? dispatch(
                  todoActions.checkTask({
                      checked: isChecked,
                      targetIndex: targetIndex,
                  })
              )
            : dispatch(
                  todoActions.checkTask({
                      checked: isChecked,
                      targetIndex: targetIndex,
                  })
              );
    };

    const handleEdit = (e) => {
        if (e.code === "Enter" || e.type === "blur") {
            const onlyWhiteSpaces = !newText
                ? true
                : !newText.replace(/\s/g, "").length;

            !onlyWhiteSpaces &&
                dispatch(
                    todoActions.editTask({
                        newLabel: newText,
                        targetIndex: targetIndex,
                    })
                );
        }
    };

    return (
        <div
            className={`alert alert-${
                done ? "success" : "primary"
            } d-flex justify-content-between`}
            role="alert"
        >
            <span className="taskLabelWrapper">
                <input
                    type={"text"}
                    onChange={(e) => setNewText(e.target.value)}
                    className="taskLabel text-primary"
                    defaultValue={label}
                    onKeyDown={handleEdit}
                    onBlur={handleEdit}
                />
            </span>
            <div>
                <input
                    type="checkbox"
                    name="complete"
                    id="complete-check"
                    onChange={check}
                    checked={done}
                />
                <button
                    type="button"
                    className="btn-close"
                    onClick={() => removeTask()}
                ></button>
            </div>
        </div>
    );
};

export default TodoTask;
