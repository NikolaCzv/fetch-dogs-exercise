import { Modal } from 'antd';
import styled from 'styled-components';

const CustomModal = styled(Modal)<{ $isTabletOrSmaller: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    

    .ant-modal-content{
        width: ${props => props.$isTabletOrSmaller ? '22rem' : '50rem'};
    }
`;

export { CustomModal };