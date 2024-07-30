import { Message } from "../types";
import { fetchApi } from "./api.service";

export const onFetchMessages = async (taskId: string) : Promise<Message[]> => {
    let response = await fetchApi.get(`/messages?taskId=${taskId}`);
    return response?.data
};
