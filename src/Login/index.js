import React, {useState, useEffect, Fragment} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  Animated,
  ActivityIndicator,
} from 'react-native';
import _s_ from '../styles';
import auth, {firebase} from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';

import {addUser} from '../Redux/actions';

import {validateSignUpData, validateLoginData} from '../utils/validators';

const AnimatedView = Animated.createAnimatedComponent(View);

//change view between sign in and sign up
const _changingView = (setIsLoggingIn, isLoggingIn) => {
  setIsLoggingIn(isLoggingIn);
};
const _signIn = async (
  {email, password},
  setError,
  setErrorMessage,
  setLoading,
) => {
  const {valid, errors} = validateLoginData({email, password});
  setError(errors);
  if (valid) {
    setLoading(true);

    setError('');
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      setLoading(false);

      setErrorMessage(e.message);
    }
  }
};
const _signUp = async (
  {username, email, password},
  setError,
  setErrorMessage,
  setLoading,
) => {
  const {valid, errors} = validateSignUpData({username, email, password});
  setError(errors);
  if (valid) {
    setLoading(true);
    setError('');
    try {
      let response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (response) {
        response.user.updateProfile({
          displayName: username,
        });
      }
    } catch (e) {
      setLoading(false);
      setErrorMessage(e.message);
    }
  }
};

const LoginScreen = ({navigation}) => {
  const opacity = new Animated.Value(0);
  const [valueUser, setValueUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();

  const onAuthStateChanged = async (user) => {
    if (user) {
      const {id, email, uid, refreshToken, displayName} = user._user;
      dispatch(addUser({id, email, uid, refreshToken, displayName}));
      navigation.replace('Home');
    }
  };

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start(({finished}) => {});
    setError('');
    setErrorMessage('');
  }, [isLoggingIn]);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <Fragment>
      {isLoggingIn ? (
        <AnimatedView style={[styles.contentInput, {opacity}]}>
          <TextInput
            style={[
              _s_.input,
              error.email && {borderColor: 'red', borderWidth: 1},
            ]}
            placeholderTextColor="#fff"
            placeholder="Email"
            onChangeText={(email) => setValueUser({...valueUser, email})}
          />
          <TextInput
            style={[
              _s_.input,
              error.email && {borderColor: 'red', borderWidth: 1},
            ]}
            secureTextEntry={true}
            placeholderTextColor="#fff"
            placeholder="Password"
            onSubmitEditing={() => {
              _signIn(valueUser, setError, setErrorMessage, setLoading);
            }}
            onChangeText={(password) => setValueUser({...valueUser, password})}
          />
          {errorMessage != '' && (
            <Text style={styles.error}>{errorMessage}</Text>
          )}
          {loading ? (
            <ActivityIndicator size="large" color="#0062cc" />
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                // flexDirection: 'row',
              }}>
              <TouchableHighlight
                underlayColor="#0062cc"
                style={_s_.btnStart}
                onPress={() => {
                  _signIn(valueUser, setError, setErrorMessage, setLoading);
                }}>
                <Text style={[_s_.text, _s_.subHeadingSize]}>Log in</Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="#0062cc"
                style={{alignSelf: 'flex-end'}}
                onPress={() => _changingView(setIsLoggingIn, false)}>
                <Text style={[_s_.text, _s_.subHeadingSize]}>Sign up</Text>
              </TouchableHighlight>
            </View>
          )}
        </AnimatedView>
      ) : (
        <AnimatedView style={[styles.contentInput, {opacity}]}>
          <TextInput
            style={[
              _s_.input,
              error.username && {borderColor: 'red', borderWidth: 1},
            ]}
            placeholderTextColor="#fff"
            placeholder="Name"
            onChangeText={(username) => setValueUser({...valueUser, username})}
            value={valueUser.username}
          />
          <TextInput
            style={[
              _s_.input,
              error.email && {borderColor: 'red', borderWidth: 1},
            ]}
            placeholderTextColor="#fff"
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(email) => setValueUser({...valueUser, email})}
            value={valueUser.email}
          />
          <TextInput
            style={[
              _s_.input,
              error.password && {borderColor: 'red', borderWidth: 1},
            ]}
            style={_s_.input}
            placeholderTextColor="#fff"
            secureTextEntry={true}
            placeholder="Password"
            onSubmitEditing={() => {
              _signUp(valueUser, setError, setErrorMessage, setLoading);
            }}
            onChangeText={(password) => setValueUser({...valueUser, password})}
            value={valueUser.password}
          />
          {errorMessage != '' && (
            <Text style={styles.error}>{errorMessage}</Text>
          )}

          {loading ? (
            <ActivityIndicator size="large" color="#0062cc" />
          ) : (
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                // flexDirection: 'row',
              }}>
              <TouchableHighlight
                underlayColor="#0062cc"
                style={_s_.btnStart}
                onPress={() => {
                  _signUp(valueUser, setError, setErrorMessage, setLoading);
                }}>
                <Text style={[_s_.text, _s_.subHeadingSize]}>Sign up</Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="#0062cc"
                style={{alignSelf: 'flex-end'}}
                onPress={() => _changingView(setIsLoggingIn, true)}>
                <Text style={[_s_.text, _s_.subHeadingSize]}>Log in</Text>
              </TouchableHighlight>
            </View>
          )}
        </AnimatedView>
      )}
    </Fragment>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  error: {
    color: 'red',
  },
});
