// EmployeeCard.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';

const EmployeeCard = ({employee, allEmployees}) => {
  const findManagerName = () => {
    const managerId = employee.parentId;
    const manager = allEmployees.find(emp => emp.id === managerId);
    return manager ? manager : null;
  };

  const manager = findManagerName();

  const determineTextColor = backgroundColor => {
    const color = tinycolor(backgroundColor);
    return color.isLight() ? 'black' : 'white';
  };

  const textColor = determineTextColor(employee.backgroundColor);

  return (
    <View style={[styles.card, {backgroundColor: employee.backgroundColor}]}>
      <Text style={[styles.name, {color: textColor}]}>{employee.name}</Text>
      <Text numberOfLines={1} style={[styles.email, {color: textColor}]}>
        {employee.email}
      </Text>
      <Text style={[styles.phone, {color: textColor}]}>{employee.phone}</Text>
      {manager && (
        <Text style={[styles.manager, {color: textColor}]}>
          {`Manager: ${manager.name}`}
        </Text>
      )}
    </View>
  );
};

EmployeeCard.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
  }).isRequired,
  allEmployees: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    // No specific color is set here; it will be dynamically set based on the background color.
  },
  phone: {
    // No specific color is set here; it will be dynamically set based on the background color.
  },
  address: {
    // No specific color is set here; it will be dynamically set based on the background color.
  },
  manager: {},
});

export default EmployeeCard;
