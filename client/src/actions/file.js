import axios from 'axios'
import { addFile, deleteFileAction, setFiles } from '../reducers/fileReducer';
import { API_URL } from '../constants';

export function getFiles(dirId) {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/files${dirId ? '?parent=' + dirId : ''}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            dispatch(setFiles(response.data))
            console.log(response.data);
        } catch (e) {
            // alert(e.response.data.message)
            console.log(e.response);
        }
    }
}
export function createDir(dirId, name) {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}/files`, {
                name,
                parent: dirId,
                type: 'dir'
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}
export function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }
            const response = await axios.post(`${API_URL}/files/upload`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                onUploadProgress: (progressEvent) => {
                    console.log(progressEvent);
                    const totalLength = progressEvent.event.lengthComputable ? progressEvent.total : progressEvent.event.target.getResponseHeader('content-length') || progressEvent.event.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength)
                    if (totalLength) {
                        let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        console.log(progress)
                    }
                }
            });
            dispatch(addFile(response.data))
        } catch (error) {
            console.log(error);
        }
    }
}
export async function downloadFile(file) {
    const response = await fetch(`${API_URL}/files/download?id=${file._id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}

export function deleteFile(file) {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}/files?id=${file._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(deleteFileAction(file._id))
            alert(response.data.message)
        } catch (e) {
            alert(e?.response?.data?.message)
        }
    }
}