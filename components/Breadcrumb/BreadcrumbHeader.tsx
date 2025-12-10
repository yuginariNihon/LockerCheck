import React from 'react'
import Breadcrumb from './Breadcrumb'

interface namepagePropmt {
    name: string;
}

const BreadcrumbHeader = ({name}:namepagePropmt) => {
  return (
    <div className='flex flex-col'>
        <div className='text-3xl font-bold mb-3'>
            {name}
        </div>
        <div className='w-full flex justify-between font-bold text-md mb-3'>
            <div>
                <Breadcrumb/>
            </div>
        </div>
    </div>
  )
}

export default BreadcrumbHeader
