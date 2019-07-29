import React from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography  from '@material-ui/core/Typography';
import { waitQuery } from '../../../config';

const NumberQueue = ({router}) => {
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
            </Card>
        </Grid>
    )
}

const NumberDifference = props => {
    let difference = (props.difference && props.difference.difference) || null
    let counter = waitQuery(props.counter) || false
        counter = counter.counter || false
    let socketDifference = props.socketDifference.data ? props.socketDifference.data.newDifference : difference
    let socketOperator = props.socketCounter.data ? props.socketCounter.data.newCounter : counter
    console.log("TCL: socketOperator", props.socketCounter)
    
    let status = ''
    if(socketDifference !== null && socketDifference.number === "0"){
        status = 'Siap-siap giliran anda'
    }else if(socketDifference === null ){
        status = 'Sekarang giliran anda'
    }else{
        status = socketDifference.number
    }
    
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
const Dashboard = ({router,numberQueue,differenceQueue,socketDifference,socketCounter,counter}) => {
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
                <NumberQueue numberQueue={numberQueue} router={router}/>
                <NumberDifference difference={difference} socketDifference={socketDifference} socketCounter={socketCounter} counter={counter} />

            </Grid>
    )
}

export default Dashboard