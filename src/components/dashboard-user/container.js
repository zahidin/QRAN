import React , {useState, useEffect} from 'react'
import { useMutation, useQuery, useSubscription } from 'react-apollo-hooks';
import Dashboard from './components/dashboard'
import publicIp from 'public-ip'
import {timeNow} from '../../commons/time'
import ADD_QUEUE from '../../graphql/mutations/add-queue';
import DIFFERENCE_QUEUE from '../../graphql/queries/difference-queue';
import useReactRouter from 'use-react-router';
import SOCKET_DIFFERENCE from '../../graphql/subscription/difference';
import SOCKET_COUNTER from '../../graphql/subscription/new-counter';
import COUNTER from '../../graphql/queries/counter';

function DashboardContainer(props){
    const Router = useReactRouter();
    let numberUser = localStorage.getItem('userInfo') ?  JSON.parse(localStorage.getItem('userInfo')).number : Router.match.params.lastNumber
    
    let socketDifference = useSubscription(SOCKET_DIFFERENCE,{variables:{number:numberUser}})
    let socketCounter = useSubscription(SOCKET_COUNTER)
    const addQueue = useMutation(ADD_QUEUE)


    const differenceQueue = useQuery(DIFFERENCE_QUEUE,{variables:{number:numberUser}})
    const counter = useQuery(COUNTER,{variables:{number:numberUser}})
    const [queue] = useState('')

    async function checkLoggedIn () {

        if(!localStorage.getItem('userInfo')){
            const ip = await publicIp.v4()
            const hash = Router.match.params.hash
            const number = Router.match.params.lastNumber
            localStorage.setItem('userInfo',JSON.stringify({
                'number':number,
                'hash':hash,
                'time':timeNow
            }))
            handleAddQueue(ip,number,timeNow)
        }else{
            const resultLocal = (JSON.parse(localStorage.getItem('userInfo')).number) || false
            if(Router.match.params.lastNumber !== resultLocal){
                localStorage.removeItem('userInfo')
                Router.history.push('/blocked')
            }
        }
    }

    const handleAddQueue = async (ip,number,time) => {
        try{
            await addQueue({
                variables:{
                    ip,
                    number,
                    time
                }
            })
            alert('berhasil')
        }catch(err){
            alert(err)
        }
    }

    useEffect(() => {
        checkLoggedIn()
    },[])

    return (<Dashboard router={Router} counter={counter} socketCounter={socketCounter} socketDifference={socketDifference} numberQueue={queue} differenceQueue={differenceQueue} />)
}
export default DashboardContainer