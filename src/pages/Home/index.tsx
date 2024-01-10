import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { CardsWrapper, HomeContainer, Logo, NoResultMsessage, PaginationWrapper, TopWrapper } from './Home.style';
import logo from '../../assets/images/logo.png';
import DogCard from '../../components/DogCard';
import { getDogsByID, sortDogsAscending, sortDogsDescending } from '../../utils/helpersFunctions';

import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import { Select } from 'antd';

const Home = () => {
    const navigate = useNavigate();

    const [breeds, setBreeds] = useState<String[] | { value: String, label: String }[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSorted, setIsSorted] = useState<boolean>(true);
    const [nextLink, setNextLink] = useState<string | undefined>("");
    const [prevLink, setPrevLink] = useState<string | undefined>("");
    const [selectedDogs, setSelectedDogs] = useState<any[]>([]);
    const [searchParams, setSearchParams] = useState<any[]>([]);
    const [totalNumber, setTotalNumber] = useState<number>(0);

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
                .catch((error) => console.log('222', error));
    };

    // Filter `option.label` match the user type `input`
    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

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

            let response = axios.get(`${process.env.REACT_APP_FETCH_API}/dogs/search`, { withCredentials: true, params: params });
            response.then(resp => {
                let dogIds = resp.data.resultIds;
                console.log("resp.data.total", resp.data.total)
                setTotalNumber(resp.data.total);

                if(resp.data.next){
                    setNextLink(resp.data.next);
                }
                
                let response = getDogsByID(dogIds);
                  
                response.then(resp => {
                    let sortedDogs = sortDogsAscending(resp.data);
                    setSelectedDogs(sortedDogs);
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
                    let sortedDogs = sortDogsAscending(resp.data);
    
                    setSelectedDogs(sortedDogs);
                    setIsLoading(false);
                    window.scrollTo(0, 0);
                });
            })
        } catch (error) {
            console.log(error)
        }
    };

    const toggleSort = (type: string) => {
        console.log("type", type)
        if(type === 'asc'){
            let localBreeds = sortDogsAscending(selectedDogs);
            console.log("localBreeds 1111", localBreeds)
            setSelectedDogs(localBreeds);
        } else if(type === 'desc'){
            let nextArray = nextLink?.split('=');
            nextArray?.pop();
            // let url = nextArray?.push(`${totalNumber}`);
            // console.log("url", url)
            //@ts-ignore
            console.log("nextArray", nextArray?.join('=') + '=' + `${totalNumber - 25}`);
            //@ts-ignore
            let response = axios.get(`${process.env.REACT_APP_FETCH_API}${nextArray?.join('=') + '=' + `${totalNumber - 25}`}`, { withCredentials: true, params: { breeds: searchParams } });
            response.then(resp => {
                let dogIds = resp.data.resultIds;
                if(resp.data.prev){
                    setNextLink(resp.data.prev);
                }

                let prevArray = resp.data?.prev?.split('=');
                let prevNumber = +prevArray[prevArray.length - 1];

                if(resp.data.total > prevNumber){
                    setNextLink(resp.data.prev);
                } else {
                    setNextLink(undefined);
                }
                setPrevLink(resp.data.next);
                
                let response = getDogsByID(dogIds.reverse())
                  
                response.then(resp => {
                    let sortedDogs = sortDogsAscending(resp.data);
                    console.log("resp.data", resp.data)
                    setSelectedDogs(sortedDogs);
                    setIsLoading(false);
                });
            })
        }
    };

    console.log("setTotalNumber", totalNumber, nextLink);

    //SORT UP AN DOWN
    //ADD TO FAVORITES
    //FIND A FAV MATCH
    //RESPONSIVE
    //CLEANUP
    //COMMENTS

    return (
        <HomeContainer>
            <TopWrapper>
                <Logo alt="" src={logo}/>
                <Button title='LOGOUT' color='primary' onClick={handleLogout}/>
            </TopWrapper>
            <div>
                Search by Breed
                <Select
                    showSearch
                    mode="multiple"
                    placeholder="Select Breed"
                    optionFilterProp="children"
                    onChange={onChangeSelect}
                    // onSearch={onSearch}
                    filterOption={filterOption}
                    // @ts-ignore
                    options={breeds}
                    style={{ width: '15rem', margin: '1rem' }}
                />
            </div>
            {isSorted && 
                <div onClick={() => toggleSort('desc')}>
                    Sort Breeds Z - A
                    <CaretUpOutlined />
                </div>
            }
            {!isSorted &&
                <div onClick={() => toggleSort('asc')}>
                    Sort Breeds A - Z
                    <CaretDownOutlined />
                </div>
            }
            {isLoading ?
                <h1>...loading</h1>
                :
            <>
                {selectedDogs.length === 0 &&
                    <NoResultMsessage>
                        Sorry no dogs were found. Please select filters above.
                    </NoResultMsessage>
                }
                <CardsWrapper>
                    {selectedDogs.map((dog, index) => (
                        <DogCard 
                            dog={dog} 
                            key={index}
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