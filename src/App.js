import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddBusinessNews from './components/AddBusinessNews';
import React, {useState} from 'react';
import BusinessNewsList from './components/BusinessNewsList';
import BuildingList from './components/BuildingList';
import AddBuilding from './components/AddBuilding';
import StudentPlaceList from './components/StudentPlaceList';
import AddStudentPlace from './components/AddStudentPlace';
import TouristicPlaceList from './components/TouristicPlaceList';
import AddTouristicPlace from './components/AddTouristicPlace';
function App() {


  const [token, setToken] = useState('2aU02dqxYLwStknXJFwB');
  
  return (
    <BrowserRouter>
      <div>
        <div>
          <Switch>
            <Route exact path="/getAllNews" >
              <BusinessNewsList token={token}/>
              </Route>
            <Route path="/createNews">
              <AddBusinessNews token={token}/>
              </Route>
            <Route path="/updateNews/:id">
              <AddBusinessNews token={token}/>
              </Route>
              <Route path="/getAllBuilding" >
              <BuildingList token={token}/>
              </Route>
            <Route path="/createBuilding">
              <AddBuilding token={token}/>
              </Route>
            <Route path="/updateBuilding/:id">
              <AddBuilding token={token}/>
              </Route>
              <Route path="/getAllStudentPlace" >
              <StudentPlaceList token={token}/>
              </Route>
            <Route path="/createStudentPlace">
              <AddStudentPlace token={token}/>
              </Route>
            <Route path="/updateStudentPlace/:id">
              <AddStudentPlace token={token}/>
              </Route>
              <Route path="/getAllTouristicPlace" >
              <TouristicPlaceList token={token}/>
              </Route>
            <Route path="/createTouristicPlace">
              <AddTouristicPlace token={token}/>
              </Route>
            <Route path="/updateTouristicPlace/:id">
              <AddTouristicPlace token={token}/>
              </Route>
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;