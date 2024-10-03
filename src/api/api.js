import axios from "axios";

export async function getUser() {
    try {
        const response = await axios.get("data.json")
        const data = response.data
        console.log('res', response)
        localStorage.setItem("dataUser", JSON.stringify(data))
        return data
    } catch (e) {
        return 'error'
    }
}
