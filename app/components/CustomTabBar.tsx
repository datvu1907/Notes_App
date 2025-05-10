import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { View, ViewStyle, Image, TextStyle, TouchableOpacity } from "react-native"
import { Text } from "./Text"
import { LinearGradient } from "expo-linear-gradient"
import { Icon, iconRegistry } from "./"
import { useAppTheme } from "@/utils/useAppTheme"
import { TxKeyPath } from "@/i18n"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { colors, spacing } from "@/theme"
import { navigate } from "@/navigators"

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const {
    theme: { colors },
  } = useAppTheme()
  const { bottom } = useSafeAreaInsets()
  console.log(bottom)

  const handleCustomButtonPress = () => {
    navigate("AddNote")
  }

  return (
    <View style={$container}>
      <LinearGradient
        colors={["#1C0B37", "#1D0837"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={$gradient}
      />
      <View style={$tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }

          return (
            <View key={route.key} style={$tabItem} onTouchEnd={onPress}>
              {route.name === "Home" ? (
                <Image
                  source={isFocused ? iconRegistry.home_active : iconRegistry.home_inactive}
                  style={$iconStyle}
                />
              ) : (
                <Image
                  source={isFocused ? iconRegistry.summary_active : iconRegistry.summary_inactive}
                  style={$iconStyle}
                />
              )}
              <Text
                style={[
                  $tabLabel,
                  { color: isFocused ? colors.palette.pink : colors.palette.grey },
                ]}
                tx={`tabNavigator:${route.name}` as TxKeyPath}
              />
            </View>
          )
        })}
      </View>
      <TouchableOpacity style={$customButton} onPress={handleCustomButtonPress}>
        <Icon icon="icon_add" style={$customButtonIcon} color={colors.palette.primary} />
      </TouchableOpacity>
    </View>
  )
}

const $container: ViewStyle = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  minHeight: 100,
}

const $gradient: ViewStyle = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  minHeight: 100,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
}

const $tabBar: ViewStyle = {
  flexDirection: "row",
  height: 100,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  overflow: "hidden",
}

const $tabItem: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingTop: spacing.md,
}

const $tabLabel: TextStyle = {
  fontSize: 12,
  marginTop: spacing.xxs,
}

const $iconStyle = { width: 47, height: 47 }

const $customButton: ViewStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: [{ translateX: -18 }, { translateY: -18 }],
  width: 36,
  height: 36,
  borderRadius: 7,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderColor: colors.text,
  backgroundColor: colors.palette.grey,
  zIndex: 1,
}

const $customButtonIcon = {
  width: 20,
  height: 20,
}
