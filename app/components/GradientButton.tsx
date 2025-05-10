import { ComponentType, ReactNode } from "react"
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Text, TextProps } from "./Text" // Adjust import path as needed

export interface GradientButtonAccessoryProps {
  style: StyleProp<any>
  pressableState: PressableStateCallbackType
  disabled?: boolean
}

export interface GradientButtonProps extends PressableProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TextProps["tx"]
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: TextProps["text"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TextProps["txOptions"]
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An optional style override for the "pressed" state.
   */
  pressedStyle?: StyleProp<ViewStyle>
  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * An optional style override for the button text when in the "pressed" state.
   */
  pressedTextStyle?: StyleProp<TextStyle>
  /**
   * An optional style override for the button text when in the "disabled" state.
   */
  disabledTextStyle?: StyleProp<TextStyle>
  /**
   * An optional component to render on the right side of the text.
   * Example: `RightAccessory={(props) => <View {...props} />}`
   */
  RightAccessory?: ComponentType<GradientButtonAccessoryProps>
  /**
   * An optional component to render on the left side of the text.
   * Example: `LeftAccessory={(props) => <View {...props} />}`
   */
  LeftAccessory?: ComponentType<GradientButtonAccessoryProps>
  /**
   * Children components.
   */
  children?: ReactNode
  /**
   * disabled prop, accessed directly for declarative styling reasons.
   */
  disabled?: boolean
  /**
   * An optional style override for the disabled state
   */
  disabledStyle?: StyleProp<ViewStyle>
  /**
   * Optional gradient colors array
   */
  colors?: string[]
  /**
   * Optional gradient start point
   */
  start?: { x: number; y: number }
  /**
   * Optional gradient end point
   */
  end?: { x: number; y: number }
}

/**
 * A button component with a gradient background.
 * @param {GradientButtonProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export function GradientButton(props: GradientButtonProps) {
  const {
    tx,
    text,
    txOptions,
    style: $viewStyleOverride,
    pressedStyle: $pressedViewStyleOverride,
    textStyle: $textStyleOverride,
    pressedTextStyle: $pressedTextStyleOverride,
    disabledTextStyle: $disabledTextStyleOverride,
    children,
    RightAccessory,
    LeftAccessory,
    disabled,
    disabledStyle: $disabledViewStyleOverride,
    colors = ["#F94695", "#F13A76"],
    start = { x: 0, y: 0 },
    end = { x: 0, y: 1 },
    ...rest
  } = props

  /**
   * Returns the appropriate text style based on component state
   */
  function $textStyle({ pressed }: PressableStateCallbackType): StyleProp<TextStyle> {
    return [
      $baseTextStyle,
      $textStyleOverride,
      !!pressed && [$pressedTextStyle, $pressedTextStyleOverride],
      !!disabled && $disabledTextStyleOverride,
    ]
  }

  return (
    <Pressable
      style={[$baseViewStyle, $viewStyleOverride, !!disabled && $disabledViewStyleOverride]}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      {...rest}
    >
      {(state) => {
        const pressedState = state.pressed
        const opacityValue = pressedState ? 0.9 : 1
        const pressedColors = pressedState ? colors.map((c) => `${c}DD`) : colors

        return (
          // eslint-disable-next-line react-native/no-inline-styles
          <View style={[$container, { opacity: disabled ? 0.5 : 1 }]}>
            <LinearGradient
              colors={disabled ? ["#AAAAAA", "#888888"] : (pressedColors as any)}
              start={start}
              end={end}
              style={[
                $gradientStyle,
                pressedState && $pressedViewStyleOverride,
                { opacity: opacityValue },
              ]}
            />

            <View style={$contentContainer}>
              {!!LeftAccessory && (
                <LeftAccessory
                  style={$leftAccessoryStyle}
                  pressableState={state}
                  disabled={disabled}
                />
              )}

              <Text tx={tx} text={text} txOptions={txOptions} style={$textStyle(state)}>
                {children}
              </Text>

              {!!RightAccessory && (
                <RightAccessory
                  style={$rightAccessoryStyle}
                  pressableState={state}
                  disabled={disabled}
                />
              )}
            </View>
          </View>
        )
      }}
    </Pressable>
  )
}

// Base styles
const $baseViewStyle: ViewStyle = {
  minHeight: 34,
  borderRadius: 24,
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  position: "relative",
}

const $container: ViewStyle = {
  width: "100%",
  position: "relative",
  borderRadius: 24,
  overflow: "hidden",
}

const $gradientStyle: ViewStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
}

const $contentContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 16,
  paddingVertical: 8,
}

const $baseTextStyle: TextStyle = {
  fontSize: 14,
  lineHeight: 20,
  fontWeight: "600",
  textAlign: "center",
  color: "white",
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2,
}

const $pressedTextStyle: TextStyle = {
  opacity: 0.9,
}

const $rightAccessoryStyle: ViewStyle = {
  marginStart: 8,
  zIndex: 1,
}

const $leftAccessoryStyle: ViewStyle = {
  marginEnd: 8,
  zIndex: 1,
}
