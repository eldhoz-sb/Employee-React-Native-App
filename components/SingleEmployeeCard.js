// SingleEmployeeCard.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';

const SingleEmployeeCard = ({route}) => {
  const {employee, allEmployees} = route.params;

  const findManagerName = () => {
    const managerId = employee.parentId;
    const manager = allEmployees.find(emp => emp.id === managerId);
    return manager ? manager : null;
  };

  const manager = findManagerName();

  const findSubordinatesName = () => {
    const employeeId = employee.id;
    return allEmployees.filter(e => e.parentId === employeeId);
  };

  const subordinates = findSubordinatesName(manager, allEmployees);

  const determineTextColor = backgroundColor => {
    const color = tinycolor(backgroundColor);
    return color.isLight() ? 'black' : 'white';
  };

  const textColor = determineTextColor(employee.backgroundColor);

  const textStyles = {
    color: textColor,
  };

  return (
    <View style={[styles.card, {backgroundColor: employee.backgroundColor}]}>
      <Text style={[styles.name, textStyles]}>{employee.name}</Text>
      <Text numberOfLines={1} style={[styles.email, textStyles]}>
        {employee.email}
      </Text>
      <Text style={[styles.phone, textStyles]}>{employee.phone}</Text>
      <Text style={[styles.address, textStyles]}>{employee.address}</Text>
      {manager && (
        <Text style={[styles.manager, textStyles]}>
          {`Manager: ${manager.name}`}
        </Text>
      )}
      {subordinates && subordinates.length > 0 && (
        <Text style={[styles.manager, {color: textColor}]}>
          {`Subordinates: ${subordinates
            .map(subordinate => subordinate.name)
            .join(', ')}`}
        </Text>
      )}
    </View>
  );
};

SingleEmployeeCard.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      employee: PropTypes.object.isRequired,
      allEmployees: PropTypes.array.isRequired,
    }).isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
    height: 300,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {},
  phone: {},
  address: {},
  manager: {},
});

export default SingleEmployeeCard;
