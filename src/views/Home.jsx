import '../styles/App.css';
import {useEffect, useState} from "react"
import axios from "axios"
import Todolist from '../components/Todolist';


function Home() {
  document.title = "MyTodo | Home"

  return (
    <div className="App">
      <h1>MyTodo</h1>
      <Todolist/>
    </div>
  );
}

export default Home;
