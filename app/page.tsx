// "use client";
// import { useEffect, useState } from "react";
// import Button from "./component/button";
// import InputText from "./component/inputText";
// import Label from "./component/Label";
// import Latihan from "./component/Latihan";
// import Note from "./component/Note";



// type Hasil = {
//   mata_pelajaran: "B.indo" | "B.ingris" | "IPS" | "";
//   nilai: 80 | 90 | 100 | "";
// };

// const Home = () => {
//   let [hasil, setHasil] = useState<Hasil[]>([
//     {
//       mata_pelajaran: "B.indo",
//       nilai: 80,
//     },
//   ]);

//   let [data, setData] = useState<Hasil>({
//     mata_pelajaran: "",
//     nilai: "",
//   });

//   let [simpan ,setSimpan] = useState(true);

//   useEffect(() => {
//     if (data.mata_pelajaran != "" || data.nilai != "" ) {
//       setSimpan(false);
//     }
//   })

//   return (
//     <main className="space-y-5 m-2">

//       {hasil.map((x, index) => (
//         <section
//           key={index}
//           className="bg-white w-auto mt-10 flex gap-2 shadow-2xl backdrop-blur-xl flex-col p-5 rounded-xl"
//         >
//           <h1>mata_pelajaran: {x.mata_pelajaran}</h1>
//           <h1>Nilai: {x.nilai}</h1>

//           <Button
//           title="delete"
//           colorSchema="red"
//           variant="solid"
//           isDisabled={hasil.length <= 1}
//           onClick={() => {
//             setHasil((prevnilai) => {
//               prevnilai.pop();
//               return[...prevnilai]
//             })
//           }}
//           />

//         </section>
//       ))}
//       <div className="">
//       <Button
//         title="IPS"
//         variant="solid"
//         colorSchema="green"
//         isDisabled={data.mata_pelajaran === "IPS"}
//         onClick={() => {
//           setData((prev) => {
//             return {
//               ...prev,
//               mata_pelajaran: "IPS"
//             };
//           });
//         }}
//       />
//       <Button
//         title="B.ingris "
//         variant="solid"
//         colorSchema="blue"
//         isDisabled={data.mata_pelajaran === "B.ingris"}
//         onClick={() => {
//           setData((prev) => {
//             return {
//               ...prev,
//               mata_pelajaran: "B.ingris"
//             };
//           });
//         }}
//       />

//       <Button
//         title="B.indo"
//         variant="solid"
//         colorSchema="red"
//         isDisabled={data.mata_pelajaran === "B.indo"}
//         onClick={() => {
//           setData((prev) => {
//             return {
//               ...prev,
//               mata_pelajaran: "B.indo"
//             };
//           });
//         }}
//       />

//       </div>

//       <div className="">
//       <Button
//         title="80"
//         variant="outline"
//         colorSchema="green"
//         isDisabled={data.nilai === 80}
//         onClick={() => {
//           setData((prev) => {
//             return {
//               ...prev,
//               nilai: 80
//             };
//           });
//         }}
//       />
//       <Button
//         title="90 "
//         variant="outline"
//         colorSchema="blue"
//         isDisabled={data.nilai === 90}
//         onClick={() => {
//           setData((prev) => {
//             return {
//               ...prev,
//               nilai: 90
//             };
//           });
//         }}
//       />

//       <Button
//         title="100"
//         variant="outline"
//         colorSchema="red"
//         isDisabled={data.nilai === 100}
//         onClick={() => {
//           setData((prev) => {
//             return {
//               ...prev,
//               nilai: 100
//             };
//           });
//         }}
//       />
//       </div>

//       <Button
//         title="simpan"
//         variant="outline"
//         colorSchema="red"
//         isDisabled={data.mata_pelajaran === "" || data.nilai === ""}
//         onClick={() => {
//           setHasil((prevHasil) => {
//             return [
//               ...prevHasil,
//               {
//                 mata_pelajaran:data.mata_pelajaran,
//                 nilai:data.nilai
//               }
//             ]
//           });

//           setData((prevBackup)=> {
//             return {
//               mata_pelajaran: "",
//               nilai:"",
//             }
//           });
//           setSimpan(true)

//         }}
//       />
//     </main>
//   );
// };

// export default Home;

// keduaa_____________-------_______

// "use client";
// import { useState } from "react";
// import Tambah from "./component/tambah";
// import Kurang from "./component/kurang";

// const App = () => {
//   let [count, setCount] = useState(0);
//   return (
//     <>
//       <h1 className="text-lg">{count}</h1>
//       <section>
//         <Tambah count={count} setCount={setCount} />
//         <Kurang count={count} setCount={setCount} />
//       </section>
//     </>
//   );
// };

// export default App;



// Ketigaaaaa_____-____----____---(soal State latihan)
"use client"; // gunakan use client karena ada onChange pda komponen
import { useState } from "react";
import Card from "./latihan/Card";
import Button from "./component/button";
import InputText from "./component/inputText";

export type Identitas = {
  nama: string;
  sekolah: string;
  umur: number | null;
};

export type Hasil = {
  mata_pelajaran: string;
  nilai: number | null;
};

const Home = () => {
  let [tanggal, setTanggal] = useState(0);
  let [bulan, setBulan] = useState("Agustus");

  return (
    <main className="space-y-5 px-5">
      <h1>Latihan</h1>
      <Card
        bulan={bulan}
        tanggal={tanggal}
        setTanggal={setTanggal}
        setBulan={setBulan}
        
      />
      
      <div className="flex pl-14">
      <Button
        onClick={() => {
          setTanggal((c) => c - 1);
        }}
        isDisabled={tanggal < 1}
        colorSchema="red"
        title="kurang"
        variant="solid"
      />
      <Button
        onClick={() => {
          setTanggal((c) => c + 1);
        }}
        colorSchema="blue"
        title="tambah"
        variant="solid"
      />
      </div>

      <InputText
        id="bulan"
        name={"bulan"}
        value={bulan}
        onChange={(e) => {
          setBulan(e.target.value);
        }}
      />
    </main>
  );
};

export default Home;
