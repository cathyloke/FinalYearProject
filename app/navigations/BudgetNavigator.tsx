import React from "react";
import { RootStackParamList } from '../assets/Types';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { createStackNavigator } from "@react-navigation/stack";

import BudgetExpensesScreen from "../screens/mainMenu/BudgetExpensesScreen";

import BudgetDetails from "../screens/budgetMenu/BudgetDetails";
import CreateBudget from "../screens/budgetMenu/CreateBudget";
import CategoryDetails from "../screens/budgetMenu/CategoryDetails";
import AddExpenses from "../screens/budgetMenu/AddExpenses";

const Stack = createStackNavigator<RootStackParamList>();

const BudgetNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#C8A1E0', 
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              fontFamily: 'Itim-Regular',
              fontSize: 25,
          },
        }}>
          <Stack.Screen
            name="BudgetExpenses"
            component={BudgetExpensesScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="BudgetDetails"
            component={BudgetDetails}
            options={{
              title: 'Budget Details',
            }}
          />
          <Stack.Screen
            name="CreateBudget"
            component={CreateBudget}
            options={{
              title: 'Create Budget',
            }}
          />
          <Stack.Screen
            name="AddExpenses"
            component={AddExpenses}
            options={{
              title: 'Add Expenses',
            }}
          />
          <Stack.Screen
            name="CategoryDetails"
            component={CategoryDetails}
          />
          
        
  
      </Stack.Navigator>
    );
  }

  export default BudgetNavigator;