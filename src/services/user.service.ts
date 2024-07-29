import { fetchApi } from "./api.service";

import type { User } from "../types";

export const LoginService = async (dto: User) => {
    return await fetchApi.post(`/tasks`, dto);
};