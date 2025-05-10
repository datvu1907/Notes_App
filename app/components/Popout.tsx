import { useEffect, useRef } from "react"
import { TouchableOpacity, StyleSheet, Animated, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { colors, spacing } from "@/theme"
import { Text } from "./Text"

const POPOUT_POSITION = Dimensions.get("window").height / 2 - 100

interface PopoutProps {
  message: string
  isVisible: boolean
  onDismiss?: () => void
  autoHideDuration?: number
}

export const Popout: React.FC<PopoutProps> = ({
  message,
  isVisible = false,
  onDismiss,
  autoHideDuration = 3000,
}) => {
  const opacityAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (isVisible) {
      // Show the popout
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start()

      // Auto hide after duration
      const timer = setTimeout(() => {
        hidePopout()
      }, autoHideDuration)

      return () => clearTimeout(timer)
    } else {
      hidePopout()
    }
  }, [isVisible])

  const hidePopout = () => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (onDismiss) onDismiss()
    })
  }

  const handlePress = () => {
    hidePopout()
  }

  if (!isVisible) return null

  return (
    <Animated.View style={[styles.container, { opacity: opacityAnim }]}>
      <TouchableOpacity activeOpacity={0.9} style={styles.touchable} onPress={handlePress}>
        <LinearGradient
          colors={[colors.palette.popout1, colors.palette.popout2]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Text preset="description" style={styles.text} text={message} />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    position: "absolute",
    top: POPOUT_POSITION,
    zIndex: 1000,
  },
  gradient: {
    alignItems: "center",
    borderRadius: 20,
    height: "100%",
    justifyContent: "center",
    padding: spacing.md,
    width: "100%",
  },
  text: {
    color: colors.palette.neutral100,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  touchable: {
    borderRadius: 20,
    height: 76,
    overflow: "hidden",
    width: 173,
  },
})
