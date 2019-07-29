import React from 'react'
import {waitQuery} from '../../../config'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Card  from '@material-ui/core/Card';
import CardContent  from '@material-ui/core/CardContent';
import Typography  from '@material-ui/core/Typography';

const List = props => {
    let result = waitQuery(props.listQueue)
    result = result.listQueue || false
    result = props.newQueues.data ? props.newQueues.data.newQueues : result

    if(!result) return('Loading...')
    if(result.length == 0)
        return(
            <TableBody>
                <TableRow style={{color:'#fff'}}>
                    <TableCell align="center" colSpan={2} style={{fontSize:20}}>Belum ada data.</TableCell>
                </TableRow>
            </TableBody>
        )

    return result.slice(0,3).map((data,index) => {
        let no = index +1
        let color

        if(no == 1){
            color = '#43a047'
        }else if(no == 2){
            color = '#ffb300'
        }else{
            color = '#c62828'
        }

        return(
            <TableBody>
                <TableRow style={{color:'#fff'}}>
                    <TableCell align="center" style={{color:color,fontSize:20,fontWeight:'bold'}}>{no}</TableCell>
                    <TableCell align="center" style={{color:color,fontSize:20,fontWeight:'bold'}}>{data.number}</TableCell>
                </TableRow>
            </TableBody>
        )
    })
    
}

const Board = (props) => {
    return(
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh', backgroundColor:'#3f51b5' }}
        >
            <Grid item md={9}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h4" align="center"component="h1">
                            Daftar Antrian
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableCell style={{fontSize:25}}> No </TableCell>
                                <TableCell style={{fontSize:25}}> Nomor Antrian </TableCell>
                            </TableHead>
                            <List {...props}/> 
                        </Table>
                    </CardContent>
                </Card>
            </Grid>    
        </Grid>
    )
}

export default Board