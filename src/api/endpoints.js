import axiosInstance from "./axiosInstance";
import { HTTP_METHODS } from './../constants/common';


// get info of houses
export const getHouseInfo = async ({url}) => {
    return axiosInstance({
        method: HTTP_METHODS.GET,
        url: url,
    }); 
};
