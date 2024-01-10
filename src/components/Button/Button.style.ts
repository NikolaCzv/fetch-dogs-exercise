import styled from 'styled-components';
import { colors } from '../../utils/colors';

const ButtonContainer = styled.button<{ $color: 'primary' | 'secondary'; $isDisabled: boolean | undefined; }>`
    cursor: ${prosp => prosp.$isDisabled ? 'not-allowed' : 'pointer'};
    width: 10rem;
    height: 2rem;
    border: none;

    background: ${({ $color }) => $color === 'primary' ? `${colors.purple}` : `${colors.orange}`};
    color: ${({ $color }) => $color === 'primary' ?  `${colors.gray}` : `${colors.purple}`};
    border-radius: .5rem;
`;

export { ButtonContainer }