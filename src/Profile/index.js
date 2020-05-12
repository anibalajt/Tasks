import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import {logout, cleanTask} from '../Redux/actions';

const {width} = Dimensions.get('window');

import _s_ from '../styles';

const _signOut = (dispatch, navigation) => {
  auth()
    .signOut()
    .then(() => {
      console.log('User signed out!');
      dispatch(cleanTask());
      dispatch(logout());
      navigation.navigate('Main', {screen: 'Login'});
    });
};
const index = ({navigation}) => {
  const dispatch = useDispatch();
  //get current user
  const user = useSelector((state) => state.User);
  const displayName = user.displayName
    ? user.displayName
    : auth().currentUser && auth().currentUser.displayName;

  return (
    <TouchableHighlight
      style={styles.constainer}
      underlayColor="transparent"
      onPress={() => navigation.goBack()}>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => {
          return false;
        }}>
        <View style={styles.body}>
          <View style={styles.line}>
            <Text
              style={[
                _s_.text,
                {
                  padding: 15,
                  textAlign: 'left',
                  fontSize: 20,
                },
              ]}>
              {displayName}
            </Text>
          </View>
          <TouchableHighlight
            underlayColor="#1d201f"
            onPress={() => _signOut(dispatch, navigation)}>
            <Text
              style={[
                _s_.text,
                {
                  padding: 15,
                  textAlign: 'left',
                  fontSize: 16,
                },
              ]}>
              Logout
            </Text>
          </TouchableHighlight>
        </View>
      </TouchableHighlight>
    </TouchableHighlight>
  );
};

export default index;
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  body: {
    position: 'absolute',
    backgroundColor: '#303136',
    height: 300,
    width,
    bottom: 0,
  },
  line: {borderBottomWidth: 0.5, borderBottomColor: 'grey'},
});
