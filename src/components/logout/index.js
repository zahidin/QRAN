import React from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function Logout(){
    return(
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh', backgroundColor:'#33691e' }}
        >
            <Grid item md={9}>
                <Card style={{color:'#fff',backgroundColor:'#558b2f'}}>
                    <CardContent>
                        <Typography style={{fontWeight:'bold'}} gutterBottom variant="h4" align="center"component="h1">
                            Terimakasih Sudah Mengantri
                        </Typography>
                        <Typography gutterBottom variant="h5" align="center"component="h2">
                            Anda Sudah Logout
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Logout