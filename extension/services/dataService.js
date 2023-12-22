import { api } from "../api/api.js";
import { ENDPOINTS } from "../api/endPoints.js";

export const getLink = () => api.get(ENDPOINTS.GET_PRODUCT);

export const sendData = (data) => api.put(ENDPOINTS.UPDATE_PRODUCT, data);
