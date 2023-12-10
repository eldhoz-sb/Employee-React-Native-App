import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import EmployeeList from './components/EmployeeList';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <EmployeeList />
    </NavigationContainer>
  );
};

export default App;
