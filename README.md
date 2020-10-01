# react-bootstrap-tagsinput

> Made with create-react-library

[![Github Action](https://github.com/Fa-So/react-bootstrap-tagsinput/workflows/Continuous%20Integration/badge.svg)](https://github.com/Fa-So/react-bootstrap-tagsinput/actions?query=workflow%3A%22Continuous+Integration%22) [![NPM](https://img.shields.io/npm/v/react-bootstrap-tagsinput.svg)](https://www.npmjs.com/package/react-bootstrap-tagsinput) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Install

```bash
npm install --save react-bootstrap-tagsinput
```

## Usage

```tsx
import React, { useState } from 'react'

import { InputTags } from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css'

const App = () => {
  const [state, setState] = useState<string[]>([])
  return (
    <div style={{ margin: 10 }}>
      <div className='input-group'>
        <InputTags values={state} onTags={(value) => setState(value.values)} />
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
```
## [Demo](https://fa-so.github.io/react-bootstrap-tagsinput/)
## License

MIT © [Fahri Sönmez](https://github.com/Fa-So)
