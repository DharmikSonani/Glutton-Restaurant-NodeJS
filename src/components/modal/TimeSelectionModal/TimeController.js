import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLOR } from '../../../constants/Colors';

const TimeController = ({
    title,
    hour,
    setHour,
    minute,
    setMinute,
    ampm,
    setAmPm,
    data,
}) => {

    const onHourAdd = () => {
        if (hour < 12) {
            setHour(hour + 1);
        } else {
            setHour(1);
        }
    }

    const onHourMinus = () => {
        if (hour > 1) {
            setHour(hour - 1);
        } else {
            setHour(12);
        }
    }

    const onMinuteAdd = () => {
        if (minute == 0) {
            setMinute(30);
        } else {
            setMinute(0);
            if (hour < 12) {
                setHour(hour + 1);
            } else {
                setHour(1);
            }
        }
    }

    const onMinuteMinus = () => {
        if (minute == 30) {
            setMinute(0);
        } else {
            setMinute(30);
            if (hour > 1) {
                setHour(hour - 1);
            } else {
                setHour(12);
            }
        }
    }

    return (
        <View style={styles.Container}>
            <Text style={styles.TitleText}>{title}</Text>
            <View style={styles.ContentContainer}>

                {/* Hour */}
                <View style={styles.TimeContainer}>
                    <TouchableOpacity
                        onPress={onHourAdd}
                        style={styles.TimeButton}
                    >
                        <MaterialIcons name='keyboard-arrow-up' size={30} color={COLOR.BLACK} />
                    </TouchableOpacity>

                    <Text style={styles.TimeText}>{hour < 10 && 0}{hour}</Text>

                    <TouchableOpacity
                        onPress={onHourMinus}
                        style={styles.TimeButton}
                    >
                        <MaterialIcons name='keyboard-arrow-down' size={30} color={COLOR.BLACK} />
                    </TouchableOpacity>
                </View>

                {/* Colon */}
                <Text style={[styles.TimeText, { fontWeight: 'bold' }]}>:</Text>

                {/* Minute */}
                <View style={styles.TimeContainer}>
                    <TouchableOpacity
                        onPress={onMinuteAdd}
                        style={styles.TimeButton}
                    >
                        <MaterialIcons name='keyboard-arrow-up' size={30} color={COLOR.BLACK} />
                    </TouchableOpacity>

                    <Text style={styles.TimeText}>{minute < 10 && 0}{minute}</Text>

                    <TouchableOpacity
                        onPress={onMinuteMinus}
                        style={styles.TimeButton}
                    >
                        <MaterialIcons name='keyboard-arrow-down' size={30} color={COLOR.BLACK} />
                    </TouchableOpacity>
                </View>

                {/* Am Pm */}
                <View>
                    {
                        data.map((text, i) => {
                            return (
                                <TouchableOpacity style={[styles.AmPmButton, text === ampm && { backgroundColor: COLOR.BLACK, }]}
                                    onPress={() => { setAmPm(text) }}
                                    key={i}
                                >
                                    <Text style={[styles.AmPmText, text === ampm && { color: COLOR.WHITE, }]}>
                                        {text}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        </View>
    )
}

export default TimeController

const styles = StyleSheet.create({
    Container: {
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
        padding: 10,
        borderRadius: 15,
        marginBottom: 20,
    },
    TitleText: {
        color: COLOR.BLACK,
        fontSize: 15,
        margin: 10,
        padding: 10,
        backgroundColor: COLOR.BORDERCOLOR,
        borderRadius: 10,
        textAlign: 'center',
        overflow: 'hidden',
    },
    ContentContainer: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
    },
    TimeText: {
        color: COLOR.BLACK,
        fontSize: 30,
    },
    TimeContainer: {
        alignItems: 'center',
    },
    TimeButton: {
        padding: 5,
    },
    AmPmButton: {
        alignItems: 'center',
        backgroundColor: COLOR.WHITE,
        height: 30,
        width: 50,
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 5,
    },
    AmPmText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: COLOR.BLACK,
    },
})