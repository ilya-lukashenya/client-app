import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
  const el = document.getElementById('root')
  if (el === null) throw new Error('Root container missing in index.html')

  const root = ReactDOM.createRoot(el)

  return (
    root.render(<>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/activities' element={<ActivityDashboard />} />
          <Route path='/activities/:id' element={<ActivityDetails />} />
          <Route path='/createActivity' element={<ActivityForm />} />
          <Route path='/manage/:id' element={<ActivityForm />} />
        </Routes>
      </Container>

  </>)
  );
}

export default observer(App);
