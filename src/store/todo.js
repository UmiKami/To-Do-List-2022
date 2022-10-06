import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        taskList: []
    },
    reducers: {
        addTask(state, {payload}){
            state.taskList = [...state.taskList, payload]
        },
        deleteTask(state, {payload}){
            let targetIndex = payload

            state.taskList = state.taskList.filter((task, index) => index !== targetIndex)
        },
        checkTask(state, {payload}){
            let isChecked = payload.checked
            let targetIndex = payload.targetIndex

            state.taskList = state.taskList.map((task, index)=>{
                if(index === targetIndex){
                    task.done = isChecked
                }
                return task
            })
        }
    }
})

export const todoActions = todoSlice.actions;
export default todoSlice;