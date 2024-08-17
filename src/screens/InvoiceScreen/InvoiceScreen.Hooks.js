import { useEffect, useState } from 'react';
import { Reducers } from '../../constants/Strings';
import { useSelector } from 'react-redux';
import { InvoiceDBFields, InvoiceDBPath } from '../../constants/Database';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const invoiceId = props.route.params.invoiceId;
    const restData = useSelector(state => state[Reducers.RestDataReducer]);

    // UseStates
    const [details, setDetails] = useState([]);
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    // UseEffects
    useEffect(() => {
        fetchData();
    }, [navigation]);

    // Methods
    const fetchData = () => {
        setLoading(true);
        try {
            InvoiceDBPath
                .doc(invoiceId)
                .get()
                .then((querySnap) => {
                    setDetails(querySnap.data());
                })

            InvoiceDBPath
                .doc(invoiceId)
                .collection("Items")
                .orderBy(InvoiceDBFields.Items.addedAt, 'asc')
                .get()
                .then((querySnap) => {
                    let tot = 0;
                    list = querySnap.docs.map((doc, i) => {
                        itemNo = i + 1;
                        const { itemName, itemPrice, qty, total } = doc.data();
                        tot = tot + total;
                        return ({ itemName, itemPrice, qty, total, itemNo });
                    })
                    setItems(list);
                    setTotal(tot);
                    setLoading(false);
                })

        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    return {
        navigation,
        invoiceId,
        restData,

        details,
        items,
        total,
        loading,
    };
}

export default useScreenHooks