import styled from 'styled-components';
import { colors } from '../../utils/colors';

const CardsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;

    align-items: center;
    justify-content: space-evenly;
`;

const HomeContainer = styled.div`
    background: ${colors.orange};

    min-height: 100vh;
    padding: 2rem;
`;

const Logo = styled.img`
    width: 8rem;
`;

const NoResultMsessage = styled.div`
    position: absolute;
    top: 50%;
    width: 25rem;
`;

const PaginationWrapper = styled.div`
    width: -webkit-fill-available;  
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 2rem;
`;

const SelectWrapper = styled.div`
    width: -webkit-fill-available;

    display: flex;
    justify-content: space-between;
    align-itmes: center;
    margin: 2rem 0;
`;

const SortWrapper = styled.div`
    cursor: pointer;
`;

const TopWrapper = styled.div`
    width: -webkit-fill-available;

    display: flex;
    justify-content: space-between;
    align-itmes: center;
`;

export { CardsWrapper, HomeContainer, Logo, NoResultMsessage, PaginationWrapper, SelectWrapper, SortWrapper, TopWrapper };