import { useEffect, useState } from 'react';
import { Reducers } from '../../constants/Strings';
import { useSelector } from 'react-redux';
import { PackagesDBFields, PackagesDBPath } from '../../constants/Database';
import { NormalSnackBar } from '../../constants/SnackBars';

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
    const fetchPackages = () => {
        setLoading(true);
        try {
            PackagesDBPath
                .orderBy(PackagesDBFields.duration, 'asc')
                .onSnapshot((querySnap) => {
                    const list = querySnap.docs.map((doc, i) => {
                        return (doc.data());
                    })
                    setPackages(list);
                    list.length > 0 && setSelectedPackage(list[0]);
                    setLoading(false);
                })
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