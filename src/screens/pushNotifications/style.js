import {StyleSheet} from 'react-native';
import {dynamicSize} from '../../utils/helpers';
export default StyleSheet.create({
  header: {
    marginTop: dynamicSize(20, 1),
    // backgroundColor: 'red',
  },
  title: {
    color: '#000',
    fontSize: 20,
  },
});
