import { ImageStyle, TextStyle, TouchableOpacity, ViewStyle, Image } from "react-native"
import { Icon, Text } from "@/components"
import { colors, spacing } from "@/theme"
import { navigate } from "@/navigators"
import { TxKeyPath } from "@/i18n"

export interface IMenu {
  titleTx: TxKeyPath
  icon: any
  screen: string
}

interface MenuItemProps {
  data: IMenu
}

export const MenuItem: React.FC<MenuItemProps> = ({ data }) => {
  const goToScreen = () => {
    navigate(data.screen)
  }

  return (
    <TouchableOpacity style={$container} activeOpacity={0.7} onPress={goToScreen}>
      <Image source={data.icon} style={$icon} />
      <Text tx={data.titleTx} preset="label" style={$text} />
      <Icon icon="icon_right" color={colors.palette.pink} />
    </TouchableOpacity>
  )
}

const $container: ViewStyle = {
  alignItems: "center",
  backgroundColor: "#FFFFFF0D",
  borderRadius: 16,
  flexDirection: "row",
  justifyContent: "space-between",
  borderWidth: 1,
  borderColor: "#FFFFFF1F",
  padding: spacing.md,
  gap: spacing.xs,
}
const $text: TextStyle = {
  flex: 1,
  color: colors.palette.white,
}
const $icon: ImageStyle = {
  width: 24,
  height: 24,
}
