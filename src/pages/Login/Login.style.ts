import { Input } from 'antd';
import styled from 'styled-components';
import { colors } from '../../utils/colors';
import loginWallpaper from '../../assets/images/login-wallpaper.jpeg';

const CustomInput = styled(Input)`
    background: transparent;
    border-color: ${colors.darkGreen};

    &:hover{
        border-color: ${colors.purple};
    }
`;

const LoginMainContainer = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(${loginWallpaper});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const LoginTitle = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
`;

const LoginWrapper = styled.div`
    position: relative;
    width: 25rem;
    height: 25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    background: ${colors.gray};
    border-radius: .5rem;
    padding: 1rem;
`;



export { CustomInput, LoginMainContainer, LoginTitle, LoginWrapper }