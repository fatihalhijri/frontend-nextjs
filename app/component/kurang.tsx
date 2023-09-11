"use client"
import { Dispatch, SetStateAction } from "react";
import Button from "./button"

interface KurangProps{
    count : number;
    setCount:Dispatch<SetStateAction<any>>;
}


const Kurang:React.FC<KurangProps> = ({count,setCount}) => {
    return (
        <section className="border shadow-lg">
            <Button title="Kurang" colorSchema="red" variant="solid" onClick={() =>{
                setCount((c:number) => c -1);
            }}/>
        </section>
    )
}

export default Kurang;