export const createTask =async(body)=>{
    try {
        let response = await axios.post(`${API_GATEWAY_BASE_URL}/task/create`,body)
        return response?.data
    } catch (error) {
        console.error(error)
    }
}