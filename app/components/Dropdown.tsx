import { ComponentType, forwardRef, Ref, useImperativeHandle, useRef } from "react"
import { ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { translate } from "@/i18n"
import type { ThemedStyle } from "@/theme"
import { $styles } from "../theme"
import { Text, TextProps } from "./Text"
import { useAppTheme } from "@/utils/useAppTheme"
import { BlurView } from "expo-blur"
import { Dropdown } from "react-native-element-dropdown"
import { Icon } from "./Icon"

export interface DropdownAccessoryProps {
  style: StyleProp<ViewStyle | TextStyle | ImageStyle>
  status: DropdownProps["status"]
  editable: boolean
}

export interface DropdownProps {
  /**
   * A style modifier for different input states.
   */
  status?: "error" | "disabled"
  /**
   * The label text to display if not using `labelTx`.
   */
  label?: TextProps["text"]
  /**
   * Label text which is looked up via i18n.
   */
  labelTx?: TextProps["tx"]
  /**
   * Optional label options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  labelTxOptions?: TextProps["txOptions"]
  /**
   * Pass any additional props directly to the label Text component.
   */
  LabelTextProps?: TextProps
  /**
   * The helper text to display if not using `helperTx`.
   */
  helper?: TextProps["text"]
  /**
   * Helper text which is looked up via i18n.
   */
  helperTx?: TextProps["tx"]
  /**
   * Optional helper options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  helperTxOptions?: TextProps["txOptions"]
  /**
   * Pass any additional props directly to the helper Text component.
   */
  HelperTextProps?: TextProps
  /**
   * The placeholder text to display if not using `placeholderTx`.
   */
  placeholder?: TextProps["text"]
  /**
   * Placeholder text which is looked up via i18n.
   */
  placeholderTx?: TextProps["tx"]
  /**
   * Optional placeholder options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  placeholderTxOptions?: TextProps["txOptions"]
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Style overrides for the dropdown wrapper
   */
  dropdownWrapperStyle?: StyleProp<ViewStyle>
  /**
   * Style overrides for the dropdown itself
   */
  dropdownStyle?: StyleProp<ViewStyle>
  /**
   * Style for selected item text
   */
  selectedTextStyle?: StyleProp<TextStyle>
  /**
   * Style for the placeholder text
   */
  placeholderStyle?: StyleProp<TextStyle>
  /**
   * Style for each item in the dropdown
   */
  itemTextStyle?: StyleProp<TextStyle>
  /**
   * Array of items to display in the dropdown
   */
  data: Array<{ label: string; value: any }>
  /**
   * Currently selected value
   */
  value: any
  /**
   * Function to call when the selection changes
   */
  onChange: (item: any) => void
  /**
   * Set a custom height for the dropdown (defaults to 48)
   */
  fieldHeight?: number
  /**
   * Set a custom max height for the dropdown list (defaults to 200)
   */
  maxHeight?: number
  /**
   * An optional component to render on the left side of the dropdown.
   * Example: `LeftAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  LeftAccessory?: ComponentType<DropdownAccessoryProps>
}

/**
 * A dropdown component that maintains the look and feel of the TextField.
 * @param {DropdownProps} props - The props for the `Dropdown` component.
 * @returns {JSX.Element} The rendered `Dropdown` component.
 */
export const CustomDropdown = forwardRef(function CustomDropdown(
  props: DropdownProps,
  ref: Ref<any>,
) {
  const {
    labelTx,
    label,
    labelTxOptions,
    placeholderTx,
    placeholder,
    placeholderTxOptions,
    helper,
    helperTx,
    helperTxOptions,
    status,
    LeftAccessory,
    HelperTextProps,
    LabelTextProps,
    containerStyle: $containerStyleOverride,
    dropdownWrapperStyle: $dropdownWrapperStyleOverride,
    dropdownStyle: $dropdownStyleOverride,
    selectedTextStyle: $selectedTextStyleOverride,
    placeholderStyle: $placeholderStyleOverride,
    itemTextStyle: $itemTextStyleOverride,
    data,
    value,
    onChange,
    fieldHeight = 48,
    maxHeight = 200,
    ...restProps
  } = props

  const dropdownRef = useRef(null)

  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  const disabled = status === "disabled"

  const placeholderContent = placeholderTx
    ? translate(placeholderTx, placeholderTxOptions)
    : placeholder

  const $containerStyles = [$containerStyleOverride]

  const $labelStyles = [$labelStyle, LabelTextProps?.style]

  const $dropdownWrapperStyles = [
    $styles.row,
    $dropdownWrapperStyle,
    status === "error" && { borderColor: colors.error },
    { minHeight: fieldHeight },
    LeftAccessory && { paddingStart: 0 },
    $dropdownWrapperStyleOverride,
  ]

  const $dropdownStyles = [$dropdownStyle, $dropdownStyleOverride]

  const $selectedTextStyles = [$selectedTextStyle, $selectedTextStyleOverride]

  const $placeholderStyles = [$placeholderStyle, $placeholderStyleOverride]

  const $itemTextStyles = [$itemTextStyle, $itemTextStyleOverride]

  const $helperStyles = [
    $helperStyle,
    status === "error" && { color: colors.error },
    HelperTextProps?.style,
  ]

  useImperativeHandle(ref, () => dropdownRef.current)

  const renderItem = (item: any) => {
    return (
      <View style={$itemContainerStyle}>
        <Text style={themed($itemTextStyles)}>{item.label}</Text>
      </View>
    )
  }

  return (
    <View style={$containerStyles}>
      {!!(label || labelTx) && (
        <Text
          preset="formLabel"
          text={label}
          tx={labelTx}
          txOptions={labelTxOptions}
          {...LabelTextProps}
          style={themed($labelStyles)}
        />
      )}

      <View style={themed($dropdownWrapperStyles)}>
        {!!LeftAccessory && (
          <LeftAccessory style={themed($leftAccessoryStyle)} status={status} editable={!disabled} />
        )}

        <BlurView intensity={42} style={[themed($blurViewStyle), { height: fieldHeight }]}>
          <Dropdown
            labelField="label"
            valueField="value"
            ref={dropdownRef}
            data={data}
            value={value}
            onChange={onChange}
            placeholder={placeholderContent}
            placeholderStyle={themed($placeholderStyles)}
            selectedTextStyle={themed($selectedTextStyles)}
            itemTextStyle={themed($itemTextStyles)}
            style={themed($dropdownStyles)}
            containerStyle={[
              themed($dropdownContainerStyle),
              {
                maxHeight: maxHeight,
              },
            ]}
            activeColor="#FFFFFF1A"
            renderItem={renderItem}
            disable={disabled}
            renderRightIcon={() => <Icon icon="icon_down" size={24} color={colors.palette.white} />}
            {...restProps}
          />
        </BlurView>
      </View>

      {!!(helper || helperTx) && (
        <Text
          preset="formHelper"
          text={helper}
          tx={helperTx}
          txOptions={helperTxOptions}
          {...HelperTextProps}
          style={themed($helperStyles)}
        />
      )}
    </View>
  )
})

const $labelStyle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
})

const $dropdownWrapperStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "flex-start",
  borderWidth: 1,
  borderRadius: spacing.md,
  backgroundColor: "#FFFFFF0D",
  borderColor: "#FFFFFF1F",
  overflow: "hidden",
})

const $blurViewStyle: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  width: "100%",
})

const $dropdownStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  height: "100%",
  paddingHorizontal: spacing.sm,
})

const $selectedTextStyle: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  fontFamily: typography.primary.normal,
  color: colors.palette.white,
  fontSize: 16,
})

const $placeholderStyle: ThemedStyle<TextStyle> = () => ({
  color: "#FFFFFFE5",
  fontSize: 16,
})

const $itemTextStyle: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  fontFamily: typography.primary.normal,
  color: colors.palette.white,
  fontSize: 16,
})

const $itemContainerStyle = {
  padding: 10,
}

const $helperStyle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
})

const $leftAccessoryStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginStart: spacing.xs,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
})
const $dropdownContainerStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  borderRadius: spacing.md,
  backgroundColor: "#23232D",
  borderWidth: 1,
  borderColor: "#FFFFFF1F",
})
