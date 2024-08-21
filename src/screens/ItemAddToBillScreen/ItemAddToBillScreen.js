import {
    FlatList,
    TouchableOpacity,
    Text
} from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors';
import useScreenHooks from './ItemAddToBillScreen.Hooks';
import ScreenHeader from '../../components/ScreenHeader';
import SearchView from '../../components/SearchView';
import DataFilter from '../../components/DataFilter';
import { styles } from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AddItemToOrderModal from '../../components/modal/AddItemToOrderModal';

const ItemAddToBillScreen = (props) => {

    const {
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

    } = useScreenHooks(props);

    return (
        <ScreenHeader
            navigation={navigation}
            title={`Table No. ${tableNo}`}
            onRightPress={onViewOrderPress}
            rightButtonIcon={<FontAwesome5 name={'file-invoice'} size={25} color={COLOR.BLACK} />}
        >
            <SearchView
                value={search}
                onChangeText={onSearching}
                placeholder={'Search Item'}
                style={{ marginTop: 55 }}
            />

            <DataFilter
                data={categories}
                seleted={selectedCat}
                setSelected={filterByCategory}
                style={{ marginVertical: 10, }}
            />

            <FlatList
                data={data}
                keyExtractor={item => item._id}
                numColumns={2}
                bounces={false}
                showsVerticalScrollIndicator={false}
                style={styles.Container}
                contentContainerStyle={styles.ContentContainer}
                renderItem={({ item }) =>
                    <TouchableOpacity
                        style={[styles.ItemCard, { width: cardWidth }]}
                        onPress={() => { onItemPress(item) }}
                    >
                        <Text style={styles.ItemNameText} numberOfLines={1}>{item?.name?.trim()}</Text>
                        <Text style={styles.ItemCategoryText} numberOfLines={1}>{item?.category?.name?.trim()}</Text>
                    </TouchableOpacity>
                }
                ListEmptyComponent={
                    <Text style={styles.ListEmptyText}>
                        Item Not Found
                    </Text>
                }
            />
            {
                isSelectedItemModalVisible &&
                <AddItemToOrderModal
                    modalVisible={isSelectedItemModalVisible}
                    setModalVisible={setIsSelectedItemModalVisible}
                    data={selectedItem}
                    invoiceId={invoiceId}
                    onComplete={onItemAdded}
                />
            }
        </ScreenHeader>
    )
}

export default ItemAddToBillScreen