import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

import _s_ from '../styles';

import {editTask, deleteTask} from '../Redux/actions';
//Edit task
const _edtiTask = (dispatch, {id, ...valueTask}) => {
  dispatch(editTask({...valueTask, id}));
  firestore()
    .collection('tasks')
    .doc(id)
    .update({
      ...valueTask,
    })
    .then(() => {
      console.log('Task updated!');
    });
};
//delete task
const _deleteTask = (dispatch, id) => {
  dispatch(deleteTask({id}));
  firestore()
    .collection('tasks')
    .doc(id)
    .delete()
    .then(() => {
      console.log('Task deleted!');
    });
};
const Task = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {task} = route.params;
  const [valueTask, setValueTask] = useState(task);
  const [updateHeightInput, setUpdateHeightInput] = useState(40);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentNav}>
        <TouchableHighlight
          underlayColor="#1d201f"
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={(_s_.text, {fontSize: 30, color: '#fff'})}>&lt;</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="#1d201f"
          onPress={() => {
            _deleteTask(dispatch, task.id);
            navigation.goBack();
          }}>
          <Text style={(_s_.text, {fontSize: 18, color: '#fff'})}>Delete</Text>
        </TouchableHighlight>
      </View>
      <TextInput
        editable={valueTask.completed ? false : true}
        selectTextOnFocus={valueTask.completed ? false : true}
        style={[
          _s_.input,
          styles.input,
          {
            color: '#fff',
            backgroundColor: 'transparent',
            fontSize: 24,
          },
        ]}
        onEndEditing={() => {
          _edtiTask(dispatch, valueTask);
        }}
        placeholder="New task"
        placeholderTextColor="#ffffff80"
        onChangeText={(title) => setValueTask({...valueTask, title})}
        value={valueTask.title}
      />
      <TextInput
        editable={valueTask.completed ? false : true}
        selectTextOnFocus={valueTask.completed ? false : true}
        style={[
          _s_.input,
          styles.input,
          {
            color: '#fff',
            backgroundColor: 'transparent',
            fontSize: 18,
            height: updateHeightInput,
          },
        ]}
        onEndEditing={() => {
          _edtiTask(dispatch, valueTask);
        }}
        onContentSizeChange={(e) => {
          const {height} = e.nativeEvent.contentSize;
          height < 350 && height > 40 && setUpdateHeightInput(height);
        }}
        placeholder="Add details"
        placeholderTextColor="#ffffff80"
        multiline={true}
        onChangeText={(detail) => setValueTask({...valueTask, detail})}
        value={valueTask.detail}
      />
    </SafeAreaView>
  );
};

export default Task;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    paddingTop: 20,
    // justifyContent: 'flex-end',
  },
  contentNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
