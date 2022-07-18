import React, { useState } from 'react'
import { InputTags } from './'
import './index.scss'

export default {
  title: 'InputTags',
  component: InputTags
}

const TemplateInputTags = (args: any) => {
  const [state, setState] = useState<string[]>([])
  return (
    <div style={{ margin: 10 }}>
      <div className='input-group'>
        <InputTags
          values={state}
          onTags={(value) => setState(value.values)}
          {...args}
        />
        <button
          className='btn btn-outline-secondary'
          type='button'
          data-testid='button-clearAll'
          onClick={() => {
            setState([])
          }}
        >
          Delete all
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
