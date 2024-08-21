import { useSelector } from 'react-redux';
import { Reducers } from '../../constants/Strings';
import { useEffect, useState } from 'react';
import { getAllMenuCategoriesAPI } from '../../api/utils';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const allItemData = useSelector(state => state[Reducers.MenuDataReducer]);
    const categories = useSelector(state => state[Reducers.CategoryDataReducer]);
    const restId = useSelector(state => state[Reducers.AuthReducer]);

    // UseStates
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCat, setSelectedCat] = useState(categories && categories[0]);
    const [allCategory, setAllCategory] = useState([]);

    const [addItemModalVisible, setAddItemModalVisibility] = useState(false);

    const [selectedItem, setSelectedItem] = useState('');
    const [editItemModalVisible, setEditItemModalVisibility] = useState(false);

    // UseEffects
    useEffect(() => { filterByCategory(selectedCat); }, [allItemData])
    useEffect(() => { fetchAllCategories(); }, [])

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

    const fetchAllCategories = async () => {
        try {
            const res = await getAllMenuCategoriesAPI();
            if (res?.data && res?.data?.data) {
                const list = res?.data?.data.map((data) => {
                    return ({ key: data?._id, value: data?.name })
                })
                setAllCategory(list);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const onEditPress = (data) => {
        setSelectedItem(data);
        setEditItemModalVisibility(true);
    }

    const onAddItemPress = () => setAddItemModalVisibility(true);

    return {
        restId,
        navigation,
        categories,
        allCategory,

        data,
        search,
        selectedCat,
        selectedItem,
        addItemModalVisible, setAddItemModalVisibility,
        editItemModalVisible, setEditItemModalVisibility,

        onAddItemPress,
        filterByCategory,
        onSearching,
        onEditPress,
    };
}

export default useScreenHooks