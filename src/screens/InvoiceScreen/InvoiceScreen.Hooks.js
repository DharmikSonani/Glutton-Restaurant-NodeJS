import { useEffect, useState } from 'react';
import { getInvoiceByIDAPI } from '../../api/utils';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const invoiceId = props.route.params.invoiceId;

    // UseStates
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // UseEffects
    useEffect(() => {
        fetchData();
    }, [navigation]);

    // Methods
    const fetchData = async () => {
        try {
            setLoading(true);
            try {
                const res = await getInvoiceByIDAPI(invoiceId);
                if (res && res?.data && res?.data?.data) {
                    setData(res?.data?.data);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } catch (e) {
                setLoading(false);
                console.log(e);
            }
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    return {
        navigation,
        invoiceId,

        data,
        loading,
    };
}

export default useScreenHooks