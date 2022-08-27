import { useEffect } from 'react';
import { getHouses } from './../../api/endpoints';

const Home = () => {

    const getHousesHandle = async () => {
        let result = await getHouses();
        console.log(result);
    }

    useEffect(() => {
        getHousesHandle();
    });
    return (
        <>Home</>
    )
}


export default Home; 