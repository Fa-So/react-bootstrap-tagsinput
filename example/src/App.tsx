// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'

import { InputTags } from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css'

const App = () => {
  const [state, setState] = useState<string[]>([])
  return (
    <div style={{margin: 10}}>
      <InputTags values={state} onChange={(values) => setState(values)} />
      <hr />
      <ol>
        {state.map((item, index) => (
          <li key={item + index}>{item}</li>
        ))}
      </ol>
    </div>
  )
}

export default App
