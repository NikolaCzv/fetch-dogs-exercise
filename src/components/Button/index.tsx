import { ButtonContainer } from './Button.style';
import { ButtonProps } from './Button.types';

const Button = ({ title, onClick, color, isDisabled }: ButtonProps) => {
    return (
        <ButtonContainer 
            $color={color} 
            $isDisabled={isDisabled} 
            onClick={onClick} 
            disabled={isDisabled}
        >
            {title}
        </ButtonContainer>
    )
};

export default Button;