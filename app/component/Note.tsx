import {ReactNode} from "react";

type status = "warning" | "error" | "success";
interface SectionProps {
    title:string;
    children:ReactNode;
    status:status;
}

const Note: React.FC<SectionProps> = ({title,status,childen}){
    return(
        <section className="border border-red-500 " >
        <div className="border-b border-red-500">
        <h5 className="font-bold text-red-500 "></h5></div>
        <div className="" ></div>
        </section>
    )
}

export default Note