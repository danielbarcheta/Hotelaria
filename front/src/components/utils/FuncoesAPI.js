import axios from "axios"

export const api = axios.create({
        baseURL: "http://localhost:9192"
})

export async function addQuarto(photo, roomType, roomPrice) {
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("roomType", photo)
    formData.append("roomPrice", photo)

}