import { fetchApi } from "./api.service";

import type { User } from "../types";

export const LoginService = async (dto: User) => {
    return await fetchApi.get(`/users?userName=${dto.userName}&password=${dto.password}`);
};