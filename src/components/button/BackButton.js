import { StyleSheet, TouchableOpacity, } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import { COLOR } from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';

const BackButton = ({ navigation, isDashboard }) => {
    return (
        <TouchableOpacity
            onPress={() => isDashboard ? navigation.openDrawer() : navigation.pop(1)}
            style={styles.Button}
        >
            {
                isDashboard ?
                    <Feather name="bar-chart-2" size={30} color={COLOR.BLACK} style={styles.Icon} />
                    :
                    <Entypo name="chevron-left" size={34} color={COLOR.BLACK} />
            }
        </TouchableOpacity>
    )
}

export default BackButton

const styles = StyleSheet.create({
    Button: {
        marginLeft: 18,
        height: '100%',
        justifyContent: 'center',
    },
    Icon: {
        transform: [
            {
                rotate: '90deg',
            },
            {
                rotateY: '180deg',
            }
        ],
    },
})