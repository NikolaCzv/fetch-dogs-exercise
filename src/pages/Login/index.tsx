import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

import {
    CustomInput,
    LoginMainContainer,
    LoginTitle,
    LoginWrapper
} from './Login.style';

const Login = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');

    const handleLogin = () => {
        try {
            let userData = {
                email: email,
                name: userName
            };

            axios
                .post(`${process.env.REACT_APP_FETCH_API}/auth/login`, userData, { withCredentials: true })
                .then((resp) => {
                    window.localStorage.setItem('isAuth', email);
                    navigate('/');
                })
                .catch((error) => console.log('error', error));
        } catch (error) {
            console.log('error', error);
        }
    };

    const onChangeInputs = (e: ChangeEvent<HTMLInputElement>): void => {
        switch (e.target.name) {
            case 'name':
                setUserName(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;

            default:
                break;
        }
    };

    return (
        <LoginMainContainer>
            <LoginWrapper>
                <LoginTitle>LOGIN</LoginTitle>
                <CustomInput
                    placeholder="Full Name"
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onChangeInputs(e)
                    }
                />
                <CustomInput
                    placeholder="Email"
                    type="text"
                    id="email"
                    name="email"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onChangeInputs(e)
                    }
                />
                <Button 
                    title='LOGIN' 
                    color="primary" 
                    onClick={handleLogin} 
                />
            </LoginWrapper>
        </LoginMainContainer>
    );
};

export default Login;
