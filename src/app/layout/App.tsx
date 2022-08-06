import React, {  useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

function App() {
  const {activityStore} = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <>
      <NavBar />
      <Container style = {{marginTop: '7em'}}>
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/activities' element={<ActivityDashboard />} />
                  <Route path='/createActivity' element={<ActivityForm />} />
              </Routes>
          </BrowserRouter>

      </Container>
      
    </>
  );
}

export default observer(App);
