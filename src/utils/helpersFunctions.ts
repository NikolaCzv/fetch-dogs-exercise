import axios from "axios";


export const getDogsByID = (dogIds: string[]) => axios.post(`${process.env.REACT_APP_FETCH_API}/dogs`, dogIds,  { withCredentials: true });