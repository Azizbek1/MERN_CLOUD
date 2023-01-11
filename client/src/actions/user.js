import axios from 'axios'

export const register = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/registration', {
            email,
            password
        })
        alert(response.data.message)
    } catch (err) {
        alert(err.response.data.message)
    }
}