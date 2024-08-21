import { useSelector } from 'react-redux';
import { NavigationScreens, Reducers } from '../../constants/Strings';
import { useEffect, useState } from 'react';
import { NormalSnackBar } from '../../constants/SnackBars';
import { Dimensions } from 'react-native';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const invoiceId = props.route.params.invoiceId;
    const tableNo = props.route.params.tableNo;
    const discount = props.route.params.dis;
    const cardWidth = (Dimensions.get('window').width - 40) / 2;
    const allItemData = useSelector(state => state[Reducers.MenuDataReducer]);
    const categories = useSelector(state => state[Reducers.CategoryDataReducer]);

    // UseStates
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCat, setSelectedCat] = useState(categories && categories[0]);

    const [isSelectedItemModalVisible, setIsSelectedItemModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    // UseEffects
    useEffect(() => { filterByCategory(selectedCat) }, [allItemData])

    // Methods
    const filterByCategory = (cat) => {
        setSelectedCat(cat);
        search && setSearch('');
        if (cat == "All") {
            setData(allItemData);
        } else {
            setData(allItemData.filter((i) => i?.category?.name?.toLowerCase() == cat.toLowerCase()))
        }
    }

    const onSearching = (text) => {
        setSearch(text);
        if (text.length > 0) {
            setData(allItemData.filter((i) => i?.name?.toLowerCase().includes(text.toLowerCase())))
        } else {
            setData(allItemData);
        }
        selectedCat != "All" && setSelectedCat("All");
    }

    const onItemPress = (item) => {
        setSelectedItem(item);
        setIsSelectedItemModalVisible(true);
    }

    const onViewOrderPress = () => {
        navigation.navigate(NavigationScreens.GenerateInvoiceScreen, {
            invoiceId: invoiceId,
            dis: discount,
            tableNo: tableNo,
        });
    }

    const onItemAdded = (res) => {
        NormalSnackBar(res);
        setSelectedItem({});
    }

    return {
        navigation,
        invoiceId,
        tableNo,
        categories,
        cardWidth,

        data,
        search,
        selectedCat,
        isSelectedItemModalVisible, setIsSelectedItemModalVisible,
        selectedItem, setSelectedItem,

        filterByCategory,
        onSearching,
        onItemPress,
        onViewOrderPress,
        onItemAdded,
    };
}

export default useScreenHooks