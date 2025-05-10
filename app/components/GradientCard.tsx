import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { Icon, Text } from "@/components"
import { colors, spacing } from "@/theme"
import { getPreviewText } from "@/utils/string"

interface GradientCardProps {
  title: string
  onPress?: () => void
  maxWordCount?: number
  showRightIcon?: boolean
}

export const GradientCard: React.FC<GradientCardProps> = ({
  title,
  onPress,
  maxWordCount,
  showRightIcon = true,
}) => (
  <TouchableOpacity style={$container} onPress={onPress} activeOpacity={0.7}>
    <Text
      text={maxWordCount ? getPreviewText(title, maxWordCount) : title}
      preset="description"
      style={$text}
    />
    {showRightIcon && <Icon icon="icon_right" color={colors.palette.pink} />}
  </TouchableOpacity>
)

const $container: ViewStyle = {
  alignItems: "center",
  backgroundColor: "#FFFFFF0D",
  borderRadius: 16,
  flexDirection: "row",
  justifyContent: "space-between",
  marginVertical: 6,
  borderWidth: 1,
  borderColor: "#FFFFFF1F",
  padding: spacing.md,
  gap: spacing.xs,
}
const $text: TextStyle = {
  flex: 1,
  color: colors.palette.white,
}
