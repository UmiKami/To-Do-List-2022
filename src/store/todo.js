import { createSlice } from "@reduxjs/toolkit";
import FirebaseFireStoreService from "../FirebaseFirestoreService";

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        taskList: [],
    },
    reducers: {
        addTask(state, { payload }) {
            state.taskList = [...state.taskList, payload];
            
            const addToDb = async() => {
                try{
                    const resp = await FirebaseFireStoreService.createTask("todos", payload)
                    console.log("Database updated");
                }catch(err){
                    console.log("There was an error: ", err.message);
                }
            }


            addToDb()
        },
        deleteTask(state, { payload }) {
            let targetIndex = payload;

            state.taskList = state.taskList.filter(
                (task, index) => index !== targetIndex
            );
        },
        checkTask(state, { payload }) {
            let isChecked = payload.checked;
            let targetIndex = payload.targetIndex;

            state.taskList = state.taskList.map((task, index) => {
                if (index === targetIndex) {
                    task.done = isChecked;
                }
                return task;
            });
        },
        editTask(state, { payload }) {
            const {newLabel, targetIndex} = payload;

            state.taskList = state.taskList.map((task, index) => {
                if (index === targetIndex) {
                    task.label = newLabel
                }
                return task;
            });
        },
    },
});

export const todoActions = todoSlice.actions;
export default todoSlice;
