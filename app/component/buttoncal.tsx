import clsx from 'clsx';
import React from 'react'

type Variant = 'solid'|'outline'
type VariantCol = 'gray'|'red'|'blue'|'yellow'

interface Buttoncolor{
    title:string;
    variant? : Variant;
    colorSchema: VariantCol;
    isDisabled? : boolean;
}

const Buttoncal:React.FC <Buttoncolor & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({title,variant,colorSchema,isDisabled=false,...props}) => {

  return (
    <button {...props} disabled={isDisabled} className={clsx(`w-[150px] h-20 text-lg rounded-md`,
    {
        "bg-gray-400 text-white" : colorSchema === 'gray' ,
        "bg-red-500 text-white" : colorSchema === 'red' ,
        "bg-blue-500 text-white" : colorSchema === 'blue' ,
        "bg-yellow-500 text-white" : colorSchema === 'yellow' ,
        'opacity-50':isDisabled === true,
    },
    )}>{title}</button>
    
  )
}

export default Buttoncal