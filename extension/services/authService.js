import { api } from "../api/api.js";
import { ENDPOINTS } from "../api/endPoints.js";

export const login = (userData) => api.post(ENDPOINTS.LOGIN, userData);