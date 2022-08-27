import axiosInstance from "./axiosInstance";
import { HTTP_METHODS } from './../constants/common';


// get list of houses
export const getHouses = async () => {
    return axiosInstance({
        method: HTTP_METHODS.GET,
        url: 'https://www.anapioficeandfire.com/api/houses',
    }); 
};
export const getHouseDetail = async ({url}) => {
    return axiosInstance({
        method: HTTP_METHODS.GET,
        url: url,
    }); 
};