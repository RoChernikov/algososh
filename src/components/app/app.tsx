import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MainPage from '../../pages/main/main';
import StringPage from '../../pages/string/string';
import FibonacciPage from '../../pages/fibonacci/fibonacci';
import SortingPage from '../../pages/sorting/sorting';
import StackPage from '../../pages/stack/stack';
import QueuePage from '../../pages/queue/queue';
import ListPage from '../../pages/list/list';

import './app.css';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/recursion">
            <StringPage />
          </Route>
          <Route path="/fibonacci">
            <FibonacciPage />
          </Route>
          <Route path="/sorting">
            <SortingPage />
          </Route>
          <Route path="/stack">
            <StackPage />
          </Route>
          <Route path="/queue">
            <QueuePage />
          </Route>
          <Route path="/list">
            <ListPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
