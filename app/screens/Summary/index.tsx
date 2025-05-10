import { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Image, TextStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Screen, Text } from "@/components"
import { Imgs } from "assets/images"
import { spacing } from "@/theme"
import { useStores } from "@/models"
import { SummarySections } from "./components/SummarySection"
import { BlurView } from "expo-blur"

interface SummaryScreenProps extends AppStackScreenProps<"Summary"> {}

export const SummaryScreen: FC<SummaryScreenProps> = observer(function SummaryScreen() {
  const {
    noteStore: { notes },
  } = useStores()
  return (
    <Screen style={$root} preset="fixed" contentContainerStyle={$root}>
      <View style={$header}>
        <Text tx="summary:title" preset="heading" style={headerText} />
        <Image source={Imgs.header_robot} />
      </View>
      <BlurView intensity={1} tint="dark" style={[$root, $blurView]}>
        <SummarySections data={notes} />
      </BlurView>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
const $header: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}
const headerText: TextStyle = {
  marginLeft: spacing.screen,
}

const $blurView: ViewStyle = {
  backgroundColor: "#FFFFFF0D",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
}
