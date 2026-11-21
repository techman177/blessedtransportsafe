import {TextInput} from '@sanity/ui'
import {set, unset, type NumberInputProps} from 'sanity'

export function CurrencyNumberInput(props: NumberInputProps) {
  const {elementProps, onChange, value} = props

  return (
    <TextInput
      {...elementProps}
      type="number"
      value={typeof value === 'number' ? value : ''}
      prefix="$"
      suffix="USD"
      onChange={(event) => {
        const nextValue = event.currentTarget.value
        onChange(nextValue === '' ? unset() : set(Number(nextValue)))
      }}
    />
  )
}
