import React from 'react'
import dirLogo from '../../../../assets/img/dir.svg'
import fileLogo from '../../../../assets/img/file.svg'
import './style.scss'
export default function File({file}) {
  return (
    <div className='file'>
      <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className='file__img' />
      <div className='file__name'>{file.name}</div>
      <div className='file__date'>{file.date}</div>
      <div className='file__size'>{file.size}</div>
    </div>
  )
}
