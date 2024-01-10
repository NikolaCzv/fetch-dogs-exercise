import { ButtonContainer } from './Button.style';
import { ButtonProps } from './Button.types';

const Button = ({ title, onClick, color }: ButtonProps) => {
    return (
        <ButtonContainer onClick={onClick} color={color}>{title}</ButtonContainer>
    )
};

export default Button;