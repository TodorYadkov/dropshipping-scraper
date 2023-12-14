import { api } from "../api/api.js";
import { ENDPOINTS } from "../api/endPoints.js";

export const getLink = () => api.get(ENDPOINTS.TEST_GET);

export const sendData = (data) => api.post(ENDPOINTS.TEST_POST, data);
