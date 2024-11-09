import React from "react";
import { RootStackParamList } from '../assets/Types';

import { createStackNavigator } from "@react-navigation/stack";

import BudgetExpensesScreen from "../screens/mainMenu/BudgetExpensesScreen";

import BudgetDetails from "../screens/budgetExpensesMenu/BudgetDetails";
import CreateBudget from "../screens/budgetExpensesMenu/budget/CreateBudget";
import UpdateBudget from "../screens/budgetExpensesMenu/budget/UpdateBudget";
import CategoryDetails from "../screens/budgetExpensesMenu/CategoryDetails";
import AddExpenses from "../screens/budgetExpensesMenu/expenses/AddExpenses";
import UpdateExpenses from "../screens/budgetExpensesMenu/expenses/UpdateExpenses";

const Stack = createStackNavigator<RootStackParamList>();

const BudgetNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#E2BFD9', 
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              fontFamily: 'Itim-Regular',
              fontSize: 25,
          },
          headerBackTitleVisible: false
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
            name="UpdateBudget"
            component={UpdateBudget}
            options={{
              title: 'Update Budget',
            }}
          />
          <Stack.Screen
            name="CategoryDetails"
            component={CategoryDetails}
            options={{
              title: 'Expenses Details',
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
            name="UpdateExpenses"
            component={UpdateExpenses}
            options={{
              title: 'Update Expenses',
            }}
          />
          
          
        
  
      </Stack.Navigator>
    );
  }

  export default BudgetNavigator;