import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header'
import SideBar from './components/SideBar';
import './App.css';
import { styled } from 'styled-components';
import Chat from './components/Chat';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login';

export default function App() {
  const [user, loading] = useAuthState(auth);
  return (
    <Router>
      {(!user) ?
        <Login />
        :
        <>
          <Header />
          <AppBody>
            <SideBar />
            <Switch>
              <Route path="/" exact>
                <Chat />
              </Route>
            </Switch>
          </AppBody>
        </>
      }
    </Router>
  );
}

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`