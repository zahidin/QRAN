import React from 'react'
import {Route,Switch} from 'react-router-dom'
import {
	Board,
	RegisterQueue,
	DashboardUser,
	NotFound,
	Blocked,
	Operator,
	ScanBarcode,
	Logout
} from './components/index'

const Routing = () => {
	return(
		<div>
			<Switch>
				<Route path="/visitor" exact component={Board}></Route>
				<Route path="/scan" exact component={ScanBarcode}></Route>
				<Route path="/" exact component={RegisterQueue}></Route>
				<Route path="/:hash/:lastNumber" exact render={(props) => <DashboardUser {...props} />}></Route>
				<Route path="/operator" exact render={(props) => <Operator {...props} />}></Route>
				<Route path="/blocked" exact render={(props) => <Blocked {...props} />}></Route>
				<Route path='/logout' exact={true} component={Logout} />
				<Route path='*' exact={true} component={NotFound} />
			</Switch>
		</div>
	)
}

export default Routing