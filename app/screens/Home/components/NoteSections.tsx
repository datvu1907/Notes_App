import { SectionList, View, Image, ViewStyle, TextStyle, ImageStyle } from "react-native"
import { Icon, iconRegistry, Text } from "@/components"
import { colors, spacing } from "@/theme"
import { ICategory, Note } from "@/models/Note"
import { GradientCard } from "@/components/GradientCard"
import { Imgs } from "assets/images"

interface NoteSectionsProps {
  data: Note[]
  onNotePress?: (note: Note) => void
}

const CATEGORY_CONFIG = [
  {
    key: "Work and Study" as ICategory,
    icon: iconRegistry.icon_pen,
    label: "Work and study",
  },
  {
    key: "Life" as ICategory,
    icon: iconRegistry.icon_cook,
    label: "Life",
  },
  {
    key: "Health and Well-being" as ICategory,
    icon: iconRegistry.icon_health,
    label: "Health and wellness",
  },
]

export const NoteSections: React.FC<NoteSectionsProps> = ({ data, onNotePress }) => {
  const sections = CATEGORY_CONFIG.map((item) => ({
    title: item.label,
    icon: item.icon,
    data: data.filter((note) => note.category === item.key),
  })).filter((section) => section.data.length > 0)

  if (data.length === 0) {
    return (
      <View style={$emptyContainer}>
        <Image source={Imgs.empty_note} style={$emptyImage} />
        <Text tx="home:noNote" preset="label" style={$emptyText} />
      </View>
    )
  }

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={$header}>
          <Icon icon="icon_clock" color={colors.palette.white} />
          <Text tx="home:recentNote" preset="label" style={$headerText} />
        </View>
      }
      renderSectionHeader={({ section }) => (
        <View style={$sectionHeader}>
          <Image source={section.icon} />
          <Text text={section.title} preset="subheading" style={$sectionTitle} />
        </View>
      )}
      renderItem={({ item }) => (
        <GradientCard title={item.content} onPress={() => onNotePress?.(item)} maxWordCount={4} />
      )}
      style={$sectionList}
      contentContainerStyle={$sectionListContentContainer}
      stickySectionHeadersEnabled={false}
    />
  )
}
const $sectionList: ViewStyle = {
  height: "100%",
}
const $header: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
}

const $sectionHeader: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  marginBottom: 8,
  marginTop: 24,
}
const $headerText: TextStyle = {
  color: colors.palette.white,
  opacity: 0.7,
}
const $sectionTitle: TextStyle = {
  color: colors.palette.white,
  marginLeft: 8,
}
const $sectionListContentContainer: ViewStyle = {
  padding: spacing.screen,
  paddingBottom: 100,
}

const $emptyContainer: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 1,
  padding: spacing.screen,
  gap: spacing.md,
}
const $emptyText: TextStyle = {
  color: colors.palette.white,
}
const $emptyImage: ImageStyle = {
  width: 150,
  height: 150,
}
