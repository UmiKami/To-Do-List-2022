import '../styles/App.css';
import Input from '../components/Input';
import TodoForm from '../components/TodoForm';


function Home() {
  document.title = "MyTodo | Home"
  
  return (
      <div className="App container">
          <Input />
          <TodoForm />
      </div>
  );
}

export default Home;
