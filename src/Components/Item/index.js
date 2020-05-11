import React, {Fragment} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {editTask} from '../../Redux/actions';

import _s_ from '../../styles';

const _completeTask = (dispatch, valueTask) => {
  dispatch(editTask({...valueTask, completed: !valueTask.completed}));
};
const Item = ({task, navigation}) => {
  const dispatch = useDispatch();
 
  return (
    <View style={[styles.item, {flexDirection: 'row', alignItems: 'center'}]}>
      <TouchableHighlight
        underlayColor="transparent"
        style={{padding: 10}}
        onPress={() => {
          _completeTask(dispatch, task);
        }}>
        <View style={styles.check}>
          <Text
            style={[
              styles.title,
              {textAlign: 'center', fontSize: 22},
              task.completed && {color: '#4caf50'},
            ]}>
            {task.completed ? `✓` : '◯'}
          </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor="transparent"
        style={{flex: 1}}
        onPress={() => navigation.navigate('Task', {task})}>
        <Fragment>
          <Text
            style={[
              styles.title,
              task.completed && {
                textDecorationLine: 'line-through',
              },
            ]}>
            {task.task}
          </Text>
          <Text style={styles.detail} numberOfLines={2}>
            {task.detail}
          </Text>
        </Fragment>
      </TouchableHighlight>
    </View>
  );
};
export default Item;
const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    paddingEnd: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff40',
  },
  title: {
    color: '#fff',
    fontSize: 18,
  },
  detail: {
    color: '#afafaf',
    fontSize: 14,
  },
  check: {
    marginHorizontal: 10,
    height: 25,
    width: 25,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
