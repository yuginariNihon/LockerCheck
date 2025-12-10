import React from 'react'

interface colorTextPrompt{
    color: string;
    textStatus: string;
}
const ColorStatus:React.FC<colorTextPrompt> = ({color,textStatus}) => {
  return (
    <div className='flex gap-3 mb-3'>
        <div className={`h-5 w-5 ${color}`}/>
        <p>{textStatus}</p>
    </div>
  )
}

export default ColorStatus
