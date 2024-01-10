import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { colors } from '../../utils/colors';

const Loader = () => {
    return <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: colors.black }} spin />} />;

};

export default Loader;