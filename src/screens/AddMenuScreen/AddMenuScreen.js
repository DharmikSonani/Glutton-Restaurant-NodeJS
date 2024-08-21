import React from 'react'
import useScreenHooks from './AddMenuScreen.Hooks';
import ScreenHeader from '../../components/ScreenHeader';
import SearchView from '../../components/SearchView';
import DataFilter from '../../components/DataFilter';
import { FlatList, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors';
import { MenuDataTableHeader } from '../../constants/Helper';
import MenuTableRow from '../../components/MenuTableRow';
import Entypo from 'react-native-vector-icons/Entypo';
import AddNewItemModal from '../../components/modal/AddNewItemModal';
import EditItemModal from '../../components/modal/EditItemModal';

const AddMenuScreen = (props) => {

    const {
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

    } = useScreenHooks(props);

    const ListEmptyComponent = () => {
        return <Text style={styles.EmptyText}>
            Item Not Found
        </Text>
    }

    return (
        <ScreenHeader
            navigation={navigation}
            title={'Menu'}
            onRightPress={onAddItemPress}
            rightButtonIcon={<Entypo name='add-to-list' size={25} color={COLOR.BLACK} />}
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

            <View style={styles.HeaderContainer}>
                {
                    MenuDataTableHeader.map((item, i) =>
                        <LinearGradient
                            colors={GRADIENTCOLOR.ORANGE}
                            style={[styles.HeaderGradient, { width: item.width, }]}
                            angle={160}
                            useAngle
                            key={i}
                        >
                            <Text style={[styles.HeaderTextStyle]} numberOfLines={1}>{item.title}</Text>
                        </LinearGradient>
                    )
                }
            </View>

            <FlatList
                data={data}
                renderItem={({ item, index }) =>
                    <MenuTableRow
                        index={index + 1}
                        data={item}
                        onEditPress={onEditPress}
                    />
                }
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                style={styles.Container}
                contentContainerStyle={styles.ContentContainer}
                ListEmptyComponent={ListEmptyComponent}
            />

            {
                addItemModalVisible &&
                <AddNewItemModal
                    restId={restId}
                    modalVisible={addItemModalVisible}
                    setModalVisible={setAddItemModalVisibility}
                    categories={allCategory}
                />
            }

            {
                selectedItem && editItemModalVisible &&
                <EditItemModal
                    restId={restId}
                    data={selectedItem}
                    modalVisible={editItemModalVisible}
                    setModalVisible={setEditItemModalVisibility}
                />
            }
        </ScreenHeader>
    )
}

export default AddMenuScreen