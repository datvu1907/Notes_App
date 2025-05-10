import { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps, navigate } from "@/navigators"
import { Header, Screen } from "@/components"
import { colors } from "@/theme"
import { useStores } from "@/models"
import { NoteSections } from "./components/NoteSections"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@/models"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  const { noteStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const workAndStudyNotes = noteStore.getLatestNotesByCategory("Work and Study")
  const lifeNotes = noteStore.getLatestNotesByCategory("Life")
  const healthAndWellBeingNotes = noteStore.getLatestNotesByCategory("Health and Well-being")

  // Combine if you want a single array of notes:
  const recentNotes = [...workAndStudyNotes, ...lifeNotes, ...healthAndWellBeingNotes]

  // If you want them sorted together by date (most recent first):
  // const allRecentNotes = recentNotes.sort((a, b) => compareDesc(a.createdAt, b.createdAt))

  return (
    <Screen style={$root} preset="fixed" contentContainerStyle={$root}>
      <Header
        title="Home"
        titleMode="flex"
        showBackButton={false}
        rightIcon="icon_settings"
        rightIconColor={colors.palette.pink}
        onRightPress={() => {
          navigate("Setting")
        }}
      />
      <NoteSections data={recentNotes} />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
