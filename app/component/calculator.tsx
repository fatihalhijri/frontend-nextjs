import React from 'react'

const Calculator = () => {


  return (
    <div className='flex justify-center  items-center'>


        <div className="w-1/2  h-[700px] rounded-2xl bg-gray-200">
            <div className="flex flex-col pt-5 pb-5 pl-14 pr-14">
                <h1 className="font-medium text-center text-xl">Penilaian Tengah Semester </h1>
                <h1 className="font-medium text-center text-xl">Frontend developer </h1>
                <div className="justify-center items-center flex flex-col ">
                    
                    <div className="h-14 rounded-lg w-[570px] bg-white"></div>
                    <div className=" grid  grid-cols-4 gap-5 p-5">
                        <div className="w-32 h-20  bg-slate-400 text-center items-center flex justify-center rounded-sm">7</div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Calculator