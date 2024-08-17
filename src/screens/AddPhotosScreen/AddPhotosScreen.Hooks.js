import { useSelector } from 'react-redux';
import { Reducers } from '../../constants/Strings';
import { RestaurantDBPath } from '../../constants/Database';
import storage from '@react-native-firebase/storage';
import { NormalSnackBar } from '../../constants/SnackBars';
import { useState } from 'react';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const restId = useSelector(state => state[Reducers.AuthReducer]);
    const data = useSelector(state => state[Reducers.PhotosDataReducer]);
    const RestImagePath = RestaurantDBPath.doc(restId).collection('Images');

    // UseStates
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);

    // UseEffects


    // Methods
    const deleteFirestoreData = (imgId) => {
        RestImagePath
            .doc(imgId)
            .delete()
            .then(() => { })
            .catch((e) => {
                console.log("Error Deleting Photo ," + e)
                NormalSnackBar("Something wents wrong.")
            })
    }

    const onRemovePress = (data) => {
        try {
            if (data.imgUrl) {
                const storageRef = storage().refFromURL(data.imgUrl)
                const imageRef = storage().ref(storageRef.fullPath)
                imageRef
                    .delete()
                    .then(() => {
                        console.log(`${data.imgId} is Deleted....`)
                    })
                    .catch((e) => {
                        console.log("Error While Deleting Image " + e)
                        NormalSnackBar("Something wents wrong.")
                    })
            }
            deleteFirestoreData(data.imgId);
            NormalSnackBar("Image Removed.")
        } catch (error) {
            console.log(error);
            NormalSnackBar("Something wents wrong.")
        }
    }

    const onAddPress = () => {
        setIsImageModalVisible(true);
    }

    const onImageAdded = () => {
        NormalSnackBar("Image Uploaded.");
    }

    return {
        restId,
        navigation,
        data,

        isImageModalVisible, setIsImageModalVisible,

        onAddPress,
        onImageAdded,
        onRemovePress,
    };
}

export default useScreenHooks