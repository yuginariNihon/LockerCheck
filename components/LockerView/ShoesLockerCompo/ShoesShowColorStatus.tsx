import React from 'react'
import ColorStatus from '../ColorStatus'

const ShoesShowColorStatus = () => {
  return (
    <div className='flex gap-3'>
        <ColorStatus color='bg-red-500' textStatus='Full'/>
        <ColorStatus color='bg-green-500' textStatus='In Use (Not Full)'/>
        <ColorStatus color='bg-blue-500' textStatus='Free'/>
    </div>
  )
}

export default ShoesShowColorStatus
