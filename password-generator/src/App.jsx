import { useState, useCallback } from "react";

function App() {
   const [length, setLength] = useState(8);
   const [useNumber, setUseNumber] = useState(0);
   const [useChar, setUseChar] = useState(0);
   const [password, setPassword] = useState("");

   const generatePassword = useCallback(() => {
      let pass = "";
      let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";

      if (useNumber) {
         str += "1234567890";
      }
      if (useChar) {
         str += "?!@#$%^&*()+=<>~[]{}";
      }

      for (let i = 1; i <= length; i++) {
         let charIndex = Math.floor(Math.random() * str.length + 1);
         pass = str[charIndex];
      }
      setPassword(pass);
   }, [length, useNumber, useChar, setPassword]);

   return (
      <>
         <h1 className="text-4xl text-center text-white">hello</h1>
      </>
   );
}

export default App;
