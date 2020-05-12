import React, {useState, useEffect, useRef, Fragment} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableHighlight,
  Animated,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import _s_ from './styles';
import Login from './Login';
const {width: Width} = Dimensions.get('window');
import auth, {firebase} from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';

import {addUser} from './Redux/actions';

const AnimatedImage = Animated.createAnimatedComponent(Image);
const _handleKeyboard = (
  imageHeight,
  keyboardShowListener,
  keyboardHideListener,
) => {
  keyboardShowListener.current = Keyboard.addListener(
    'keyboardWillShow',
    (event) =>
      Animated.timing(imageHeight, {
        duration: event.duration,
        toValue: Width - 250,
        // useNativeDriver: true,
      }).start(),
  );
  keyboardHideListener.current = Keyboard.addListener(
    'keyboardWillHide',
    (event) =>
      Animated.timing(imageHeight, {
        duration: event.duration,
        toValue: Width,
        // useNativeDriver: true,
      }).start(),
  );
};

const _isLogging = async (navigation, dispatch) => {
  //get currentuser Firebase
  const user = auth().currentUser;
  if (user) {
    const {email, uid, refreshToken, displayName} = user._user;
    //Save user in redux
    dispatch(addUser({email, uid, refreshToken, displayName}));
    navigation.replace('Home');
  }
};
const Index = ({navigation}) => {
  const dispatch = useDispatch();
  const imageHeight = new Animated.Value(Width - 80);
  const [goLogin, setGoLogin] = useState(false);
  const keyboardShowListener = useRef(null);
  const keyboardHideListener = useRef(null);

  useEffect(() => {
    //if there is a session go home
    _isLogging(navigation, dispatch);
    _handleKeyboard(imageHeight, keyboardShowListener, keyboardHideListener);
    return () => {
      keyboardShowListener.current.remove();
      keyboardHideListener.current.remove();
    };
  });

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView style={{marginBottom: 50}}>
        <AnimatedImage
          resizeMode="contain"
          style={[styles.backgroundHome, {height: imageHeight}]}
          source={require('./static/img/home1.png')}
        />
        <View style={{alignItems: 'center'}}>
          <Text style={[_s_.text, _s_.titleSize, {paddingBottom: 20}]}>
            Welcome to Tasks
          </Text>
          {!goLogin && (
            <Fragment>
              <Text style={[_s_.text, _s_.subHeadingSize]}>
                keep track of important things that you{'\n'}need to get done in
                one place
                {'\n'}
              </Text>
              <TouchableHighlight
                underlayColor="#0062cc"
                style={_s_.btnStart}
                onPress={() => {
                  setGoLogin(true);
                }}>
                <Text style={[_s_.text, _s_.subHeadingSize]}>Get started</Text>
              </TouchableHighlight>
            </Fragment>
          )}
        </View>

        {goLogin && <Login navigation={navigation} />}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: '#0F1317',
    padding: 20,
  },
  backgroundHome: {
    width: Width - 40,
    marginBottom: 30,
  },
});
export default Index;
