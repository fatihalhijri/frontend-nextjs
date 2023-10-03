import React, { useEffect, useState } from 'react'

const useDebounce = (keyword:string,delay:number) => {

    let [debouncedValue, setDebouncedValue] = useState("");
    
    useEffect(() => {
      const handler = setTimeout(()=>{
        setDebouncedValue(keyword);
      },delay)
    
      
    },[keyword]);
    
  
    return {debouncedValue}
}

export default useDebounce