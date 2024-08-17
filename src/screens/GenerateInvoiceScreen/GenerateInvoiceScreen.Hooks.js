import { useEffect, useState } from 'react';
import { InvoiceDBFields, InvoiceDBPath } from '../../constants/Database';
import { NormalSnackBar } from '../../constants/SnackBars';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

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
    const fetchData = () => {
        setLoading(true);
        try {
            InvoiceDBPath
                .doc(invoiceId)
                .collection("Items")
                .orderBy(InvoiceDBFields.Items.addedAt, 'asc')
                .onSnapshot((querySnap) => {
                    list = querySnap.docs.map((doc, i) => {
                        itemNo = i + 1;
                        const { itemName, itemPrice, qty, total } = doc.data();
                        return ({ itemName, itemPrice, qty, total, itemNo });
                    })
                    setItems(list);
                    setLoading(false);
                })

        } catch (e) {
            setLoading(false);
            console.log(e);
        }

    }

    const generateInvoice = () => {
        try {
            InvoiceDBPath
                .doc(invoiceId)
                .update({
                    isComplete: 'true',
                    generatedAt: firestore.Timestamp.fromDate(new Date()),
                }).then(() => {
                    navigation.pop(2);
                    NormalSnackBar("Invoice Generated.");
                })
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