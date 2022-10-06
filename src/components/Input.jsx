import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { todoActions } from '../store/todo';

const Input = () => {
    const [inputText, setInputText] = useState("");
    const dispatch = useDispatch();

    const handleChange = (e) => setInputText(e.target.value)

    const handleKeyPress = (event) => {
        if (event.code === "Enter") {
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
      <input
          type="text"
          onKeyDown={(e) => handleKeyPress(e)}
          onChange={(e) => handleChange(e)}
          value={inputText}
      />
  );
}

export default Input