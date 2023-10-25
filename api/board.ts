import axios from "axios";

export const getBoard = async () => {
    const response = await fetch('/api/board');
    return await response.json();
}

export const getBoardDetail = async (id: string) => {
    return axios.get(`/api/board/${id}`)
}
