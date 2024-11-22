import {View, Text} from 'react-native';
import React from 'react';
import {dynamicSize} from '../../utils/helpers';

const Spacer = ({height = 25, byWidth = false}) => {
  return <View style={{height: dynamicSize(height, byWidth)}} />;
};

export default Spacer;
