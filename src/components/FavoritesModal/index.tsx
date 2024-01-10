import axios from "axios";
import { useEffect, useState } from "react";
import { getDogsByID } from "../../utils/helpersFunctions";
import { useDeviceDimensions } from "../../utils/useDeviceDimensions";
import DogCard from "../DogCard";
import Loader from "../Loader";
import { CustomModal } from "./FavoritesModal.style";
import { FavoritesModalProps } from './FavoritesModal.types';

const FavoritesModal = ({ favorites, isOpen, onClose }: FavoritesModalProps) => {
    const { isTabletOrSmaller } = useDeviceDimensions();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [match, setMatch] = useState<any>({});

    useEffect(() => {
        //here we get the match from the api
        if(isOpen){
            setIsLoading(true);
            axios
                .post(`${process.env.REACT_APP_FETCH_API}/dogs/match`, favorites, { withCredentials: true })
                .then(response => {
                    let prom = getDogsByID([response?.data?.match]);
                    prom.then(resp => {
                        setMatch(resp.data[0]);
                        setIsLoading(false);
                    });
                });
        }
    },[favorites, isOpen]);
    
    return (
        <CustomModal 
            title="We Found Your a Match!" 
            open={isOpen} 
            footer={null} 
            onCancel={onClose} 
            $isTabletOrSmaller={isTabletOrSmaller}
        >
            {isLoading ?
                <Loader />
                :
                <DogCard
                    dog={match}
                    isMatch={true}
                />
            }
        </CustomModal>
    );
};

export default FavoritesModal;