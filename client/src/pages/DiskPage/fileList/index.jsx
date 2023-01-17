import React from 'react'

import './style.scss';
import File from './file';
import { useSelector } from 'react-redux';


export default function FileLists() {

  const files = useSelector(state => state.files.files).map(file => <File key={file._id} file={file} />)
  console.log(files);



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
