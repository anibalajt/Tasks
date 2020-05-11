import React, {useState, useEffect, Fragment} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableHighlight,
  TextInput,
  Animated,
} from 'react-native';
import _s_ from '../styles';
const {width: Width} = Dimensions.get('window');
const AnimatedView = Animated.createAnimatedComponent(View);

const _changingView = (setIsLoggingIn, isLoggingIn) => {
  setIsLoggingIn(isLoggingIn);
};
const Login = ({navigation}) => {
  const opacity = new Animated.Value(0);
  
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start(({finished}) => {});
  }, [isLoggingIn]);

  return (
    <Fragment>
      {isLoggingIn ? (
        <AnimatedView style={[styles.contentInput, {opacity}]}>
          <TextInput
            style={_s_.input}
            placeholderTextColor="#fff"
            placeholder="Email"
          />
          <TextInput
            style={_s_.input}
            placeholderTextColor="#fff"
            placeholder="Password"
          />
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
                navigation.replace('Home');
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
        </AnimatedView>
      ) : (
        <AnimatedView style={[styles.contentInput, {opacity}]}>
          <TextInput
            style={_s_.input}
            placeholderTextColor="#fff"
            placeholder="Name"
          />
          <TextInput
            style={_s_.input}
            placeholderTextColor="#fff"
            placeholder="Email"
          />
          <TextInput
            style={_s_.input}
            placeholderTextColor="#fff"
            placeholder="Password"
          />
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              // flexDirection: 'row',
            }}>
            <TouchableHighlight
              underlayColor="#0062cc"
              style={_s_.btnStart}
              onPress={() => {}}>
              <Text style={[_s_.text, _s_.subHeadingSize]}>Sign up</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#0062cc"
              style={{alignSelf: 'flex-end'}}
              onPress={() => _changingView(setIsLoggingIn, true)}>
              <Text style={[_s_.text, _s_.subHeadingSize]}>Log in</Text>
            </TouchableHighlight>
          </View>
        </AnimatedView>
      )}
    </Fragment>
  );
};
export default Login;

const styles = StyleSheet.create({});
