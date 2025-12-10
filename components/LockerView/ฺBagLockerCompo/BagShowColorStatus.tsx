import React from 'react'
import ColorStatus from '../ColorStatus'

const BagShowColorStatus = () => {
  return (
    <div className='flex gap-3'>
        <ColorStatus color='bg-green-500' textStatus='In Use'/>
        <ColorStatus color='bg-blue-500' textStatus='Free'/>
    </div>
  )
}

export default BagShowColorStatus
