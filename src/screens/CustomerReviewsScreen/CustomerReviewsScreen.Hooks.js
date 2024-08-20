import { useSelector } from 'react-redux';
import { Reducers } from '../../constants/Strings';
import { useEffect, useState } from 'react';
import { RatingFilter } from '../../constants/Helper';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const allData = useSelector(state => state[Reducers.ReviewDataReducer]);

    // UseStates
    const [data, setData] = useState([]);
    const [star, setStar] = useState(RatingFilter[0]);

    // UseEffects
    useEffect(() => {
        filterByStars(star);
    }, [allData])

    // Methods
    const filterByStars = (star) => {
        setStar(star);
        if (star == "All") {
            setData(allData);
        } else {
            setData(allData.filter((i) => i['rating'] == star))
        }
    }

    return {
        navigation,

        data,
        star,

        filterByStars,
    };
}

export default useScreenHooks