import axios from 'axios'
import {API_GATEWAY_BASE_URL} from "../config/axiosConfig"

export const handleSignIn =async(userInfo)=>{
    try {
        let user = await axios.post(`${API_GATEWAY_BASE_URL}/user/signin, ${userInfo}`)
        

    } catch (error) {
        
    }
}