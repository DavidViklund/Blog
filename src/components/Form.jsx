import useInput from "../hooks/useInput";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Form = () => {
  const { setUserName } = useContext(UserContext);
  const nameInput = useInput();
  const emailInput = useInput();

  const handleSubmit = (e) => {
    e.preventDefault();

    // we're not doing anything with email for now
    setUserName(nameInput.value);

    nameInput.reset();
    emailInput.reset();
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label>Name</label>
      <input type="text" {...nameInput} />

      <label>Email</label>
      <input type="email" {...emailInput} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;