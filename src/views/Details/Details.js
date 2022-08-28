import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getHouseDetail } from './../../api/endpoints';
import Spinner from './../../components/Spinner/Spinner';
import axios from 'axios';
import GOTMap from './../../assets/Images/GOT-Map.jpg';
import TextContainer from './../../components/TextContainer/TextContainer';
import CustomAccordion from './../../components/CustomAccordion/CustomAccordion';
import './style.scss';

const Details = () => {
    const [houseDetail, sethouseDetail] = useState();
    const [overlord, setOverlord] = useState("");
    const [founder, setFounder] = useState("");
    const [titles, setTitles] = useState([]);
    const [seats, setSeats] = useState([]);
    const [members, setmembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();


    const getHouseDetailHandle = useCallback(async () => {
        setLoading(true);
        var result = await getHouseDetail({ url: location.state.houseDetailUrl });
        sethouseDetail(result.data);
        setTitles(result.data.titles);
        setSeats(result.data.seats);
        setFounder(result.data.founder);
        setOverlord(result.data.overlord);

        if (result.data.swornMembers[0] !== "" || result.data.swornMembers.length > 0) {
            getMembersHandler(result.data.swornMembers);
        }

        let endpoints = [];
        let keys = [];
        if (result.data.founder !== "") {
            endpoints.push(result.data.founder)
            keys.push("founder");
        }
        if (result.data.overlord !== "") {
            endpoints.push(result.data.overlord)
            keys.push("overlord");
        }
        if (result.data.heir !== "") {
            endpoints.push(result.data.heir);
            keys.push("heir");
        }
        if (result.data.currentLord !== "") {
            endpoints.push(result.data.currentLord);
            keys.push("currentLord");
        }

        console.log("endpoints", endpoints)
        console.log("keys", keys)

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
            let newObj = {};
            for (let key in resp) {
                console.log(keys[key])
                console.log(resp[key])
                newObj[keys[key]] = resp[key] ;
            }
            console.log('newObj ', newObj)

        }).catch(e => { console.log(e) })






        setLoading(false);
    }, [location.state.houseDetailUrl])


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
                {loading && <Spinner />}
                <div className='detail-card-container' >
                    <div className='list-of-details'>

                        <TextContainer title="coat Of Arms" response={houseDetail?.coatOfArms} />
                        <TextContainer title="diedOut" response={houseDetail?.diedOut} />
                        <TextContainer title="founded" response={houseDetail?.founded} />
                        <TextContainer title="words" response={houseDetail?.words} />
                        <TextContainer title="region" response={houseDetail?.region} />

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

                        <CustomAccordion title="founder:"  >
                            <p>send api</p>
                        </CustomAccordion>

                        <CustomAccordion title="heir:"  >
                            <p>send api</p>
                        </CustomAccordion>

                        <CustomAccordion title="currentLord:"  >
                            <p>send api</p>
                        </CustomAccordion>

                        <CustomAccordion title="overlord:"  >
                            <p>send api</p>
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