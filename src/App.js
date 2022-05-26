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
import Register from './components/Register';
import Auth from './components/Auth';

function App() {
  
  return (
    <BrowserRouter>
      <div>
        <div>
          <Switch>
          <Route exact path="/">
              <Auth/>
              </Route>
          <Route path="/register">
              <Register/>
              </Route>
            <Route path="/getAllNews" >
              <BusinessNewsList />
              </Route>
            <Route path="/createNews">
              <AddBusinessNews />
              </Route>
            <Route path="/updateNews/:id">
              <AddBusinessNews />
              </Route>
              <Route path="/getAllBuilding" >
              <BuildingList/>
              </Route>
            <Route path="/createBuilding">
              <AddBuilding />
              </Route>
            <Route path="/updateBuilding/:id">
              <AddBuilding />
              </Route>
              <Route path="/getAllStudentPlace" >
              <StudentPlaceList/>
              </Route>
            <Route path="/createStudentPlace">
              <AddStudentPlace/>
              </Route>
            <Route path="/updateStudentPlace/:id">
              <AddStudentPlace/>
              </Route>
              <Route path="/getAllTouristicPlace" >
              <TouristicPlaceList/>
              </Route>
            <Route path="/createTouristicPlace">
              <AddTouristicPlace/>
              </Route>
            <Route path="/updateTouristicPlace/:id">
              <AddTouristicPlace/>
              </Route>
              <Route path="/getAllVacancy" >
              <VacancyList/>
              </Route>
            <Route path="/createVacancy">
              <AddVacancy/>
              </Route>
            <Route path="/updateVacancy/:id">
              <AddVacancy/>
              </Route>
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;