import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors'

const FieldValuePairInput = ({
  field,
  value,
  style,
  fontSize,
  onChangeText,
  onPress,
  editable = true,
  keyboardType,
  maxLength,
  children,
}) => {
  return (
    <View style={[styles.Container, style && style]}>
      <Text style={[styles.FieldText, fontSize && { fontSize: fontSize }]} numberOfLines={1}>{field}</Text>
      {
        (onChangeText || !editable) &&
        <TextInput
          value={value}
          style={[styles.TextInput, !editable && { color: COLOR.GRAY }]}
          placeholder={field}
          placeholderTextColor={COLOR.GRAY}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          editable={editable}
          maxLength={maxLength}
        />
      }
      {
        onPress &&
        <TouchableOpacity
          style={styles.TextInput}
          onPress={onPress}
        >
          <Text style={styles.ValueText} numberOfLines={1}>{value}</Text>
        </TouchableOpacity>
      }
      {children}
    </View>
  )
}

export default FieldValuePairInput

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  FieldText: {
    color: COLOR.BLACK,
    fontSize: 13,
    marginRight: 10,
    width: '35%',
  },
  TextInput: {
    flex: 1,
    borderRadius: 13,
    color: COLOR.BLACK,
    backgroundColor: COLOR.BORDERCOLOR,
    fontSize: 12,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginLeft: 5,
  },
  ValueText: {
    color: COLOR.BLACK,
    fontSize: 12,
  },
})