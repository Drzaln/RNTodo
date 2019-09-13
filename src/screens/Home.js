import React, { Component } from 'react'
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { Appbar, Avatar, Searchbar, FAB } from 'react-native-paper'
import { FlatGrid } from 'react-native-super-grid'
import Todo from '../data/Todo'

export class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      todos: Todo,
      refresh: ''
    }
    this.props.navigation.addListener('willFocus', async () => {
      this.addTodo()
    })
  }

  addTodo = () => {
    this.setState({
      todos: Todo
    })
  }

  deleteTodo = id => {
    Todo.splice(this.state.todos.id - 1, 1)
    this.setState({
      refresh: this.state.refresh
    })
  }

  render () {
    return (
      <>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <View>
          <Appbar style={{ backgroundColor: 'white', elevation: 8 }}>
            <Appbar.Content
              title='TODO APP'
              titleStyle={styles.headerTitle}
              style={{ alignItems: 'center' }}
            />
          </Appbar>
          <View style={styles.background}>
            <FlatGrid
              showsVerticalScrollIndicator={false}
              itemDimension={130}
              items={this.state.todos}
              style={styles.gridView}
              spacing={16}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    this.props.navigation.navigate('EditTodo', {
                      item
                    })
                  }
                >
                  <View
                    style={[
                      styles.itemContainer,
                      item.category === 'work'
                        ? { backgroundColor: '#C0EB6A' }
                        : { backgroundColor: '#FAD06C' }
                    ]}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => this.deleteTodo(Todo.id)}
                      >
                        <View style={styles.deleteView}>
                          <Text style={styles.deleteStyle}>DELETE</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <View style={styles.dateView}>
                          <Text style={styles.dateStyle}>DONE</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Text numberOfLines={1} style={styles.todoTitle}>
                      {item.todo_title}
                    </Text>

                    <Text style={styles.category}>{item.category}</Text>

                    <Text numberOfLines={2} style={styles.todo}>
                      {item.todo}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <FAB
            style={styles.fab}
            icon='add'
            color='black'
            onPress={() => this.props.navigation.navigate('AddTodo')}
          />
        </View>
      </>
    )
  }
}

export default Home

const styles = StyleSheet.create({
  gridView: {
    marginTop: 16,
    flex: 1,
    width: '100%'
  },
  itemContainer: {
    justifyContent: 'flex-start',
    borderRadius: 8,
    padding: 10,
    height: 170
  },
  headerTitle: {
    fontFamily: 'Open Sans',
    fontSize: 20,
    fontWeight: 'bold'
  },
  background: {
    height: '90%',
    padding: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 16
  },
  dateView: { alignItems: 'flex-end' },
  dateStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Open Sans',
    fontSize: 16
  },
  deleteView: { alignItems: 'flex-start' },
  deleteStyle: {
    color: '#ff6961',
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
