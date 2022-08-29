import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getHouseInfo } from './../../api/endpoints';
import axios from 'axios';
import CustomLoadingMask from './../../components/CustomLoading/CustomLoadingMask'; 
import TextContainer from './../../components/TextContainer/TextContainer';
import CustomAccordion from './../../components/CustomAccordion/CustomAccordion';
import './style.scss';

const Details = () => {
    const [houseDetail, sethouseDetail] = useState();
    const [overlord, setOverlord] = useState("");
    const [founder, setFounder] = useState("");
    const [heir, setHeir] = useState("");
    const [currentLord, setCurrentLord] = useState("") ; 
    const [titles, setTitles] = useState([]);
    const [seats, setSeats] = useState([]);
    const [members, setmembers] = useState([]);
    const [loading, setLoading] = useState(false);

    const location = useLocation();

    const getHouseDetailHandle = useCallback(async () => {
        setLoading(true);

        var result = await getHouseInfo({ url: location.state.houseDetailUrl });
        sethouseDetail(result.data);
        setTitles(result.data.titles);
        setSeats(result.data.seats);

        if (result.data.swornMembers[0] !== "" || result.data.swornMembers.length > 0) {
            getMembersHandler(result.data.swornMembers);
        }
        if (result.data.founder !== "") {
            getFounderHandle(result.data.founder);
        }
        if (result.data.overlord !== "") {
            getOverlordHandle(result.data.overlord);
        }
        if (result.data.heir !== "") {
            getHeirHandle(result.data.heir);
        }
        if (result.data.currentLord !== "") {
            getCurrentLordHandle(result.data.currentLord) ; 
        }

        setLoading(false);
    }, [location.state.houseDetailUrl])
    const getFounderHandle = async (url) => {
        var result = await getHouseInfo({ url: url });
        setFounder(result.data.name)
    }
    const getOverlordHandle = async (url) => {
        var result = await getHouseInfo({ url: url });
        setOverlord(result.data.name)
    }
    const getHeirHandle = async (url) => {
        var result = await getHouseInfo({ url: url });
        setHeir(result.data.name)
    }
    const getCurrentLordHandle = async (url) => {
        var result = await getHouseInfo({ url: url });
        setCurrentLord(result.data.name)
    }
    const getMembersHandler = (endpoints) => {
        setLoading(true);
        function getAllData(endpoints) {
            return Promise.all(endpoints.map(fetchData));
        }
        function fetchData(URL) {
            return axios
                .get(URL)
                .then(function (response) {
                    return {
                        success: true,
                        data: response.data
                    };
                })
                .catch(function (error) {
                    return { success: false };
                });
        }
        getAllData(endpoints).then(resp => {
            let fetchMembers = [];
            for (let key in resp) {
                fetchMembers.push(resp[key].data.name)
            }
            setmembers(fetchMembers);
            setLoading(false);
        }).catch(e => { console.log(e) })
    }

    useEffect(() => {
        getHouseDetailHandle();
    }, []);

    return (
        <>
            <div className='detail-container'>
                <p className='header-text-style'>Details of :  {houseDetail?.name} </p>
                {loading && (<CustomLoadingMask type="spinningBubbles" color="#F10917" />)}
                <div className='detail-card-container' >
                    <div className='list-of-details'>

                        <TextContainer title="coat Of Arms" response={houseDetail?.coatOfArms} />
                        <TextContainer title="diedOut" response={houseDetail?.diedOut} />
                        <TextContainer title="founder" response={founder} />
                        <TextContainer title="founded" response={houseDetail?.founded} />
                        <TextContainer title="overlord" response={overlord} />
                        <TextContainer title="currentLord" response={currentLord} />
                        <TextContainer title="words" response={houseDetail?.words} />
                        <TextContainer title="region" response={houseDetail?.region} />
                        <TextContainer title="heir" response={heir} />

                        <CustomAccordion title="titles : " disabled={titles.length === 0 || titles[0] === ""} >
                            <ul>
                                {(titles.length > 0 && titles[0] !== "") && titles.map((value, index) => {
                                    return (
                                        <li key={index}>{value}</li>
                                    )
                                })}
                            </ul>
                        </CustomAccordion>

                        <CustomAccordion title="seats : " disabled={seats.length < 0 || seats[0] === ""} >
                            <ul>
                                {(seats.length > 0 && seats[0] !== "") && seats.map((value, index) => {
                                    return (
                                        <li key={index}>{value}</li>
                                    )
                                })}
                            </ul>
                        </CustomAccordion>

                        <CustomAccordion title="swornMembers:" disabled={members.length === 0} >
                            {members.length > 0
                                && <>
                                    <ul>
                                        {(members.length > 0 && members[0] !== "") && members.map((value, index) => {
                                            return (
                                                <li key={index}>{value}</li>
                                            )
                                        })}
                                    </ul>
                                </>
                            }
                        </CustomAccordion>
                    </div>
                    {/* <img src={GOTMap} alt="GOTMap" /> */}
                </div>
            </div>
        </>
    )
}

export default Details; 