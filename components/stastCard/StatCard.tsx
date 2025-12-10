import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface StatCardProps {
    title : string;
    value : string;
    icon? : React.ReactNode;
    bgcolor? : string;
    textColor? : string;
    percent?: string;
}

const StatCard: React.FC<StatCardProps> = ({title, value,icon,bgcolor = "bg-blue-950", textColor = "text-white",percent}) => {
  return (
    <Card className={`max-w-full ${bgcolor}`}>
      <CardHeader>
        <CardTitle className={`text-xl font-bold ${textColor}`}>
          <p className='flex flex-row justify-between items-center'>
            {title}
            {icon && <span className='text-3xl'>{icon}</span>}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className={`flex gap-2 ${textColor} text-xl font-bold`}>
        {value}
        {percent && (
          <p className='text-xl text-gray-800 opacity-70'>
            ({percent}%)
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default StatCard
