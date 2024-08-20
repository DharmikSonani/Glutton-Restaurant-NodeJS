import { useEffect, useState } from 'react';
import { NormalSnackBar } from '../../constants/SnackBars';
import { Alert } from 'react-native';
import { generateInvoiceAPI, getInvoiceByIDAPI } from '../../api/utils';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const invoiceId = props.route.params.invoiceId;
    const tableNo = props.route.params.tableNo;

    // UseStates
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // UseEffects
    useEffect(() => {
        fetchData();
    }, [navigation])

    // Methods
    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await getInvoiceByIDAPI(invoiceId);
            if (res?.data && res?.data?.data) {
                setItems(res?.data?.data?.items);
            } else {
                NormalSnackBar('Something wents wrong.');
            }
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e);
        }

    }

    const generateInvoice = async () => {
        try {
            const res = await generateInvoiceAPI(invoiceId);
            if (res?.data && res?.data?.data) {
                navigation.pop(2);
                NormalSnackBar("Invoice Generated.");
            } else {
                NormalSnackBar('Something wents wrong.');
            }
        } catch (e) {
            console.log(e);
        }
    }

    const onGenerateInvoicePress = () => {
        Alert.alert(
            "Generate Invoice",
            "Are you sure, you want to generate invoice?",
            [
                { text: 'No', onPress: () => { } },
                { text: 'Yes', onPress: () => { generateInvoice() } },

            ],
            { cancelable: false }
        )
    }


    return {
        navigation,
        invoiceId,
        tableNo,
        items,
        loading,

        onGenerateInvoicePress,
    };
}

export default useScreenHooks