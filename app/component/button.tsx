import clsx from "clsx";
import { type } from "os";


type Variant = 'solid' | 'outline'
type ColorSchema = 'blue' | 'red' | 'green'

interface ButtonProps {
    title : string;
    isDisabled? : boolean;
    variant? : Variant;
    colorSchema: ColorSchema;
}

const Button: React.FC <ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({title,isDisabled =false, variant,colorSchema,...props }) =>{
    return(
        <button {...props} disabled={isDisabled}  className={clsx(`w-32 h-8 rounded border `,
        {   
            "bg-blue-500 text-white " : colorSchema === 'blue' && variant  === "solid",
            "bg-red-500 text-white " : colorSchema === 'red' && variant  === "solid",
            "bg-green-500 text-white" : colorSchema === 'green' && variant === 'solid',
            "border-blue-500 text-blue-500 " : colorSchema === 'blue' && variant  === "outline",
            "border-red-500 text-red-500 " : colorSchema === 'red' && variant === 'outline',
            "text-green-500 border-green-500" : colorSchema === 'green' && variant  === "outline",
            "opacity-50" : isDisabled === true,
        
        },
        
        
        



        )} >
            {title} 
            
        </button>
        
    )
}

export default Button