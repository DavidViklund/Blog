import useInput from "../hooks/useInput";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Form = () => {
  const { setUserName } = useContext(AuthContext);
  const nameInput = useInput();
  const emailInput = useInput();

  const handleSubmit = (e) => {
    e.preventDefault();

    // We're not doing anything with email for now
    setUserName(nameInput.value);

    nameInput.reset();
    emailInput.reset();
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label>Name</label>
      <input type="text" {...nameInput.bind} />

      <label>Email</label>
      <input type="email" {...emailInput.bind} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
