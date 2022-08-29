import { useEffect, useState, useTransition } from 'react';
import { getHouseInfo } from './../../api/endpoints';
import CustomLoadingMask from './../../components/CustomLoading/CustomLoadingMask';
import HouseList from './components/HouseList/HouseList';
import './style.scss';

const Houses = () => {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(false);

    const getHousesHandle = async () => {
        let url = 'https://www.anapioficeandfire.com/api/houses';
        setLoading(true) ; 
        let result = await getHouseInfo({ url: url });
        let fetchHouses = [];
        for (let key in result.data) {
            fetchHouses.push({
                ...result.data[key],
                id: key

            })
        }
        setHouses(fetchHouses);
        setLoading(false) ; 
    }
    useEffect(() => {
        getHousesHandle();
    }, []);
    return (
        <div className='houses-container' >
            <p className='list-text-style'>List of houses</p>
            <div className='houses-list-container' >
                {loading ? (<CustomLoadingMask type="spinningBubbles" color="#F10917" />) : <HouseList houses={houses} />}
            </div>
        </div>
    )
}

export default Houses; 