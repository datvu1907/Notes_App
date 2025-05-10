import { FC, useMemo, useCallback } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { BottomView, CustomDropdown, Header, Screen, TextField, GradientButton } from "@/components"
import { spacing } from "@/theme"
import { Controller, useForm } from "react-hook-form"
import { IFormNote } from "@/types"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useStores } from "@/models"
import { CATEGORIES, ICategory } from "@/models/Note"

const schema = yup.object().shape({
  category: yup.string().required("Please select a category"),
  content: yup
    .string()
    .required("Please input note content")
    .max(200, "Note content cannot exceed 200 characters"),
})

interface AddNoteScreenProps extends AppStackScreenProps<"AddNote"> {}

export const AddNoteScreen: FC<AddNoteScreenProps> = observer(function AddNoteScreen({
  navigation,
}) {
  const { noteStore } = useStores()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<IFormNote>({
    resolver: yupResolver(schema),
    defaultValues: { category: "", content: "" },
    mode: "onChange",
  })

  const dropdownData = useMemo(
    () =>
      CATEGORIES.map((category) => ({
        label: category,
        value: category,
      })),
    [],
  )

  const onSubmit = useCallback(
    (data: IFormNote) => {
      try {
        noteStore.addNote({
          content: data.content,
          category: data.category as ICategory,
        } as any)
        navigation.goBack()
      } catch (error) {
        console.error("Error adding note:", error)
      }
    },
    [noteStore, navigation],
  )

  const handleSubmitForm = useCallback(() => {
    handleSubmit(onSubmit)()
  }, [handleSubmit, onSubmit])

  const handleCategoryChange = useCallback(
    (onChange: (value: string) => void) => (item: { value: string }) => {
      onChange(item.value)
    },
    [],
  )

  return (
    <Screen style={$root} preset="fixed" contentContainerStyle={$root}>
      <Header titleTx="newNote:title" titleMode="flex" showBackButton={true} />
      <View style={$body}>
        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, value } }) => (
            <CustomDropdown
              placeholderTx="newNote:dropdownPlaceholder"
              data={dropdownData}
              value={value}
              onChange={handleCategoryChange(onChange)}
              status={errors.category?.message ? "error" : undefined}
              helper={errors.category?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="content"
          render={({ field }) => (
            <TextField
              placeholderTx="newNote:inputPlaceholder"
              value={field.value}
              onChangeText={field.onChange}
              style={$input}
              multiline={true}
              maxLength={200}
              helper={errors.content?.message}
              status={errors.content?.message ? "error" : undefined}
            />
          )}
        />
      </View>

      <BottomView>
        <GradientButton
          tx="button:save"
          onPress={handleSubmitForm}
          style={$buttonStyle}
          disabled={!isValid || !isDirty}
        />
      </BottomView>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $body: ViewStyle = {
  flex: 1,
  padding: spacing.screen,
  gap: spacing.md,
}

const $buttonStyle: ViewStyle = {
  marginVertical: 8,
  marginHorizontal: 80,
}

const $input: ViewStyle = {
  minHeight: 260,
}
