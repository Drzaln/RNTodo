import React, { Component } from 'react'
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TextInput,
  Picker
} from 'react-native'
import { Appbar } from 'react-native-paper'
import Categories from "../data/Categories";

export class AddTodo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      category: 1,
      categories: Categories,
      todos: [],
      todonya: this.props.navigation.getParam('item')
    }
  }
  onValueChange (value) {
    this.setState({
      category: value
    })
  }

  postTodo = async () => {
    let data = {
      todo_title: this.state.title,
      todo: this.state.description,
      id_category: this.state.category
    }
    if (this.state.title === '' || this.state.description === '') {
      Alert.alert('Isi semua data!!!')
    } else {
      await this.props
        .dispatch(editTodo(data, this.state.todonya.id_todo))
        .then(() => {
          this.props.navigation.navigate('Home')
        })
        .catch(() => {
          console.warn('error')
        })
    }
  }

  render () {
    const { todonya } = this.state
    return (
      <>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <View>
          <Appbar style={{ backgroundColor: 'white', elevation: 8 }}>
            <Appbar.BackAction
              onPress={() => this.props.navigation.navigate('Home')}
            />
            <Appbar.Content
              title='EDIT TODO'
              titleStyle={styles.headerTitle}
              style={{ alignItems: 'center' }}
            />
            <Appbar.Action
              icon='check-circle'
              onPress={() => this.postTodo()}
              color='#3DB39E'
            />
          </Appbar>
          <View style={styles.background}>
            <>
              <TextInput
                style={{
                  height: 50,
                  width: '100%'
                }}
                onChangeText={title => this.setState({ title })}
                placeholder={todonya.todo_title}
              />
              <TextInput
                style={{
                  height: 100,
                  width: '100%'
                }}
                onChangeText={description => this.setState({ description })}
                placeholder={todonya.todo}
                multiline
                numberOfLines={5}
              />
              <Picker
                todo
                mode='dropdown'
                style={{ width: '100%' }}
                selectedValue={todonya.category}
                onValueChange={this.onValueChange.bind(this)}
              >
                {this.state.categories.map((item, key) => {
                  return (
                    <Picker.Item
                      key={key}
                      label={item.category}
                      value={item.category}
                    />
                  )
                })}
              </Picker>
            </>
          </View>
        </View>
      </>
    )
  }
}

export default AddTodo

const styles = StyleSheet.create({
  gridView: {
    marginTop: 16,
    flex: 1,
    width: '100%'
  },
  itemContainer: {
    justifyContent: 'flex-start',
    borderRadius: 8,
    padding: 10
  },
  headerTitle: {
    fontFamily: 'Open Sans',
    fontSize: 15,
    fontWeight: 'bold'
  },
  background: {
    height: '90%',
    padding: 16,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    marginTop: 16
  },
  dateView: { alignItems: 'flex-end' },
  dateStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Open Sans',
    fontSize: 16
  },
  todoTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
    fontFamily: 'Open Sans'
  },
  category: {
    color: 'white',
    fontFamily: 'Open Sans',
    fontSize: 17,
    marginBottom: 16
  },
  todo: { color: 'white', fontSize: 18 },
  fab: {
    position: 'absolute',
    marginRight: 16,
    marginBottom: 32,
    right: 0,
    bottom: 0,
    backgroundColor: 'white'
  }
})