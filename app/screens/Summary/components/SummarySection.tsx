import { SectionList, View, Image, ViewStyle, TextStyle, ImageStyle } from "react-native"
import { GradientButton, Text } from "@/components"
import { colors, spacing } from "@/theme"
import { ICategory, Note } from "@/models/Note"
import { observer } from "mobx-react-lite"

import { Imgs } from "assets/images"
import { GradientCard } from "@/components/GradientCard"
import { translate } from "@/i18n"

interface SummarySectionsProps {
  data: Note[]
}

const CATEGORY_CONFIG = [
  {
    key: "Work and Study" as ICategory,
    logo: Imgs.category_work,
    label: "Work and study",
  },
  {
    key: "Life" as ICategory,
    logo: Imgs.category_life,
    label: "Life",
  },
  {
    key: "Health and Well-being" as ICategory,
    logo: Imgs.category_health,
    label: "Health and wellness",
  },
]

export const SummarySections = observer(function SummarySections({ data }: SummarySectionsProps) {
  const sections = CATEGORY_CONFIG.map((cat) => {
    const categoryNotes = data.filter((note) => note.category === cat.key)
    return {
      title: cat.label,
      icon: cat.logo,
      category: cat.key,
      data: [{ count: categoryNotes.length, category: cat.key }],
    }
  })

  return (
    <View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => `${item.category}_${item.count}`}
        renderSectionHeader={({ section }) => (
          <View style={$categoryContainer}>
            <View style={$sectionHeader}>
              <View style={$avatarContainer}>
                <Image source={section.icon} style={$avatar} />
              </View>
              <Text text={section.title} preset="subheading" style={$sectionTitle} />
            </View>
            <GradientButton text="Detail" style={$detailButton} textStyle={$detailButtonText} />
          </View>
        )}
        renderItem={({ item }) => (
          <GradientCard
            title={translate("summary:summaryRecord", { number: item.count })}
            showRightIcon={false}
          />
        )}
        style={$sectionList}
        contentContainerStyle={{ paddingHorizontal: spacing.screen }}
        stickySectionHeadersEnabled={false}
      />
    </View>
  )
})

const $sectionList: ViewStyle = {
  height: "100%",
}

const $sectionHeader: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  marginBottom: 8,
  marginTop: 24,
}
const $sectionTitle: TextStyle = {
  color: colors.palette.white,
  marginLeft: 8,
}

const $detailButton: ViewStyle = {
  paddingVertical: spacing.xs,
}

const $detailButtonText: TextStyle = {
  fontSize: 14,
  fontWeight: "500",
}

const $categoryContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $avatarContainer: ViewStyle = {
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
}

const $avatar: ImageStyle = {
  width: 48,
  height: 48,
}
