import React, {Fragment} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';

import Item from '../Item';
import _s_ from '../../styles';

const _headerList = () => {
  return <Text style={[_s_.titleSize, styles.nameGroup]}>Tasks to do</Text>;
};
const _footerCompleted = (tasks, navigation) => {
  return (
    <View style={[styles.item, {borderBottomWidth: 0}]}>
      <TouchableHighlight>
        <Text style={[styles.title, {paddingHorizontal: 20}]}>Completed</Text>
      </TouchableHighlight>
      {tasks.map((task, index) => (
        <Item key={`c-${index}`} task={task} navigation={navigation} />
      ))}
    </View>
  );
};

const Tasks = ({navigation}) => {
  const tasks = useSelector((state) => state.Tasks);
  const tasksCompleted = tasks.filter((task) => task.completed);

  return (
    <View
      style={
        (styles.container,
        !tasks.length && {
          ...StyleSheet.absoluteFill,
          justifyContent: 'center',
          alignItems: 'center',
        })
      }>
      {tasks.length ? (
        <FlatList
          data={tasks}
          renderItem={({item, index}) =>
            !item.completed && (
              <Item key={index} task={item} navigation={navigation} />
            )
          }
          keyExtractor={(item) => item.id}
          ListHeaderComponent={_headerList}
          ListFooterComponent={
            tasksCompleted.length &&
            _footerCompleted(tasksCompleted, navigation)
          }
        />
      ) : (
        <Fragment>
          <Image
            resizeMode="contain"
            style={[styles.backgroundHome]}
            source={require('../../static/img/home1.png')}
          />
          <Text style={{color: '#fff', fontSize: 18}}>Anithing to add?</Text>
        </Fragment>
      )}
    </View>
  );
};

export default Tasks;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff40',
  },
  nameGroup: {
    color: '#fff',
    fontSize: 38,
    paddingLeft: 40,
    paddingVertical: 15,
  },
  title: {
    color: '#fff',
    fontSize: 18,
  },
  detail: {
    color: '#fff',
    fontSize: 14,
  },
  check: {
    height: 25,
    width: 25,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  backgroundHome: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});
