import React from 'react'
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import { CardContent, Typography  } from '@material-ui/core';
import QRCode from 'qrcode.react'
import Button from '@material-ui/core/Button';
import { waitQuery } from '../../../config';

const QRQueue = props => {
    let lastNumber = (props.lastQueue.lastQueue && props.lastQueue.lastQueue.number) || false
    lastNumber = lastNumber === false ? 1 : parseInt(lastNumber)+1
    
    let socketLastQueue = props.socketLastQueue.data ? parseInt(props.socketLastQueue.data.newQueue.number)+1 : lastNumber

    if(!lastNumber && props.hash == null && props.socketLastQueue.loading) 
        return(
            <Box display="flex" justifyContent="center">
            <Box display="flex" p={1} m={1} alignItems="center" height={500}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="h1">
                            Scan barcode dibawah ini
                        </Typography>
                        
                        <Box display="flex"  justifyContent="center" m={5}>
                            Loading...
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
        )
    return(
        <Box display="flex" justifyContent="center">
            <Box display="flex" p={1} m={1} alignItems="center" height={500}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="h1">
                            Scan barcode dibawah ini
                        </Typography>
                        
                        <Box display="flex"  justifyContent="center" m={5}>
                            <QRCode value={`http://localhost:3000/${props.hash}/${socketLastQueue}`} size={250}/>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}

const ButtonQueue = (props) => {
    return(
        <Box display="flex" justifyContent="center">
            <Box display="flex" p={1} m={1} alignItems="center" height={500}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="h1">
                            Klik tombol dibawah untuk Antri
                        </Typography>
                        
                        <Typography gutterBottom variant="h3" align="center" component="h1">
                            <Button variant="contained" style={{height:180,fontSize:30,width:400,backgroundColor:'#00897b',color:'#fff'}}>
                                Antri
                            </Button>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}

const Content = (props) => {
    if(props.menu === '')
        return(
            <Box display="flex" justifyContent="center">
                <Box display="flex" p={1} m={1} alignItems="center" height={500}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h3" align="center" component="h1">
                                Pilih Menu:
                            </Typography>
                            <Box display="flex" flexDirection="row" justifyContent="space-around">
                                    <Button variant="contained" onClick={() => props.setMenu('qr')} style={{height:150,margin:10,fontSize:30,width:280,backgroundColor:'#00897b',color:'#fff'}}>
                                        QRCode
                                    </Button>
                                    <Button variant="contained" onClick={() => props.setMenu('kertas')} style={{height:150,margin:10,fontSize:30,width:280,backgroundColor:'#00897b',color:'#fff'}}>
                                        Kertas Antri
                                    </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        )
    return(
        props.menu === 'qr' ? (
            <QRQueue {...props} />
        ):(
            <ButtonQueue {...props}/>
        )
    )
}
const RegisterQueue = (props) => {
    const lastQueue = waitQuery(props.lastQueue)
    console.log(props.hash)
    console.log(props.socketLastQueue,'SOCKET MASUK')
    return(
        <div style={{backgroundColor:'#0091ea',height:'100vh'}}>
            <QRQueue {...props} lastQueue={lastQueue} socketLastQueue={props.socketLastQueue}/>
        </div>
    )
}

export default RegisterQueue