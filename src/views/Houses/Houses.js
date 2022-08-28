import { useEffect, useState, useTransition } from 'react';
import { getHouses } from './../../api/endpoints';
import HouseList from './components/HouseList/HouseList';
import Spinner from './../../components/Spinner/Spinner' ; 
import './style.scss';

const Houses = () => {
    const [houses, setHouses] = useState([]);

    const [isPending, startTransition] = useTransition();

    const getHousesHandle = async () => {
        startTransition(async() => {
            let result = await getHouses();
            console.log(result);
            let fetchHouses = [];
            for (let key in result.data) {
                fetchHouses.push({
                    ...result.data[key],
                    id: key

                })
            }
            setHouses(fetchHouses);
        })
    }
    useEffect(() => {
        getHousesHandle();
    } ,[]);
    return (
        <div className='houses-container' >
            <p className='list-text-style'>List of houses</p>
            <div className='houses-list-container' >
                {isPending ? <Spinner/> : <HouseList houses = {houses}  />}
            </div>
        </div>
    )
}

export default Houses; 