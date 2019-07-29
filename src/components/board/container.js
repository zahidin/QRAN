import React from 'react'
import Board from './components/board'
import { useQuery, useSubscription } from 'react-apollo-hooks';
import LIST_QUEUE from '../../graphql/queries/list-queue';
import SOCKET_QUEUES from '../../graphql/subscription/new-queues';

const IndexContainer = () => {
    const newQueues = useSubscription(SOCKET_QUEUES)
    const listQueue = useQuery(LIST_QUEUE);
    return(
        <Board listQueue={listQueue} newQueues={newQueues} />
    )
}

export default IndexContainer