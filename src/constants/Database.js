import firestore from '@react-native-firebase/firestore';

export const RestaurantDBPath = firestore().collection("Users").doc("Restaurant").collection("Restaurant");
export const InvoiceDBPath = firestore().collection("Invoices");
export const CategoryDBPath = firestore().collection("FoodCategory");

export const RestaurantDBFields = {
    address: 'address',
    city: 'city',
    closeTime: 'closeTime',
    contactNo: 'contactNo',
    coordinates: 'coordinates',
    createdAt: 'createdAt',
    email: 'email',
    endDate: 'endDate',
    isActive: 'isActive',
    openTime: 'openTime',
    ownerName: 'ownerName',
    password: 'password',
    pincode: 'pincode',
    rate: 'rate',
    restId: 'restId',
    restImage: 'restImage',
    restaurantName: 'restaurantName',
    reviews: 'reviews',
    startDate: 'startDate',
    state: 'state',
    tables: 'tables',
    Images: {
        addedAt: 'addedAt',
        imgUr1: 'imgUr1',
    },
    Menu: {
        addedAt: 'addedAt',
        category: 'category',
        itemName: 'itemName',
        price: 'price',
    }
}

export const CategoryDBFields = {
    catName: 'catName',
    fontColor: 'fontColor',
    menuCardImg: 'menuCardImg',
}