import React , {useState, useEffect} from 'react'
import RegisterQueue from './components/add-queue'
import {useQuery,useSubscription} from 'react-apollo-hooks';
import LAST_QUEUE from '../../graphql/queries/last-queue'
import SOCKET_LAST_QUEUE from '../../graphql/subscription/last-queue'
import {encrypt} from '../../commons/hash'
import publicIp from 'public-ip'

function RegisterQueueContainer () {
    const socketLastQueue = useSubscription(SOCKET_LAST_QUEUE)
    const lastQueue = useQuery(LAST_QUEUE)
    const [menu, setMenu] = useState('')
    const [hash,setHash] = useState(null)

    async function getHash(){
        const ip = await publicIp.v4()
        const text = `${ip}`
        let hash = await encrypt(text)
        setHash(hash)
    }

    useEffect(() => {
        getHash()
    },[socketLastQueue])

    return (<RegisterQueue socketLastQueue={socketLastQueue} menu={menu} setMenu={setMenu} lastQueue={lastQueue} hash={hash}/>)

}

export default RegisterQueueContainer