import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddBusinessNews from './components/AddBusinessNews';
import React from 'react';
import BusinessNewsList from './components/BusinessNewsList';

function App() {
  return (
    <BrowserRouter>
      <div>
        <div>
          <Switch>
            <Route exact path="/getAll" component={BusinessNewsList} />
            <Route path="/createNews" component={AddBusinessNews} />
            <Route path="/updateNews/:id" component={AddBusinessNews} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;