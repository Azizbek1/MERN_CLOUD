import React from 'react'

import './style.scss';
import File from './file';


export default function FileLists() {

  const files = [
    { _id: 1, name: "direc", type: "dir", size: "5gb", date: "20.20.2020" },
    { _id: 2, name: "direc2", type: "dir", size: "5gb", date: "20.20.2020" },
  ].map(file => <File file={file} key={file._id}/>)



  return (
    <div className='filelist'>
      <div className="filelist__header">
        <div className="filelist__name">Название</div>
        <div className="filelist__date">Дата</div>
        <div className="filelist__size">Размер</div>
      </div>
      {files}
    </div>
  )
}
