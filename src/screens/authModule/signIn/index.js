import React, {useEffect, useState, useRef} from 'react';
import {AppState, Image, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Processing from '../../processing';
import {CommonActions, useNavigation} from '@react-navigation/native';
import apiRoutes from '../../../apis/apiRoutes';
import axiosInstance from '../../../apis';
import {dynamicSize, showErrorMessage} from '../../../utils/helpers';

import MainContainer from '../../../components/mainContainer';
import {loginScreen} from '../../../utils/resources';
import {CommonStyle} from '../../../theme/style';
import style from './style';
import InputBox from '../../../components/inputBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Color} from '../../../theme/colors';
import AppButton from '../../../components/appButton';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const appState = useRef(AppState.currentState);

  const [formData, setFormData] = useState({
    mobileNo: '',
  });

  const navigation = useNavigation();

  useEffect(() => {
    checkTokenAndNavigate();
  }, []);

  const checkTokenAndNavigate = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        const response = await axiosInstance.get(apiRoutes.userInfo);

        if (response.data.success) {
          const today = new Date();
          const expiresAtDate = new Date(response.data.user.expiresAt);

          // Normalize both dates to midnight
          today.setHours(0, 0, 0, 0);
          expiresAtDate.setHours(0, 0, 0, 0);
          // Check if the account is expired
          await AsyncStorage.setItem(
            'user_info',
            JSON.stringify(response.data.user),
          );
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'MatchList'}],
            }),
          );
        } else {
          // If token is invalid, remove it
          await AsyncStorage.removeItem('access_token');
        }
      }
    } catch (error) {
      // If verification fails, remove token
      await AsyncStorage.removeItem('access_token');
    }
  };

  const validateField = (name, value) => {
    if (!value) {
      return 'This field is required.';
    }
    return '';
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'mode') {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Validate field on change
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onPressLogin(formData);
    }
  };

  const onPressLogin = async data => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(apiRoutes.sigInWithPhone, data);
      if (response.data.success) {
        console.log('Login successful:', response.data);
        await AsyncStorage.setItem('access_token', response.data.token);
        await AsyncStorage.setItem(
          'user_info',
          JSON.stringify(response.data.user),
        );
        checkTokenAndNavigate();
      } else {
        showErrorMessage(
          `Authentication failed! ${
            response?.message ? response.message : 'Something went wrong.'
          }`,
        );
      }
    } catch (error) {
      showErrorMessage(
        `Authentication failed! ${
          error?.message ? error.message : 'Something went wrong.'
        }`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Processing />}
      {!isLoading && (
        <MainContainer fluid>
          <View style={style.lockIcon}>
            <Image source={loginScreen.lockIcon} />
            <Text
              style={[
                CommonStyle.appHeading,
                {fontSize: dynamicSize(30), marginTop: dynamicSize(10, 1)},
              ]}>
              Enter your mobile number
            </Text>
          </View>
          <View style={{paddingHorizontal: dynamicSize(5, 1)}}>
            <View>
              <View>
                {errors?.mobileNo && (
                  <Text style={CommonStyle.errorMsg}>{errors.username}</Text>
                )}
              </View>
              <InputBox
                placeholder={'+91 XXXX-XXXXXX'}
                changeBorderColor={{
                  borderColor: errors.mobileNo ? Color.primaryPink : null,
                  borderWidth: errors.mobileNo ? 1 : null,
                  marginTop: errors.mobileNo
                    ? dynamicSize(0)
                    : dynamicSize(20, 1),
                }}
                value={formData.mobileNo}
                onChangeText={value => handleChange('mobileNo', value)}
                keyboardType="number-pad"
                showIcon={
                  <Ionicons
                    name="call-outline"
                    size={20}
                    color={Color.primaryBlue}
                  />
                }
              />
            </View>

            <View style={CommonStyle.topSpacing}></View>
            <AppButton
              title={'Get Started'}
              onPress={handleSubmit}
              isLoading={isLoading}
            />
          </View>
        </MainContainer>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  closeIcon: {
    backgroundColor: 'red',
    alignSelf: 'center',
    backgroundColor: '#FFDEE7',
    borderRadius: 50,
    padding: dynamicSize(5, 1),
    marginBottom: dynamicSize(10, 1),
  },
  errorText: {color: 'red', fontSize: 12},
  errorModal: {padding: 20, alignItems: 'center', backgroundColor: '#fff'},
});

export default SignIn;
