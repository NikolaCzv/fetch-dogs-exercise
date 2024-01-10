import axios from "axios";

export const sortDogsAscending = (array: any[]) => {
    return array.sort((a: { breed: string; }, b: { breed: string; }) => {
       if (a.breed < b.breed) {
           return -1;
       }
       if (a.breed > b.breed) {
           return 1;
       }
       return 0;
    })
};

export const sortDogsDescending = (array: any) => {
    return array.sort((a: { breed: string; }, b: { breed: string; }) => {
        if (a.breed < b.breed) {
            return 1;
        }
        if (a.breed > b.breed) {
            return -1;
        }
        return 0;
    })
};

export const getDogsByID = (dogIds: string[]) => axios.post(`${process.env.REACT_APP_FETCH_API}/dogs`, dogIds,  { withCredentials: true });