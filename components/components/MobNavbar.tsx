import React from 'react'



const MobNavbar = () => {
  return (
    <div className='lg:hidden fixed bottom-0 w-full bg-white left-[50%] -translate-x-[50%] max-w-[500px] mob_navbar px-8 '>
        <div className="flex justify-between text-[28px] py-2">
            {/* logo */}
            <div className="relative">
                {/* logo */}
                <div className="bg-red-600 rounded-full  absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1 ">0</div>
            </div>
        </div>
        {/* logo */}
        <div className="relative">
            {/* logo */}
            <div className="bg-red-600 rounded-full  absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1 ">0</div>
        </div>
    </div>
  )
}

export default MobNavbar