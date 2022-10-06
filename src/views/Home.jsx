import '../styles/App.css';
import Input from '../components/Input';
import TodoForm from '../components/TodoForm';


function Home() {
  document.title = "MyTodo | Home"

  return (
      <div className="App">
          <h1>MyTodo</h1>
          <Input />
          <TodoForm />
      </div>
  );
}

export default Home;
