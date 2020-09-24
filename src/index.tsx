// eslint-disable-next-line no-use-before-define
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './styles.module.scss'
import { Cancel, Delete } from './svg-icons'

interface InputTagsProps {
  iconClear?: JSX.Element | string
  placeholder?: string
  onChange: (values: string[]) => void
  values: string[]
}

export const InputTags = ({
  placeholder,
  values,
  onChange,
  iconClear = <Delete />
}: InputTagsProps): JSX.Element => {
  const [terms, setTerms] = useState<string[]>(values)
  const [value, setValue] = useState('')
  const [focusIndex, setFocusIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    if (terms.length === 0) {
      setInputFocus()
    }
    onChange(terms)
  }, [terms.length])

  useEffect(() => {
    if (terms.length === 0) {
      setInputFocus()
    }
  }, [])

  const setInputFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus()
      setFocusIndex(-1)
    }
  }

  const onchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  const onkeyup = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event
    const currentValue = value.trim()
    if ((key === 'Enter' || key === ' ') && currentValue) {
      event.preventDefault()
      setTerms([...terms, currentValue])
      setValue('')
      setInputFocus()
    } else if (
      key === 'Backspace' &&
      currentValue.length === 0 &&
      terms.length > 0
    ) {
      setFocusIndex(terms.length - 1)
    } else if (key === 'ArrowLeft') {
      setFocusIndex(terms.length - 1)
    }
  }

  const onremove = (index: number, focus: boolean) => {
    setTerms(terms.filter((_, i) => i !== index))
    if (focus) {
      setFocusIndex(focusIndex - 1)
    } else {
      setInputFocus()
    }
  }

  const setSelectedIndex = (index: number) => {
    if (index < terms.length) {
      setFocusIndex(index)
    } else {
      setInputFocus()
    }
  }

  return (
    <div className='input-group'>
      <div className='form-control d-inline-flex flex-wrap'>
        {terms.map((item, index) => {
          const focus = focusIndex === index
          return (
            <Element
              key={`${item}${index}`}
              value={item}
              index={index}
              onRemove={onremove}
              focus={focus}
              setSelectedIndex={setSelectedIndex}
            />
          )
        })}
        <input
          ref={inputRef}
          type='text'
          className='border-0 w-auto flex-fill input-tags'
          placeholder={placeholder}
          aria-label={placeholder}
          value={value}
          onChange={onchange}
          onKeyUp={onkeyup}
          autoFocus
        />
      </div>
      <button
        className='btn btn-outline-secondary'
        type='button'
        id='button-clearAll'
        onClick={() => {
          setTerms([])
          setValue('')
        }}
      >
        {iconClear}
      </button>
    </div>
  )
}

interface ElementProps {
  value: string
  index: number
  onRemove: (index: number, focus: boolean) => void
  setSelectedIndex: (index: number) => void
  focus: boolean
}

const Element = (props: ElementProps): JSX.Element => {
  const onclick = () => {
    props.onRemove(props.index, props.focus)
  }
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (ref.current && props.focus) {
      ref.current.focus()
    }
  }, [props.focus])

  const onkeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = event
    if (key === 'Backspace' || key === 'Delete') {
      event.preventDefault()
      props.onRemove(props.index, props.focus)
    } else if (key === 'ArrowLeft' && props.index > 0) {
      props.setSelectedIndex(props.index - 1)
    } else if (key === 'ArrowRight') {
      props.setSelectedIndex(props.index + 1)
    }
  }
  return (
    <div
      ref={ref}
      tabIndex={0}
      className='badge bg-secondary bg-gradient mr-1 my-auto py-auto pr-0 '
      onKeyDown={onkeydown}
    >
      {props.value}
      <button
        aria-label='remove path fragment'
        tabIndex={-1}
        className='border-0 bg-transparent ml-3 mr-1 my-auto py-auto px-0'
        style={{ outline: 0 }}
        onClick={onclick}
      >
        <Cancel
          style={{ fill: 'var(--bs-white)', opacity: 1 }}
          width={18}
          height={18}
        />
      </button>
    </div>
  )
}
