import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { format } from 'date-fns';
import moment from 'moment';
import { InvoiceHeaderImage } from '../../constants/Assets';
import { COLOR } from '../../constants/Colors';
import FastImage from 'react-native-fast-image';
import { ItemTableFieldWidth } from '../../constants/Helper';
import ItemTableRow from './ItemTableRow';

const Invoice = ({
    invoiceId,
    restData,
    items,
    bookingData,
    custData,
    total,
}) => {

    const restName = restData?.name;

    return (
        <View style={styles.Container}>
            <View style={styles.InvoiceHeaderContainer}>
                <FastImage
                    source={InvoiceHeaderImage}
                    style={styles.InvoiceImage}
                    resizeMode='stretch'
                />

                <Text style={styles.InvoiceTextStyle}>Invoice</Text>

                <View style={styles.RestDataContainer}>
                    <Text style={styles.RestNameTextStyle} numberOfLines={1}>{restName}</Text>
                    {bookingData?.date && <Text style={styles.DateTimeTextStyle}>Date : {format(new Date(bookingData.date), 'dd MMMM, yyyy')}</Text>}
                    {bookingData?.time && <Text style={styles.DateTimeTextStyle}>Time : {moment(bookingData.time, ['hh:mm']).format('hh:mm A')}</Text>}
                </View>

                <View style={styles.CustDataContainer}>
                    <Text style={styles.CustDataText}>
                        Invoice to :
                        <Text style={styles.CustDataValues}>{`    ${custData?.name}\n +91 ${custData?.contact}`}</Text>
                    </Text>
                    <Text style={styles.CustDataText}>
                        ID :
                        <Text style={styles.CustDataValues}>{` ${invoiceId}`}</Text>
                    </Text>
                    <Text style={styles.CustDataText}>
                        Table No :
                        <Text style={styles.CustDataValues}>{` ${restData?.tableNo}`}</Text>
                    </Text>
                </View>

            </View>

            <View style={{
                paddingHorizontal: 10,
            }}>
                <View style={styles.TableHeaderContainer}>
                    <Text style={[styles.TableFieldHeaderText, { width: ItemTableFieldWidth[0] }]}>Sr.</Text>
                    <Text style={[styles.TableFieldHeaderText, { width: ItemTableFieldWidth[1], textAlign: 'left', }]}>Item Description</Text>
                    <Text style={[styles.TableFieldHeaderText, { width: ItemTableFieldWidth[2] }]}>Price</Text>
                    <Text style={[styles.TableFieldHeaderText, { width: ItemTableFieldWidth[3] }]}>Qty</Text>
                    <Text style={[styles.TableFieldHeaderText, { width: ItemTableFieldWidth[4] }]}>Total</Text>
                </View>

                {items.map((item, i) => <ItemTableRow sr={i + 1} data={item} key={i} />)}

            </View>

            <View style={styles.BillAmountContainer}>
                <View style={styles.TotalContainer}>
                    <Text style={styles.TotalText}>Total : </Text>
                    <Text style={[styles.TotalText, styles.TotalValue]}>
                        ₹ {parseFloat(total).toFixed(2).toString()}
                    </Text>
                </View>

                <View style={[styles.TotalContainer, { marginTop: 5, }]}>
                    <Text style={styles.TotalText}>Discount {bookingData?.discount}% : </Text>
                    <Text style={[styles.TotalText, styles.TotalValue]}>
                        ₹ {parseFloat((total / 100) * bookingData?.discount).toFixed(2).toString()}
                    </Text>
                </View>

                <View style={[styles.TotalContainer, styles.FinalAmountContainer]}>
                    <Text style={styles.FinalAmountText}>Final Amount : </Text>
                    <Text style={[styles.FinalAmountText, styles.TotalValue]}>
                        ₹ {parseFloat((total) - ((total / 100) * bookingData?.discount)).toFixed(2).toString()}
                    </Text>
                </View>
            </View>

            <Text style={styles.FooterText} numberOfLines={2}>Contact : +91 {restData?.contact} | {restData?.email}</Text>

        </View>
    )
}

export default Invoice

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        backgroundColor: COLOR.WHITE,
        elevation: 5,
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    InvoiceHeaderContainer: {
        width: '100%',
        aspectRatio: 1 / 0.7,
    },
    InvoiceImage: {
        position: 'absolute',
        zIndex: -1,
        width: '100%',
        height: '100%',
    },
    InvoiceTextStyle: {
        color: COLOR.RATING,
        fontSize: 12,
        position: 'absolute',
        right: 20,
        top: 10,
        textTransform: 'uppercase',
    },
    RestDataContainer: {
        marginHorizontal: 20,
        justifyContent: 'center',
        height: '55%',
    },
    RestNameTextStyle: {
        color: COLOR.RATING,
        fontSize: 20,
        marginBottom: 3,
        textTransform: 'uppercase',
        fontWeight: '600',
        maxWidth: '90%',
    },
    DateTimeTextStyle: {
        color: COLOR.RATING,
        fontSize: 13,
        marginTop: 3,
        textTransform: 'uppercase',
        fontWeight: '400',
    },
    CustDataContainer: {
        alignItems: 'flex-end',
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'center',
    },
    CustDataText: {
        color: COLOR.BLACK,
        fontSize: 12,
        textAlign: 'right',
        marginTop: 5,
    },
    CustDataValues: {
        color: COLOR.GRAY,
    },
    TableHeaderContainer: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: COLOR.BLACK,
        paddingVertical: 5,
        borderRadius: 10,
    },
    TableFieldHeaderText: {
        textAlign: 'center',
        color: COLOR.WHITE,
        padding: 5,
        fontSize: 13,
    },
    BillAmountContainer: {
        width: '70%',
        paddingRight: 10,
        marginTop: 20,
        alignSelf: 'flex-end',
    },
    TotalContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    TotalText: {
        color: COLOR.BLACK,
        fontSize: 12,
    },
    TotalValue: {
        flex: 1,
        textAlign: 'right',
    },
    FinalAmountContainer: {
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        marginTop: 7,
        borderRadius: 5,
        paddingVertical: 5,
        backgroundColor: COLOR.BORDERCOLOR,
        width: '100%',
    },
    FinalAmountText: {
        color: COLOR.BLACK,
        fontSize: 13,
    },
    FooterText: {
        color: COLOR.WHITE,
        fontSize: 10,
        width: '100%',
        backgroundColor: COLOR.BLACK,
        padding: 7,
        alignItems: 'center',
        marginTop: 15,
        textAlign: 'center',
    }
})