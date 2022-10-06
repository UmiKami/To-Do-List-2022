import { useDispatch } from "react-redux";
import { todoActions } from "../store/todo";

const TodoTask = ({ task, targetIndex }) => {
    const {label, done} = task;

    // console.log("Task: ", task);
    // console.log("Task index: ", targetIndex);

    const dispatch = useDispatch()
    const removeTask = () => {
        console.log("Click");
        dispatch(todoActions.deleteTask(targetIndex))
    }

    const check = (e) => {
        const isChecked = e.target.checked
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
    }

    return (
        <div
            className={`alert alert-${done ? "success" : "primary"} d-flex justify-content-between`}
            role="alert"
        >
            {label}
            <div>
                <input type="checkbox" name="complete" id="complete-check" onChange={check} checked={done}/>
                <button type="button" className="btn-close" onClick={()=>removeTask()}></button>
            </div>
        </div>
    );
};

export default TodoTask;
