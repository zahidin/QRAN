import React from 'react'
import ScanBarcode from './components/scan'
import useRouter from 'use-react-router';

function ScanBarcodeContainer(){
    const Router = useRouter()
    const handleScan = data => {
        if(data){
            let url = data.split('/')
            url = `/${url[3]}/${url[4]}`
            Router.history.push(url)
        }
    }
    const handleError = props => {
        console.log(props)
    }
    return(<ScanBarcode handleScan={handleScan} handleError={handleError}/>) 
}

export default ScanBarcodeContainer