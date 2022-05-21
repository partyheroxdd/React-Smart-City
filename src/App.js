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
import VacancyList from './components/VacancyList';
import AddVacancy from './components/AddVacancy';
function App() {


  const [token, setToken] = useState('eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbiI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbiIsIlJPTEUiOiJBRE1JTiIsImlhdCI6MTY1MzE2MjY0MiwiZXhwIjoxNjUzMjYyNjQyfQ.z-O9PwmVXy5bn5sRMCZdiI4N0KvgwYWIXGzRvt8htZRoQ3K8QEUg0D5PcLQM_BPV8nEApUGf0YJo5Jf8PnR1lg');
  
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
              <Route path="/getAllVacancy" >
              <VacancyList token={token}/>
              </Route>
            <Route path="/createVacancy">
              <AddVacancy token={token}/>
              </Route>
            <Route path="/updateVacancy/:id">
              <AddVacancy token={token}/>
              </Route>
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;