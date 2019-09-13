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
import Categories from '../data/Categories'

export class AddTodo extends Component {
  constructor (props) {
    super(props)
    this.state = { title: '', note: '', categories: Categories }
  }
  onValueChange (value) {
    this.setState({
      category: value
    })
  }

  postTodo = async () => {
    let data = {
      id: Todo.length + 1,
      todo_title: this.state.title,
      todo: this.state.note,
      category: this.state.category
    }
    Todo.push(data)
    this.props.navigation.navigate('Home')
  }

  render () {
    return (
      <>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <View>
          <Appbar style={{ backgroundColor: 'white', elevation: 8 }}>
            <Appbar.BackAction
              onPress={() => this.props.navigation.navigate('Home')}
            />
            <Appbar.Content
              title='ADD TODO'
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
            <TextInput
              style={{
                height: 50,
                width: '100%'
              }}
              onChangeText={title => this.setState({ title })}
              placeholder='ADD TITLE...'
            />
            <TextInput
              style={{
                height: 100,
                width: '100%'
              }}
              onChangeText={note => this.setState({ note })}
              placeholder='ADD NOTE...'
              multiline
              numberOfLines={5}
            />
            <Picker
              todo
              mode='dropdown'
              style={{ width: '100%' }}
              selectedValue={this.state.category}
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
