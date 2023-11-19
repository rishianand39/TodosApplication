import { API_GATEWAY_BASE_URL } from "../config/axiosConfig";

export const createTask =async(body)=>{
    try {
        const response = await fetch(`http://localhost:8080/task/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          return errorData
        }
        const task = await response.json();
        console.log(task, "task")
        return task;
      } catch (error) {}
}