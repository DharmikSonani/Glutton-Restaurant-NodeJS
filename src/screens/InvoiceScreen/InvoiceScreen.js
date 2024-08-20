import {
    View,
    ActivityIndicator,
    ScrollView,
    Text,
} from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors';
import useScreenHooks from './InvoiceScreen.Hooks';
import ScreenHeader from '../../components/ScreenHeader';
import { styles } from './styles';
import Invoice from '../../components/Invoice/Invoice';

const InvoiceScreen = (props) => {

    const {
        navigation,
        invoiceId,

        data,
        loading,
    } = useScreenHooks(props);

    return (
        <ScreenHeader
            navigation={navigation}
            title={'Invoice'}
        >
            {
                loading ?
                    <View style={styles.Container}>
                        <ActivityIndicator color={COLOR.BLACK} />
                    </View>
                    :
                    data?.isGenerated == true ?
                        <ScrollView
                            contentContainerStyle={styles.ContentContainer}
                            showsVerticalScrollIndicator={false}
                        >
                            <Invoice
                                invoiceId={invoiceId}
                                items={data?.items}
                                restData={data?.restaurant}
                                bookingData={data?.booking}
                                custData={data?.customer}
                                total={data?.total}
                            />
                        </ScrollView>
                        :
                        <View style={styles.Container}>
                            <Text style={styles.EmptyText}>Invoice Not Found.</Text>
                        </View>
            }
        </ScreenHeader>
    )
}

export default InvoiceScreen