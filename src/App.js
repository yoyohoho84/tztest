import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import QuestionContainer from "./Containers/QuestionContainer";


const App = () => (
    <BrowserRouter basename="uchi">
      <Switch>
        <Route path='/' component={QuestionContainer} exact/>

      </Switch>
    </BrowserRouter>

);

export default App;