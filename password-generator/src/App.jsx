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
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg my-20 text-orange-300 bg-gray-300 transition-all duration-700">
         <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
               type="text"
               value={password}
               className="outline-none w-full py-1 px-3"
               placeholder="password"
               readOnly
            />
            <button className="outline-none bg-gray-600 text-white shrink-0 p-3 hover:bg-gray-500">
               Copy
            </button>
         </div>
         <div className="flex text-sm gap-x-5 p-2 bg-slate-700 rounded-b-lg">
            <div className="flex items-center gap-x-1 ">
               <input
                  type="range"
                  min={1}
                  max={50}
                  value={length}
                  className="cursor-pointer"
                  onChange={(e) => {
                     setLength(e.target.value);
                  }}
               />
               <label htmlFor>Length: {length}</label>
               <input
                  type="checkbox"
                  defaultChecked={useNumber}
                  id="number-input"
                  onChange={() => {
                     const value = useNumber ? 0 : 1;
                     setUseNumber(value);
                  }}
               />
               <label htmlFor="number-input">Number: {useNumber}</label>
               <input
                  type="checkbox"
                  defaultChecked={useNumber}
                  id="char-input"
                  onChange={() => {
                     const value = useChar ? 0 : 1;
                     setUseChar(value);
                  }}
               />
               <label htmlFor="char-input">Character: {useChar}</label>
            </div>
         </div>
      </div>
   );
}

export default App;
