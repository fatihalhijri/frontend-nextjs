// "use client";
// import React, { useEffect, useState ,useRef} from "react";
// import InputText from "../component/inputText";

// const belajarHook = () => {

//   let [message, setMessage] = useState("tes");
//   let [count, setCount] = useState(0);
//   let [text, setState] = useState(false);

//   useEffect(() => {
//     setCount((c) => c + 1);
//     console.log("use effect berjalan");
//   }, [message, text]);

//   // kurung siku adalah depedencies
//   return (
//     <section>
//       <p className="">
//         siap belajar hook <span className="text-red-500">{count}</span>
//       </p>
//       <div className="text-red-500 font-bold">{message}</div>
//       <InputText
//         value={message}
//         onChange={(e) => {
//           setMessage(e.target.value);
//         }}
//       />

      

//     </section>
//   );
// };

// export default belajarHook;


import Buttoncal from '../component/buttoncal'
import Calculator from '../component/calculator'

import React from 'react'

const pagecalculate = () => {
  


  return (
    <div>

      <Calculator></Calculator>
    </div>
  )
}

export default pagecalculate
