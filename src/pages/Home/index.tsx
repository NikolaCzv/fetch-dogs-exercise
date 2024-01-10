import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { 
    CardsWrapper, 
    HomeContainer, 
    Logo, 
    NoResultMsessage, 
    PaginationWrapper, 
    SelectWrapper, 
    SortWrapper, 
    TopWrapper 
} from './Home.style';
import logo from '../../assets/images/logo.png';
import DogCard from '../../components/DogCard';
import { getDogsByID } from '../../utils/helpersFunctions';

import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import { Select } from 'antd';
import FavoritesModal from '../../components/FavoritesModal';
import Loader from '../../components/Loader';
import { useDeviceDimensions } from '../../utils/useDeviceDimensions';

const Home = () => {
    const navigate = useNavigate();
    let { isTabletOrSmaller } = useDeviceDimensions();

    const [breeds, setBreeds] = useState<String[] | { value: String, label: String }[]>([]);
    const [favoriteDogs, setFavoriteDogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isSorted, setIsSorted] = useState<boolean>(true);
    const [nextLink, setNextLink] = useState<string | undefined>("");
    const [prevLink, setPrevLink] = useState<string | undefined>("");
    const [selectedDogs, setSelectedDogs] = useState<any[]>([]);
    const [searchParams, setSearchParams] = useState<any[]>([]);
    const [sortType, setSortType] = useState<string>('asc');

    useEffect(() => {
        let config = {
            withCredentials: true,
        };

        let response = axios.get(`${process.env.REACT_APP_FETCH_API}/dogs/breeds`, config);
        response.then(resp => {
            let localBreed: { value: String, label: String }[]  = [];
            resp.data.forEach((breed: String) => localBreed.push({ value: breed, label: breed }));
            setBreeds(localBreed);
        })
    },[]);


    const handleLogout = () => {
        axios.post(`${process.env.REACT_APP_FETCH_API}/auth/logout`, {
                    name: 'test',
                    email: 'test@email.com'
                },
                { withCredentials: true }
                )
                .then((resp) => {
                    localStorage.clear();
                    navigate('/login');
                })
                .catch((error) => console.log('error', error));
    };

    // Filter `option.label` match the user type `input`
    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    
    //getting dog by breeds when user select
    const onChangeSelect = (value: string[]) => {
        setIsLoading(true);
        if(value.length === 0){
            setSelectedDogs([]);
            setIsLoading(false);
            return;
        }
        try {
            let params = { breeds: value };
            setSearchParams([...value]);

            let response = axios
                .get(`${process.env.REACT_APP_FETCH_API}/dogs/search?sort=breed:${sortType}`, { withCredentials: true, params: params });
            response.then(resp => {
                let dogIds = resp.data.resultIds;

                if(resp.data.next){
                    setNextLink(resp.data.next);
                }
                
                let response = getDogsByID(dogIds);
                  
                response.then(resp => {
                    setSelectedDogs(resp.data);
                    setIsSorted(true);
                    setIsLoading(false);
                });
            })
        } catch (error) {
            console.log(error)
        }
    };

    const handlePagination = (type: string) => {
        setIsLoading(true);
        try {
            let response = axios
            .get(`${process.env.REACT_APP_FETCH_API}${type === 'next' ? nextLink : prevLink}`, { withCredentials: true, params: {breeds: searchParams} });
            response.then(resp => {
                let dogIds = resp.data.resultIds;
                
                let nextArray = resp.data?.next?.split('=');
                let nextNumber = +nextArray[nextArray.length - 1];

                if(resp.data.total > nextNumber){
                    setNextLink(resp.data.next);
                } else {
                    setNextLink(undefined);
                }
                setPrevLink(resp.data.prev);
                let response = getDogsByID(dogIds);
                  
                response.then(resp => {
                    setSelectedDogs(resp.data);
                    setIsLoading(false);
                    window.scrollTo(0, 0);
                });
            })
        } catch (error) {
            console.log(error)
        }
    };

    //sorting dog breeds ascending & descending
    const toggleSort = (type: string) => {
        setSortType(type);
        try {
            let response = axios.get(`${process.env.REACT_APP_FETCH_API}/dogs/search?sort=breed:${type}`, { withCredentials: true, params: {breeds: searchParams} });
            response.then(resp => {
                let dogIds = resp.data.resultIds;

                if(resp.data.next){
                    setNextLink(resp.data.next);
                }

                console.log("dogIds", dogIds);
                
                let response = getDogsByID(dogIds);
                  
                response.then(resp => {
                    setSelectedDogs(resp.data);
                    setIsSorted(!isSorted);
                    setIsLoading(false);
                });
            })
        } catch (error) {
            console.log(error)
        }
    };

    //saving dog ids to favorites array
    const addToFavorites = (dogId: any[]) => setFavoriteDogs([...favoriteDogs, dogId]);

    //remmoving dog ids from favorites array
    const removeFavorite = (dogId: string) => {
        let filtered = favoriteDogs.filter(favDog => favDog !== dogId);
        setFavoriteDogs(filtered);
    };

    const toggleFavModal = () => setIsModalOpen(!isModalOpen);

    return (
        <HomeContainer>
            <FavoritesModal 
                favorites={favoriteDogs} 
                isOpen={isModalOpen} 
                onClose={toggleFavModal}
            />
            <TopWrapper>
                <Logo alt="" src={logo}/>
                <Button title='LOGOUT' color='secondary' onClick={handleLogout}/>
            </TopWrapper>
            <SelectWrapper $isTabletOrSmaller={isTabletOrSmaller}>
                <div>
                    Search by Breed
                    <Select
                        showSearch
                        mode="multiple"
                        placeholder="Select Breed"
                        optionFilterProp="children"
                        onChange={onChangeSelect}
                        filterOption={filterOption}
                        // @ts-ignore
                        options={breeds}
                        style={{ width: '15rem', margin: '1rem'}}
                    />
                </div>
                <Button
                    title='FIND A MATCH'
                    onClick={toggleFavModal}
                    color='primary'
                    isDisabled={favoriteDogs.length === 0}
                />
            </SelectWrapper>
            {isLoading ?
                <Loader />
                :
            <>
                {isSorted && selectedDogs.length !== 0 &&
                    <SortWrapper onClick={() => toggleSort('desc')}>
                        Sort Breeds Z - A
                        <CaretUpOutlined />
                    </SortWrapper>
                }
                {!isSorted && selectedDogs.length !== 0 &&
                    <SortWrapper onClick={() => toggleSort('asc')}>
                        Sort Breeds A - Z
                        <CaretDownOutlined />
                    </SortWrapper>
                }
                {selectedDogs.length === 0 &&
                    <NoResultMsessage>
                        Sorry no dogs were found. Please select filters above.
                    </NoResultMsessage>
                }
                <CardsWrapper>
                    {selectedDogs.map((dog, index) => (
                        <DogCard 
                            key={index}
                            dog={dog} 
                            //@ts-ignore
                            addToFavorites={addToFavorites}
                            favoriteDogs={favoriteDogs}
                            //@ts-ignore
                            removeFavorite={removeFavorite}
                        />
                    ))}
                </CardsWrapper>
                <PaginationWrapper>
                    {typeof prevLink !== 'undefined' && prevLink.length > 0 && selectedDogs.length !== 0 &&
                        <Button 
                            title='PREVIOUS' 
                            onClick={() => handlePagination('prev')} 
                            color='secondary' 
                        />
                    }
                    {typeof nextLink !== 'undefined' && nextLink.length > 0 && selectedDogs.length !== 0  &&
                        <Button 
                            title='NEXT' 
                            onClick={() => handlePagination('next')} 
                            color='secondary' 
                        />
                    }
                </PaginationWrapper>
            </>
}
        </HomeContainer>
    )
};

export default Home;