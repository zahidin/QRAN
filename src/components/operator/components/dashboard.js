import React from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
// import { makeStyles } from '@material-ui/core/styles';

  
  
const InputNumberOperator = (props) => {
    return(
        <Grid item md={9}>
            <Card style={{color:'#fff',backgroundColor:'#03a9f4'}}>
                <CardContent>
                    <form onSubmit={(e) => props.handleAddNumberOperator(e)}>
                        
                        <Typography gutterBottom variant="h6" align="center"component="h1">
                            Silahkan isi nomor operator
                        </Typography>
                        <Box display="flex" justifyContent='center' alignItems="center">
                            <TextField
                                id="outlined-number-input"
                                label="Nomor"
                                type="number"
                                name="number"
                                autoComplete="off"
                                InputProps={{ inputProps: { min: 0 } }}
                                margin="normal"
                                variant="outlined"
                            />
                                
                            <Button type="submit" variant="outlined" style={{marginLeft:10,color:'#fff',height:57,marginTop:7}}>
                                Simpan
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Grid>
    )
}
const InfoQueue = (props) => {
    const data = props.infoQueue || false

    if(!data || data == null)
        return(
            <Grid item md={9}>
                <Card style={{color:'#fff',backgroundColor:'#03a9f4'}}>
                    <CardContent>
                        <Typography style={{fontWeight:'bold'}} gutterBottom variant="h4" align="center"component="h1">
                            INFO ANTRIAN
                        </Typography>
                        <Typography gutterBottom variant="h5" align="center"component="h3">
                            Sementara antrian belum ada
                        </Typography>
                    </CardContent>
                </Card>
            </Grid> 
        )
    return(
        <Grid item md={9}>
            <Card style={{color:'#fff',backgroundColor:'#03a9f4'}}>
                <CardContent>
                    <Typography style={{fontWeight:'bold'}} gutterBottom variant="h4" align="center"component="h1">
                        INFO ANTRIAN
                    </Typography>
                    <Typography gutterBottom variant="h5" align="left"component="h3">
                        Nomor : {props.infoQueue.number}
                    </Typography>
                    <Typography gutterBottom variant="h5" align="left"component="h3">
                        Waktu : {props.infoQueue.time}
                    </Typography>
                </CardContent>
            </Card>
        </Grid> 
    )
}
const ButtonOperator = (props) => {
    return(
        <Grid item md={9} style={{marginTop:20}}>
            <Card style={{color:'#fff',backgroundColor:'#03a9f4'}}>
                <CardContent>
                    <Typography style={{fontWeight:'bold'}} gutterBottom variant="h4" align="center"component="h1">
                        Tekan Untuk Lanjut
                    </Typography>
                    <Box display="flex" justifyContent="center">
                        <Button variant="contained" onClick={() => props.handleAddOperator()} style={{height:130,margin:10,fontSize:30,width:240,backgroundColor:'#0091ea',color:'#fff'}}>
                            Lanjut
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid> 
    )
}
const Dashboard = (props) => {
    const operatorLocal = localStorage.getItem('operatorInfo') || false
    return(
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh', backgroundColor:'#0277bd' }}
        >
            {operatorLocal || props.infoLocal ? (
                <React.Fragment>
                    <InfoQueue {...props}/>
                    <ButtonOperator {...props}/>
                </React.Fragment>
            ):(
                <InputNumberOperator {...props} />
            )}
        </Grid>
    )
}
export default Dashboard