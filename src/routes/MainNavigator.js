import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Home from '../screens/Home'
import AddTodo from "../screens/AddTodo";
import EditTodo from "../screens/EditTodo";
const AppNavigator = createStackNavigator(
  {
    Home,
    AddTodo,
    EditTodo
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home'
  }
)

export default createAppContainer(AppNavigator)