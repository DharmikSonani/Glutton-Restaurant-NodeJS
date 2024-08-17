import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors'
import LinearGradient from 'react-native-linear-gradient'

const FieldValuePairLabel = ({
  field,
  value,
  style,
  fontSize,
  gradientValue,
}) => {
  return (
    <View style={[styles.Container, style && style]}>
      <Text style={[styles.FieldText, fontSize && { fontSize: fontSize }]} numberOfLines={1}>{field}</Text>
      {value && <Text style={[styles.ValueText, fontSize && { fontSize: fontSize - 1 }]} numberOfLines={1}>{value}</Text>}
      {
        gradientValue &&
        <>
          <View style={{ flex: 1, }} />
          <View style={{
            backgroundColor: COLOR.WHITE,
            borderRadius: 8,
            elevation: 5,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            shadowColor: gradientValue.shadow_color,
          }}>
            <LinearGradient
              colors={gradientValue.gradient_color}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 3,
                borderRadius: 8,
              }}
              angle={150}
              useAngle
            >
              <Text
                style={{
                  color: COLOR.WHITE,
                  fontSize: 12,
                }} numberOfLines={1}>{gradientValue.title}</Text>
            </LinearGradient>
          </View>
        </>
      }
    </View>
  )
}

export default FieldValuePairLabel

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
  },
  ValueText: {
    flex: 1,
    color: COLOR.BLACK_60,
    fontSize: 12,
    textAlign: 'right',
  },
})