import React from 'react'
import Grid from '@material-ui/core/Grid';
import QrReader from 'react-qr-scanner'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const ScanBarcode = props => {
    const previewStyle = {
        width: 350,
    }
    return(
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh', backgroundColor:'#3f51b5' }}
        >
            <Grid item md={9} style={{marginBottom:20}}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h4" align="center"component="h1">
                            Mulai Scan Barcode
                        </Typography>
                        <Grid
                            container
                            spacing={0}
                            alignItems="center"
                            justify="center"
                        >
                            <QrReader
                                delay={100}
                                style={previewStyle}
                                onError={props.handleError}
                                onScan={props.handleScan}
                            />
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
export default ScanBarcode