import { useState, useCallback, useEffect, useRef } from "react";

function App() {
   const [length, setLength] = useState(8);
   const [useNumber, setUseNumber] = useState(0);
   const [useChar, setUseChar] = useState(0);
   const [password, setPassword] = useState("");

   // using ref hooks
   const passwordRef = useRef(null);

   const generatePassword = useCallback(() => {
      /* Memoization: When you create a function inside a functional component, it gets recreated every time the component re-renders. 
      This can lead to unnecessary re-renders of child components that rely on those functions as props, even if the function itself hasn't changed.
  
      **Usage of useCallback()``**: useCallback()` memoizes a function by returning a memoized version of the function that only changes if one of the dependencies has changed. 
      It takes two arguments: the callback function you want to memoize and an array of dependencies.
  
      Dependencies: The second argument (array of dependencies) specifies when the memoized function should be recalculated. If any of the dependencies change between renders, 
      the memoized function will be re-created. 
      If the dependencies remain the same, the same memoized function will be returned, which helps in optimizing performance. */

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
         pass += str[charIndex];
      }
      setPassword(pass);
   }, [length, useNumber, useChar, setPassword]);

   const pasteToClipBoard = useCallback(() => {
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(password);
   }, [password]);

   useEffect(() => {
      generatePassword();
   }, [length, useNumber, useChar, generatePassword]);

   return (
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg my-20 text-orange-300 bg-gray-300 transition-all duration-700">
         <div className="flex shadow rounded-t-lg overflow-hidden mb-4">
            <input
               type="text"
               value={password}
               className="outline-none bg-slate-700 w-full py-1 px-3"
               placeholder="password"
               readOnly
               ref={passwordRef}
            />
            <button
               className="outline-none bg-gray-600 text-white shrink-0 p-3 hover:bg-gray-500"
               onClick={pasteToClipBoard}
            >
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
