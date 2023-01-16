import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getFiles } from '../../actions/file';
import "./style.scss";
import FileLists from './fileList';
const DiskPage = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    console.log(currentDir);
    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])
    return (
        <div>
            <div className="disk">
                <div className="disk__btns">
                    <button className="disk__back" >Назад</button>
                    <button className="disk__create">Создать папку</button>
                </div>
                <FileLists/>
            </div>
        </div>
    );
}

export default DiskPage;
