import clsx from "clsx";


type Variant = 'solid' | 'outline'
type ColorSchema = 'blue' | 'red' | 'green'

interface ButtonProps {
    title : string;
    isDisabled? : boolean;
    variant? : Variant;
    colorSchema: ColorSchema
}

const InterButton: React.FC <ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({title,isDisabled =false, variant,colorSchema, }) =>{
    return(
        <section>
            
        </section>
    )
}

export default InterButton