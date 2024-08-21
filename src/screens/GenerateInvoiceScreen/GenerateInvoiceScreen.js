import {
    View,
    Text,
    FlatList,
    ActivityIndicator
} from 'react-native'
import React from 'react'
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors';
import useScreenHooks from './GenerateInvoiceScreen.Hooks';
import ScreenHeader from '../../components/ScreenHeader';
import { styles } from './styles';
import FieldValuePairLabel from '../../components/labels/FieldValuePairLabel';
import { ItemTableFieldWidth } from '../../constants/Helper';
import ItemTableRow from '../../components/Invoice/ItemTableRow';
import CustomButton from '../../components/button/CustomButton';

const GenerateInvoiceScreen = (props) => {

    const {
        navigation,
        invoiceId,
        tableNo,
        items,
        loading,

        onGenerateInvoicePress,

    } = useScreenHooks(props);

    const HeaderComponent = () => {
        return (
            <>
                <View style={styles.HeaderComponentMainContainer}>
                    <FieldValuePairLabel
                        field={'Invoice ID'}
                        value={invoiceId}
                        fontSize={14}
                    />
                    <FieldValuePairLabel
                        field={'Table No.'}
                        value={tableNo}
                        fontSize={14}
                        style={{ marginBottom: 0 }}
                    />
                </View>
                <View style={styles.TableHeaderContainer}>
                    <Text style={[styles.TableFieldHeaderText, { width: ItemTableFieldWidth[0] }]}>Sr.</Text>
                    <Text style={[styles.TableFieldHeaderText, { width: ItemTableFieldWidth[1], textAlign: 'left', }]}>Item Description</Text>
                    <Text style={[styles.TableFieldHeaderText, { width: ItemTableFieldWidth[2] }]}>Price</Text>
                    <Text style={[styles.TableFieldHeaderText, { width: ItemTableFieldWidth[3] }]}>Qty</Text>
                    <Text style={[styles.TableFieldHeaderText, { width: ItemTableFieldWidth[4] }]}>Total</Text>
                </View>
            </>
        )
    }

    const ListEmptyComponent = () => {
        return (
            <View style={styles.ListEmptyContainer}>
                {loading && <ActivityIndicator size={'small'} color={COLOR.BLACK} />}
            </View>
        )
    }

    const ListFooterComponent = () => {
        return (
            <>
                {
                    !loading && items.length > 0 &&
                    <CustomButton
                        onPress={onGenerateInvoicePress}
                        colors={GRADIENTCOLOR.ORANGE}
                        text={'Generate Invoice'}
                    />
                }
            </>
        )
    }


    return (
        <ScreenHeader
            navigation={navigation}
            title={'Ordered Items'}
        >
            <FlatList
                data={items}
                keyExtractor={item => item._id}
                renderItem={({ item, index }) => <ItemTableRow sr={index + 1} data={item} />}
                contentContainerStyle={styles.Container}
                bounces={false}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={ListEmptyComponent}
                ListHeaderComponent={HeaderComponent}
                ListFooterComponent={ListFooterComponent}
            />
        </ScreenHeader>
    )
}

export default GenerateInvoiceScreen