import {BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import PrivateRoute from './routing/PrivateRoute'
import {PrivateScreen,LoginScreen,UserScreen,InfoScreen,RegisterScreen,PasswordScreen,AddInfoScreen} from './screens'

const App=()=> {
  return (
    <Router>
      <div className='App'>
        <Switch>
            <PrivateRoute exact path="/" component={PrivateScreen}/>
            <PrivateRoute exact path="/users" component={UserScreen}/>
            <PrivateRoute exact path="/infos" component={InfoScreen}/>
            <PrivateRoute exact path="/register" component={RegisterScreen}/>
            <PrivateRoute exact path="/password" component={PasswordScreen}/>
            <PrivateRoute exact path="/addInfo" component={AddInfoScreen}/>
            <Route exact path="/login" component={LoginScreen}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
