import { LayoutDashboard } from 'lucide-react'
import React from 'react'

function DashBoard() {
  return (
    <div className='w-full bg-white p-4'>
        <div className="p-3 text-xl md:text-2xl font-semibold flex rounded-xl bg-indigo-50 items-center">
            <LayoutDashboard className='size-5 mr-2'/>
            Dashboard
        </div>
        <div className="w-full p-3 bg-indigo-50 rounded-xl mt-2">
            
        </div>
    </div>
  )
}

export default DashBoard