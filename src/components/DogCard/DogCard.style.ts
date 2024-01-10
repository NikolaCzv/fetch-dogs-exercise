import styled from 'styled-components';
import { colors } from '../../utils/colors';

const CardContainer = styled.div`
    height: 30rem;
    width: 20rem;
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    padding: 1rem;

    background: ${colors.gray};
    border: solid;
    border-width: 1px;
    border-radius: 0.5rem;
    box-shadow: 5px 5px ${colors.orange}, 10px 10px ${colors.purple};
`;

const CardImg = styled.img`
    height: 20rem;
    width: 18rem;
    align-self: center;
    border-radius: 0.5rem;
`;

const CardTag = styled.div`
    font-size: 1rem;
    margin: 0.5rem 0;
`;

const CardTopWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export { CardContainer, CardImg, CardTag, CardTopWrapper }