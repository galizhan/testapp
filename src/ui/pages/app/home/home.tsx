import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loadusers} from "../../../../store/users";
import {RootState, useAppDispatch} from "../../../../store/configure-store";
import Header from "../../../components/header";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import {logout} from "../../../../store/auth";

interface Props{

}
function Home(props : Props) {
    const dispatch = useAppDispatch();
    const users = useSelector((state: RootState) => state.user.list);

    useEffect(() => {
        // @ts-ignore
        dispatch(loadusers(1));
    }, [dispatch]);

    return (
        <div>
            <Header user={users.data[0]} onLogout={()=>{
                // @ts-ignore
                dispatch(logout());
            }}/>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell align="right">First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.data.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.email}
                                </TableCell>
                                <TableCell align="right">{user.first_name}</TableCell>
                                <TableCell align="right">{user.last_name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[6, 12, 24]}
                component="div"
                count={users.total}
                rowsPerPage={users.per_page}
                page={users.page-1}
                onPageChange={(event, page)=>{

                    // @ts-ignore
                    dispatch(loadusers(page+1));
                }}
                onRowsPerPageChange={()=>{}}
            />
        </div>
    );
}

export default Home;
