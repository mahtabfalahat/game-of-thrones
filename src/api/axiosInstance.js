import axios from 'axios';
import { API_CALL_TIME_OUT } from './../constants/magicKey';

const instance = axios.create({
    timeout: API_CALL_TIME_OUT,
    mode: "cors",
    headers: {
        "Authorization": `Bearer: 123`,
        'Content-Type': 'application/json',
    },
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // NotificationManager.error('error');
    }
);

export default instance;