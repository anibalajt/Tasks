import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Keyboard,
} from 'react-native';

import {useDispatch} from 'react-redux';

import {addTask} from '../../Redux/actions';

import _s_ from '../../styles';

const handleChange = (name, value, valueTask, setValueTask) => {
  setValueTask({...valueTask, [name]: value});
};
const _saveTask = (setValueTask, dispatch, valueTask) => {
  dispatch(addTask({...valueTask}));
  setValueTask({
    task: '',
    detail: '',
  });
  Keyboard.dismiss();
};

const Input = ({setInputTask_ref, keyboardShow}) => {
  const dispatch = useDispatch();
  
  let inputTask_ref = useRef(null);
  
  const [showDetails, setShowDetails] = useState(false);
  const [updateHeightInput, setUpdateHeightInput] = useState(40);
  const [valueTask, setValueTask] = useState({
    task: '',
    detail: '',
  });

  useEffect(() => {
    setShowDetails(false);
  }, [keyboardShow]);

  return (
    <View
      style={[
        {
          bottom: keyboardShow ? 0 : -40,
        },
        styles.content,
      ]}>
      <TextInput
        style={[
          _s_.input,
          styles.input,
          {
            fontSize: 20,
          },
        ]}
        placeholder="New task"
        placeholderTextColor="#ffffff80"
        ref={(ref) => {
          inputTask_ref = ref;
          setInputTask_ref(inputTask_ref);
        }}
        onChangeText={(task) => setValueTask({...valueTask, task})}
        value={valueTask.task}
      />
      {showDetails && (
        <TextInput
          style={[
            _s_.input,
            styles.input,
            {
              height: updateHeightInput,
              fontSize: 16,
            },
          ]}
          onContentSizeChange={(e) => {
            const {height} = e.nativeEvent.contentSize;
            height < 150 && height > 40 && setUpdateHeightInput(height);
          }}
          placeholder="Add details"
          placeholderTextColor="#ffffff80"
          multiline={true}
          onChangeText={(detail) => setValueTask({...valueTask, detail})}
          value={valueTask.detail}
        />
      )}
      <View style={styles.tabs}>
        <TouchableHighlight
          underlayColor="#1d201f"
          onPress={() => {
            setShowDetails(true);
          }}>
          <Text style={(_s_.text, {fontSize: 30, color: '#fff'})}>&#9783;</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="#1d201f"
          onPress={() => {
            _saveTask(setValueTask, dispatch, valueTask);
          }}>
          <Text style={(_s_.text, _s_.bodySize, {color: '#fff'})}>Save</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
export default Input;
const styles = StyleSheet.create({
  content: {
    backgroundColor: '#303136',
    paddingVertical: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tabs: {
    padding: 10,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    color: '#fff',
    marginVertical: 0,
    backgroundColor: 'transparent',
  },
});
