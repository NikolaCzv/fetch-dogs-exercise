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
    width: -webkit-fill-available;
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 1rem 0;
`;

const PaginationWrapper = styled.div`
    width: -webkit-fill-available;  
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 2rem;
`;

const SelectWrapper = styled.div<{$isTabletOrSmaller: boolean}>`
    width: -webkit-fill-available;

    display: flex;
    flex-direction: ${({$isTabletOrSmaller}) => $isTabletOrSmaller ? 'column' : 'row'};
    justify-content: space-between;
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