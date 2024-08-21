import { useDispatch, useSelector } from 'react-redux';
import { Reducers } from '../../constants/Strings';
import storage from '@react-native-firebase/storage';
import { NormalSnackBar } from '../../constants/SnackBars';
import { useEffect, useState } from 'react';
import { getRestaurantPhotosAPI, removePhotoAPI } from '../../api/utils';
import { setPhotosDataInRedux } from '../../redux/PhotosData/PhotosDataAction';
import { useIsFocused } from '@react-navigation/native';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const restId = useSelector(state => state[Reducers.AuthReducer]);
    const data = useSelector(state => state[Reducers.PhotosDataReducer]);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    // UseStates
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);

    // UseEffects
    useEffect(() => {
        isFocused && data?.length <= 0 && fetchPhotos();
    }, [isFocused])

    // Methods
    const deleteData = async (image) => {
        try {
            const res = await removePhotoAPI(restId, { img: image });
            if (res?.data && res?.data?.data) {
                NormalSnackBar("Image Removed.");
                dispatch(setPhotosDataInRedux([0, ...res?.data?.data?.images]));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onRemovePress = (data) => {
        try {
            if (data) {
                const storageRef = storage().refFromURL(data)
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
            deleteData(data);
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

    const fetchPhotos = async () => {
        try {
            const res = await getRestaurantPhotosAPI(restId);
            res?.data && res?.data?.data && dispatch(setPhotosDataInRedux([0, ...res?.data?.data?.images]));
        } catch (e) {
            console.log(e);
        }
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