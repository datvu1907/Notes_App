import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { translate } from "@/i18n"
import { SummaryScreen, HomeScreen } from "../screens"

import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

import { CustomTabBar } from "../components/CustomTabBar"

export type HomeTabParamList = {
  Home: undefined
  NewNote: undefined
  Summary: undefined
}
export type HomeTabScreenProps<T extends keyof HomeTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const HomeTab = createBottomTabNavigator<HomeTabParamList>()

export function HomeNavigator() {
  return (
    <>
      <HomeTab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
        }}
      >
        <HomeTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: translate("tabNavigator:homeTab"),
          }}
        />
        <HomeTab.Screen
          name="Summary"
          component={SummaryScreen}
          options={{
            tabBarLabel: translate("tabNavigator:summaryTab"),
          }}
        />
      </HomeTab.Navigator>
    </>
  )
}
