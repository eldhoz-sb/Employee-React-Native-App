// EmployeeList.js
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import EmployeeCard from '../components/EmployeeCard';
import SingleEmployeeCard from '../components/SingleEmployeeCard';

const EmployeeForm = ({addEmployee, newEmployee, setNewEmployee}) => {
  const isValidEmail = email => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = phoneNumber => {
    // Regular expression for a simple phone number validation (accepts only digits)
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleAddEmployee = () => {
    // Validate email and phone number before adding employee
    /* eslint-disable no-alert */
    if (!isValidEmail(newEmployee.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!isValidPhoneNumber(newEmployee.phone)) {
      alert('Please enter a valid phone number.');
      return;
    }
    /* eslint-enable no-alert */

    // Add the employee if validation passes
    addEmployee();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add New Employee</Text>
      <TextInput
        style={styles.text}
        placeholder="Name"
        placeholderTextColor="grey"
        value={newEmployee.name}
        onChangeText={text => setNewEmployee({...newEmployee, name: text})}
      />
      <TextInput
        style={styles.text}
        placeholder="Email"
        placeholderTextColor="grey"
        value={newEmployee.email}
        onChangeText={text => setNewEmployee({...newEmployee, email: text})}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.text}
        placeholder="Phone"
        placeholderTextColor="grey"
        value={newEmployee.phone}
        onChangeText={text => setNewEmployee({...newEmployee, phone: text})}
        keyboardType="numeric"
      />
      <Button title="Add Employee" onPress={handleAddEmployee} />
    </View>
  );
};

const RenderEmployeeList = ({
  navigation,
  employees,
  newEmployee,
  setNewEmployee,
  addEmployee,
}) => (
  <ScrollView>
    {employees.map(employee => (
      <TouchableOpacity
        key={employee.id}
        onPress={() =>
          navigation.navigate('SingleEmployeeCardScreen', {
            employee,
            allEmployees: employees,
          })
        }>
        <EmployeeCard employee={employee} allEmployees={employees} />
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const Stack = createStackNavigator();

const EmployeeList = () => {
  const navigation = useNavigation();

  const [employees, setEmployees] = useState([]);

  const generateRandomId = () => {
    return Number(Math.random().toString().slice(2, 11));
  };

  const [newEmployee, setNewEmployee] = useState({
    id: generateRandomId(),
    name: '',
    email: '',
    phone: '',
    address: '',
    parentId: null,
    backgroundColor: 'purple',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://mocki.io/v1/3a4b56bd-ad05-4b12-a181-1eb9a4f5ac8d',
        );
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addEmployee = () => {
    const randomId = generateRandomId();
    setEmployees(prevEmployees => [
      ...prevEmployees,
      {...newEmployee, id: randomId},
    ]);
    setNewEmployee({
      id: randomId,
      name: '',
      email: '',
      phone: '',
      address: '',
      parentId: null,
      backgroundColor: 'purple',
    });
    navigation.goBack();
  };

  return (
    <Stack.Navigator initialRouteName="EmployeeListScreen">
      <Stack.Screen
        name="EmployeeListScreen"
        options={{
          title: 'Employee List',
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('EmployeeFormScreen')}
              style={styles.headerButtonContainer}>
              <Text style={styles.headerButtonText}>Add Employee</Text>
            </TouchableOpacity>
          ),
        }}>
        {props => (
          <RenderEmployeeList
            {...props}
            navigation={navigation}
            employees={employees}
            newEmployee={newEmployee}
            setNewEmployee={setNewEmployee}
            addEmployee={addEmployee}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="EmployeeFormScreen" options={{title: 'Add Employee'}}>
        {props => (
          <EmployeeForm
            {...props}
            navigation={navigation}
            newEmployee={newEmployee}
            setNewEmployee={setNewEmployee}
            addEmployee={addEmployee}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="SingleEmployeeCardScreen"
        component={SingleEmployeeCard}
        options={{title: 'Employee Detail'}}
      />
    </Stack.Navigator>
  );
};

export default EmployeeList;

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  text: {
    color: 'black',
  },
  headerButtonContainer: {
    marginRight: 16,
  },
  headerButtonText: {
    marginRight: 16,
    color: 'black',
    fontSize: 16,
  },
});
