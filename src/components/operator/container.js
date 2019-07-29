import React , {useState, useEffect} from 'react'
import {useQuery,useSubscription,useMutation} from 'react-apollo-hooks';
import ADD_OPERATOR from '../../graphql/mutations/add-operator'
import Dashboard from './components/dashboard'
import Speech from 'speak-tts'

function OperatorContainer () {
    const speech = new Speech()
    const addOperator = useMutation(ADD_OPERATOR)
    const [infoLocal,setInfoLocal] = useState(false)
    const [infoQueue,setInfoQueue] = useState(false)
    speech.setLanguage('id-ID')
    speech.setVolume(1) 
    speech.setPitch(1) 

    // speech.init({
    //     'volume': 1,
    //      'lang': 'id-ID',
    //      'rate': 1,
    //      'pitch': 1,
    //      'voice':'Google Bahasa Indonesia',
    //      'splitSentences': true,
    //      'listeners': {
    //          'onvoiceschanged': (voices) => {
    //             //  console.log("Event voiceschanged", voices)
    //          }
    //      }
    // })

    const handleAddNumberOperator = async (event) => {
        event.preventDefault()
        localStorage.setItem('operatorInfo',JSON.stringify({
            number:event.target.number.value
        }))
        setInfoLocal(true)
        
    }
    const handleAddOperator = async () => {
        try {
            const number = JSON.parse(localStorage.getItem('operatorInfo')).number
            const add = await addOperator({
                variables:{
                    number
                }
            })
            if(add.data.addOperator.number === null){
                setInfoQueue(null)
            }else{
                setInfoQueue(add.data.addOperator)
                speech.speak({text:`Nomor Antrian ${add.data.addOperator.number} di loket ${number}`})
            }
        } catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        
    },[])

    return (<Dashboard infoLocal={infoLocal} infoQueue={infoQueue} handleAddOperator={handleAddOperator}  handleAddNumberOperator={handleAddNumberOperator}/>)

}

export default OperatorContainer