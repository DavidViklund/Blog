// Denna fil definierar en anpassad React-hook som hanterar inmatningsfältens tillstånd och logik.
// Hooken tillhandahåller värdet för inmatningen, en onChange-hanterare och en funktion för att återställa inmatningen.
import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return { value, onChange, reset };
};

export default useInput;
