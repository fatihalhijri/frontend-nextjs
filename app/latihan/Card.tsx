import { Dispatch, SetStateAction } from "react";
import Button from "../component/button";


interface IntiCard{
    bulan:string;
    tanggal:number;
    setTanggal:Dispatch<SetStateAction<any>>;
    setBulan:Dispatch<SetStateAction<any>>;
}

const Card:React.FC<IntiCard> = ({bulan,tanggal,setTanggal,setBulan}) =>{
    return(
        <div className="px-20">
        <section className="w-52 shadow-lg h-72 rounded-xl ">
            <div className="w-52 h-16 bg-red-500 rounded-tl-xl rounded-tr-xl flex justify-center items-center font-normal text-lg text-white">{bulan}</div>
            <div className="flex justify-center items-center flex-col py-6">
            <h1 className="font-normal text-9xl">{tanggal}</h1>
            <Button title="clear" variant="outline" colorSchema="red" onClick={() =>{
                setTanggal(0)
                setBulan('Agustus')
            }}/>
            </div>
        </section>
        </div>
    )
}

export default Card;
