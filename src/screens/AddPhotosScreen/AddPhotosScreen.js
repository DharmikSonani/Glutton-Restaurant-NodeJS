import {
    FlatList,
} from 'react-native'
import React from 'react'
import useScreenHooks from './AddPhotosScreen.Hooks';
import ScreenHeader from '../../components/ScreenHeader';
import PhotoCard from '../../components/PhotoCard';
import { styles } from './styles';
import PhotoSelectionModal from '../../components/modal/PhotoSelectionModal';

const AddPhotosScreen = (props) => {

    const {
        restId,
        navigation,
        data,

        isImageModalVisible, setIsImageModalVisible,

        onAddPress,
        onImageAdded,
        onRemovePress,

    } = useScreenHooks(props);

    return (
        <ScreenHeader
            navigation={navigation}
            title={'Photos'}
        >
            <FlatList
                data={data}
                renderItem={({ item }) =>
                    <PhotoCard
                        data={item}
                        onAddPress={onAddPress}
                        onRemovePress={onRemovePress}
                        numOfColumns={2}
                    />
                }
                numColumns={2}
                keyExtractor={item => item}
                style={styles.Container}
                contentContainerStyle={styles.ContentContainer}
                showsVerticalScrollIndicator={false}
            />

            {
                isImageModalVisible &&
                <PhotoSelectionModal
                    restId={restId}
                    modalVisible={isImageModalVisible}
                    setModalVisible={setIsImageModalVisible}
                    onSuccess={onImageAdded}
                />
            }
        </ScreenHeader>
    )
}

export default AddPhotosScreen