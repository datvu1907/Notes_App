import { FC, useCallback, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { BottomView, GradientButton, Header, iconRegistry, Popout, Screen } from "@/components"
import { spacing } from "@/theme"
import { MenuItem } from "./components/MenuItem"
import { translate, TxKeyPath } from "@/i18n"
import { useStores } from "@/models"

interface SettingScreenProps extends AppStackScreenProps<"Setting"> {}

export const SettingScreen: FC<SettingScreenProps> = observer(function SettingScreen() {
  const { noteStore } = useStores()
  const [popoutVisible, setPopoutVisible] = useState(false)

  const onDeleteAllNotes = useCallback(() => {
    noteStore.deleteAllNotes()
    setPopoutVisible(true)
  }, [noteStore])

  const settingMenu = [
    {
      titleTx: "setting:onlineCustomer" as TxKeyPath,
      icon: iconRegistry.icon_customer,
      screen: "OnlineCustomer",
    },
    {
      titleTx: "setting:agreement" as TxKeyPath,
      icon: iconRegistry.icon_agreement,
      screen: "Agreement",
    },
    {
      titleTx: "setting:privacyPolicy" as TxKeyPath,
      icon: iconRegistry.icon_policy,
      screen: "PrivacyPolicy",
    },
    {
      titleTx: "setting:aboutUs" as TxKeyPath,
      icon: iconRegistry.icon_about,
      screen: "About",
    },
  ]
  return (
    <Screen style={$root} preset="fixed" contentContainerStyle={$root}>
      <Header titleTx="setting:title" titleMode="flex" showBackButton={true} />
      <View style={$body}>
        {settingMenu.map((item) => (
          <MenuItem key={item.titleTx} data={item} />
        ))}
      </View>
      <BottomView>
        <GradientButton tx="button:delete" style={$buttonStyle} onPress={onDeleteAllNotes} />
      </BottomView>
      <Popout
        message={translate("setting:deleteAllNotes")}
        isVisible={popoutVisible}
        onDismiss={() => setPopoutVisible(false)}
        autoHideDuration={1000} // Optional: auto-hide after 1 seconds
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $body: ViewStyle = {
  flex: 1,
  padding: spacing.screen,
  gap: spacing.md,
}
const $buttonStyle: ViewStyle = {
  marginVertical: 8,
  marginHorizontal: 80,
}
