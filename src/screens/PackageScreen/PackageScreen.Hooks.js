import { useEffect, useState } from 'react';
import { Reducers } from '../../constants/Strings';
import { useSelector } from 'react-redux';
import { NormalSnackBar } from '../../constants/SnackBars';
import { getPackagesAPI } from '../../api/utils';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const restId = useSelector(state => state[Reducers.AuthReducer]);

    // UseStates
    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState({});
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    // UseEffects
    useEffect(() => {
        fetchPackages();
    }, [])

    // Methods
    const fetchPackages = async () => {
        try {
            setLoading(true);
            const res = await getPackagesAPI();
            if (res?.data && res?.data?.data) {
                const list = res?.data?.data;
                setPackages(list);
                list.length > 0 && setSelectedPackage(list[0]);
            }
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }

    const onPayNowPress = () => setIsConfirmModalVisible(true);

    const onPaymentSuccess = (res) => {
        NormalSnackBar(res);
        setIsConfirmModalVisible(false);
        navigation.pop(1);
    }

    return {
        navigation,
        restId,

        packages, setPackages,
        selectedPackage, setSelectedPackage,
        isConfirmModalVisible, setIsConfirmModalVisible,
        loading, setLoading,

        onPayNowPress,
        onPaymentSuccess,
    };
}

export default useScreenHooks