import { useState } from "react";
import { useDispatch } from "react-redux";
import { todoActions } from "../store/todo";
import "../styles/TodoTask.css";

const TodoTask = ({ task, targetIndex }) => {
    const { label, done } = task;
    const [newText, setNewText] = useState();

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
            const isNewTextEmpty = !newText;

            isNewTextEmpty && setNewText(label)

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

        e.code === "Enter" && e.preventDefault();
    };

    return (
        <div
            className={`alert alert-${
                done ? "success" : "primary"
            } d-flex justify-content-between mainTask`}
            role="alert"
        >
            <span className="taskLabelWrapper">
                <textarea
                    type={"text"}
                    onChange={(e) => setNewText(e.target.value)}
                    className="taskLabel text-primary"
                    defaultValue={label}
                    value={newText}
                    onKeyDown={handleEdit}
                    onBlur={handleEdit}
                    maxLength="200"
                    rows={1}
                />
            </span>
            <div className="taskActionGroup">
                <label className="checkmarkContainer">
                    <input
                        type="checkbox"
                        name="complete"
                        id="complete-check"
                        onChange={check}
                        checked={done}
                    />
                    <span className="checkmark"></span>
                </label>
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
