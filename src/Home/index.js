import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  TextInput,
  Keyboard,
  Animated,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
const {width: Width, height} = Dimensions.get('window');
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const AnimatedView = Animated.createAnimatedComponent(View);
import Input from '../Components/Input';
import Tasks from '../Components/Tasks';
import {addTask} from '../Redux/actions';

import _s_ from '../styles';

const _handleKeyboard = (
  translateY,
  setKeyboardShow,
  keyboardShowListener,
  keyboardHideListener,
) => {
  keyboardShowListener.current = Keyboard.addListener(
    'keyboardWillShow',
    (event) => {
      setKeyboardShow(true);
      Animated.timing(translateY, {
        duration: event.duration,
        useNativeDriver: true,
        toValue: event.endCoordinates.height,
      }).start();
    },
  );
  keyboardHideListener.current = Keyboard.addListener(
    'keyboardWillHide',
    (event) => {
      setKeyboardShow(false);
      Animated.timing(translateY, {
        duration: event.duration,
        useNativeDriver: true,
        toValue: 0,
      }).start();
    },
  );
};
//get tasks from firebase
const _getTask = async (dispatch, user) => {
  const querySnapshot = await firestore()
    .collection('tasks')
    .where('uid', '==', user.uid)
    .get();
  querySnapshot.forEach((documentSnapshot) => {
    dispatch(addTask({...documentSnapshot.data(), id: documentSnapshot.id}));
  });
};
const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const keyboardShowListener = useRef(null);
  const keyboardHideListener = useRef(null);

  const [inputTask_ref, setInputTask_ref] = useState(null);
  const [keyboardShow, setKeyboardShow] = useState(false);

  const translateY = new Animated.Value(0);

  const user = useSelector((state) => state.User);

  useEffect(() => {
    _handleKeyboard(
      translateY,
      setKeyboardShow,
      keyboardShowListener,
      keyboardHideListener,
    );

    async function fetchData() {
      // get tasks from firebase
      await _getTask(dispatch, user);
    }
    fetchData();
    return () => {
      keyboardShowListener.current.remove();
      keyboardHideListener.current.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView style={[StyleSheet.absoluteFill, {flex: 1}]}>
        <Tasks navigation={navigation} />
      </SafeAreaView>
      <Input setInputTask_ref={setInputTask_ref} keyboardShow={keyboardShow} />

      <AnimatedView style={[styles.footer, {transform: [{translateY}]}]}>
        <TouchableHighlight
          underlayColor="#1d201f"
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <Text style={[_s_.text, styles.textSizeColor]}>&#9776;</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="#0062cc"
          onPress={() => {
            inputTask_ref.focus();
          }}
          style={styles.addTask}>
          <Text style={[_s_.text, styles.textSizeColor, {textAlign: 'center'}]}>
            &#10011;
          </Text>
        </TouchableHighlight>

        <TouchableHighlight underlayColor="#1d201f" onPress={() => {}}>
          <Text style={[_s_.text, styles.textSizeColor, {fontWeight: 'bold'}]}>
            &#8943;
          </Text>
        </TouchableHighlight>
      </AnimatedView>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    paddingTop: 20,
    justifyContent: 'flex-end',
  },
  textSizeColor: {
    fontSize: 30,
    color: '#fff',
  },
  addTask: {
    position: 'absolute',
    bottom: 0,
    top: -20,
    left: (Width - 48) / 2,
    backgroundColor: '#303136',
    borderWidth: 2,
    borderRadius: 100,
    width: 48,
    height: 48,
    borderColor: '#1d201f',
    justifyContent: 'center',
  },
  footer: {
    width: Width,
    position: 'absolute',
    bottom: 0,
    height: 64,
    backgroundColor: '#303136',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#1d201f',
  },
});
