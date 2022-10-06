import '../styles/App.css';
import Input from '../components/Input';
import TodoForm from '../components/TodoForm';
import Navbar from '../components/Navbar';


function Home() {
  document.title = "MyTodo | Home"

  return (
      <div className="App">
          <Navbar/>
          <Input />
          <TodoForm />
      </div>
  );
}

export default Home;
