# react-bootstrap-tagsinput

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-bootstrap-tagsinput.svg)](https://www.npmjs.com/package/react-bootstrap-tagsinput) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-bootstrap-tagsinput
```

## Usage

```tsx
import React, { Component } from 'react'

import { InputTags } from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css'

const App = () => {
  const [state, setState] = useState<string[]>([])
  return (
    <div style={{margin: 10}}>
      <InputTags values={state} onChange={(values) => setState(values)} />
      <hr />
      <ol>
        {state.map((item) => (
          <li>{item}</li>
        ))}
      </ol>
    </div>
  )
}

export default App
```

## License

MIT © [Fa-So](https://github.com/Fa-So)
