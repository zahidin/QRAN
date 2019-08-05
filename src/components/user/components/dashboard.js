import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography  from '@material-ui/core/Typography';
import { waitQuery } from '../../../config';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Countdown from 'react-countdown-now';

const NumberQueue = ({router,setConfirmation,handleLogout,turn}) => {
    let number = localStorage.getItem('userInfo') ?  JSON.parse(localStorage.getItem('userInfo')).number : router.match.params.lastNumber
    
    if(!number)
        return(
            <Grid item md={9} style={{marginBottom:20}}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" align="center"component="h1">
                            Nomor Antrian Anda
                        </Typography>
                        <Typography gutterBottom variant="h3" align="center"component="h1">
                            Loading....
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    return(
        <Grid item md={9} style={{marginBottom:20}}>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" align="center"component="h1">
                        Nomor Antrian Anda
                    </Typography>
                    <Typography gutterBottom variant="h3" align="center"component="h1">
                        {number}
                    </Typography>
                </CardContent>
                <Box display="flex" justifyContent="center">
                    <Button variant="contained" onClick={() => setConfirmation(true)} color="primary" style={{height:60,width:'100%',fontSize:17,backgroundColor:'#d32f2f'}}>
                        {
                            turn && (
                                <Countdown
                                    onComplete={() => handleLogout()}
                                    date={Date.now() + 120000}
                                    renderer={({ hours, minutes, seconds, completed }) => {
                                        if(completed){
                                            return 'Anda sudah logout'
                                        }
                                        return <span>{hours}:{minutes}:{seconds}</span>;
                                    }}
                                />
                            )
                        }
                        &nbsp;Keluar
                    </Button>
                </Box>
            </Card>
        </Grid>
    )
}

const NumberDifference = props => {
    let difference = (props.difference && props.difference.difference) || false
    console.log("TCL: difference", props.difference)
    let counter = waitQuery(props.counter) || false
        counter = counter.counter || false
    let socketDifference = props.socketDifference.data ? props.socketDifference.data.newDifference : difference
    let socketOperator = props.socketCounter.data ? props.socketCounter.data.newCounter : counter
    
    let status = ''
    if(socketDifference && socketDifference.number === "0"){
        props.setTurn(false)
        status = 'Siap-siap giliran anda'
    }else if(parseInt(socketDifference.number) < 0){
        props.setTurn(true)
        status = 'Sekarang giliran anda'
    }else{
        props.setTurn(false)
        status = socketDifference.number
    }

    // if(socketDifference !== null && socketDifference.number === "0"){
    //     status = 'Siap-siap giliran anda'
    // }else if(socketDifference === null && parseInt(socketDifference.number) < 0){
    //     status = 'Sekarang giliran anda'
    //     props.setTurn(true)
    // }else{
    //     status = socketDifference.number
    // }
    
    if(!socketDifference === null)
        return(
            <Grid item md={9} style={{color:'#fff',backgroundColor:'#00897b'}}>
                <Card style={{color:'#fff',backgroundColor:'#00897b'}}>
                    <CardContent>
                        <Typography gutterBottom variant="h6" align="center" component="h1">
                            {!props.difference.length > 0 ? '' : 'Selisih Dari Nomor Antrian Anda'}
                            
                        </Typography>
                        <Typography gutterBottom variant="h3" align="center" component="h1">
                            Loading...
                            {/* {!props.difference.length > 0 ? 'Sekarang Giliran Anda' : 'Loading....'} */}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    return(
        <Grid item md={9}>
            <Card style={{color:'#fff',backgroundColor:'#009688'}}>
                <CardContent>
                    <Typography gutterBottom variant="h6" align="center"component="h1">
                        {socketDifference == null || socketDifference.number <= 0  ?  '' : 'Selisih Dari Nomor Antrian Anda'}
                    </Typography>
                    <Typography gutterBottom variant="h3" align="center"component="h1">
                        {status}
                    </Typography>
                    {
                        socketOperator && parseInt(socketOperator.number) > 0 && (
                            <Typography gutterBottom variant="h3" align="center"component="h1">
                                Di loket {socketOperator.number}
                            </Typography>
                        )
                    }
                </CardContent>
            </Card>
        </Grid>                  
    )
}
const Dashboard = ({router,numberQueue,differenceQueue,socketDifference,socketCounter,counter,confirmation,setConfirmation,handleLogout}) => {
    const [turn,setTurn] = useState(false)
    const difference = waitQuery(differenceQueue)
    return(
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh', backgroundColor:'#00897b' }}
        >
            <Dialog
                open={confirmation}
                onClose={() => setConfirmation(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Keluar</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Apakah anda yakin ingin keluar ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setConfirmation(false)} color="primary">
                            Tidak
                        </Button>
                        <Button onClick={() => handleLogout()} color="primary">
                            Iya
                        </Button>
                </DialogActions>
            </Dialog>
            <NumberQueue turn={turn} handleLogout={handleLogout} numberQueue={numberQueue} router={router} setConfirmation={setConfirmation}/>
            <NumberDifference setTurn={setTurn} difference={difference} socketDifference={socketDifference} socketCounter={socketCounter} counter={counter} />

        </Grid>
    )
}

export default Dashboard