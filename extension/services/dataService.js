import { api } from '../api/api.js';
import { ENDPOINTS } from '../api/endPoints.js';

export const getLink = () => api.get(ENDPOINTS.GET_PRODUCT);

export const sendData = (data) => api.put(ENDPOINTS.UPDATE_PRODUCT, data);

export const serverStartExtension = () => api.put(ENDPOINTS.START_EXTENSION);

export const serverStopExtension = () => api.put(ENDPOINTS.STOP_EXTENSION);

export const statusExtension = () => api.get(ENDPOINTS.STATUS_EXTENSION);

export const errorExtension = (error) => api.put(ENDPOINTS.ERROR_EXTENSION, error);
