import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CustomTooltip from './../../../../components/CustomTooltip/CustomTooltip';
import { details } from './../../../../routes/Path';

const HouseList = (props) => {
    let navigate = useNavigate();
    const getHouseDetailHandle = async (url) => {
        navigate(details, { state: { houseDetailUrl: url } });
    }
    return (
        <TableContainer component={Paper} sx={{ width: '99%', height: '99%', margin: 'auto', overflow: 'scroll' }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ minWidth: 200 }} align="left">name</TableCell>
                        <TableCell align="left">region</TableCell>
                        <TableCell align="left">titles</TableCell>
                        <TableCell align="left">founded</TableCell>
                        <TableCell align="left">coat Of Arms</TableCell>
                        <TableCell align="left">Detail</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.houses.map((row) => (
                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell component="th" scope="row" align="left"  >{row.name} </TableCell>
                            <TableCell align="left">{row.region ? row.region : "-"}</TableCell>
                            <TableCell align="left">
                                <ul>
                                    {(row.titles.length > 0 && row.titles[0] !== "") && row.titles.map((value, index) => {
                                        return (
                                            <li key = {index}>{value}</li>
                                        )
                                    })}
                                </ul>
                                </TableCell>
                            <TableCell align="left">{row.founded ? row.founded : '-'}</TableCell>
                            <TableCell align="left">{row.coatOfArms ? row.coatOfArms : "-"}</TableCell>
                            <TableCell align="left">
                                <CustomTooltip tooltipText="detail" >
                                    <IconButton onClick={() => getHouseDetailHandle(row.url)} size="large" aria-label="show 4 new mails" color="inherit">
                                        <SearchIcon sx={{ color: 'red' }} />
                                    </IconButton>
                                </CustomTooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default HouseList;





