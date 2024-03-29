import { ComponentMeta } from '@storybook/react'
import React, { useEffect, useState } from 'react'
import { InputTags } from './'
import './bootstrap.scss'
import './index.scss'

export default {
  title: 'InputTags',
  component: InputTags
} as ComponentMeta<typeof InputTags>

const TemplateInputTags = (args) => {
  const [state, setState] = useState<string[]>(args.values)

  const onClear = () => {
    setState([])
  }

  useEffect(() => {
    setState(args.values)
  }, [args.values])

  return (
    <div style={{ margin: 10 }}>
      <div className='input-group'>
        <InputTags values={state} onTags={(value) => setState(value.values)} />
        <button
          className='btn btn-outline-secondary'
          type='button'
          data-testid='button-clearAll'
          onClick={onClear}
        >
          Clear
        </button>
      </div>
      <hr />
      <ol>
        {state.map((item, index) => (
          <li key={item + index}>{item}</li>
        ))}
      </ol>
    </div>
  )
}

export const InputTag = TemplateInputTags.bind([])
InputTag.args = {
  values: ['test1', 'test2']
}
// InputTag.parameters = {
//   controls: { hideNoControlsWarning: true }
// }
