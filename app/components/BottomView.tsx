import { StyleProp, View, ViewStyle } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { ReactNode } from "react"

interface BottomViewProps {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  gradientStyle?: StyleProp<ViewStyle>
  start?: { x: number; y: number }
  end?: { x: number; y: number }
}

export const BottomView: React.FC<BottomViewProps> = ({
  children,
  style,
  gradientStyle,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
}) => (
  <View style={[$bottomView, style]}>
    <LinearGradient
      colors={["#1C0B37", "#1D0837"]}
      start={start}
      end={end}
      style={[$gradient, gradientStyle]}
    />
    <View style={$content}>{children}</View>
  </View>
)

const $bottomView: ViewStyle = {
  paddingHorizontal: 16,
  paddingVertical: 16,
  position: "relative",
}

const $gradient: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
}

const $content: ViewStyle = {
  position: "relative",
  zIndex: 1,
}
