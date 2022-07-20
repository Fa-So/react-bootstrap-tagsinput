// eslint-disable-next-line no-use-before-define
import React, {
  HtmlHTMLAttributes,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { Cancel } from './svg-icons'
import classnames from 'classnames'

export type TagsValue = {
  values: string[]
  name?: string
}

export interface InputTagsProps {
  placeholder?: string
  onTags: (value: TagsValue) => void
  values: string[]
  name?: string
  elementClassName?: string
}

export const InputTags = ({
  placeholder,
  values,
  onTags,
  name,
  className,
  elementClassName,
  ...rest
}: InputTagsProps & HtmlHTMLAttributes<HTMLInputElement>): JSX.Element => {
  const [terms, setTerms] = useState<string[]>([])
  const [value, setValue] = useState('')
  const [focusIndex, setFocusIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  const forceInputFocus = () => {
    if (inputRef.current && focusIndex === -1) {
      inputRef.current.focus()
    }
  }

  useLayoutEffect(() => {
    if (terms.length === 0) {
      setFocusIndex(-1)
    }
    onTags({ values: terms, name: name })
  }, [terms.length]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setTerms(values)
  }, [values])

  useEffect(() => {
    forceInputFocus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusIndex, inputRef.current])

  const onchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  const onkeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event
    const currentValue = value.trim()
    if (key === 'Tab' && currentValue !== '') {
      event.preventDefault()
      setTerms([...terms, currentValue.replace(',', '')])
      setValue('')
      setFocusIndex(-1)
    }
  }

  const onkeyup = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event
    const currentValue = value.trim()
    const valueLength = currentValue.length
    const currentTarget = event.currentTarget.selectionEnd || 0
    const isEndOfText = currentTarget > valueLength
    const isStartOfText = currentTarget === 0
    const isPossibletermsMove = terms.length > 0
    const isPossibleAddKeys =
      key === 'Enter' || key === ' ' || key === 'Tab' || key === ','

    if (isPossibleAddKeys && currentValue !== '') {
      event.preventDefault()
      setTerms([...terms, currentValue.replace(',', '')])
      setValue('')
      setFocusIndex(-1)
    } else if (
      isStartOfText &&
      (key === 'Backspace' || key === 'ArrowLeft') &&
      isPossibletermsMove
    ) {
      event.preventDefault()
      setFocusIndex(terms.length - 1)
    } else if (isEndOfText && key === 'ArrowRight' && isPossibletermsMove) {
      event.preventDefault()
      setFocusIndex(0)
    }
  }

  const handleRemove = (index: number, focus: boolean) => {
    setTerms(terms.filter((_, i) => i !== index))
    if (focus) {
      setFocusIndex(Math.max(focusIndex - 1, 0))
    } else {
      forceInputFocus()
    }
  }

  const setSelectedIndex = (index: number) => {
    if (index < terms.length && index > -1) {
      setFocusIndex(index)
    } else {
      setFocusIndex(-1)
    }
  }

  return (
    <div className='form-control h-auto d-inline-flex flex-wrap'>
      {terms.map((item, index) => {
        const focus = focusIndex === index
        return (
          <Element
            key={`${item}${index}`}
            value={item}
            index={index}
            onRemove={handleRemove}
            focus={focus}
            onSelectedIndex={setSelectedIndex}
            className={elementClassName}
          />
        )
      })}
      <input
        data-testid='input-tags'
        ref={inputRef}
        type='text'
        className={classnames(
          'border-0 w-auto flex-fill input-tags',
          className
        )}
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={onchange}
        onKeyUp={onkeyup}
        onKeyDown={onkeydown}
        autoFocus
        name={name}
        {...rest}
      />
    </div>
  )
}

interface ElementProps {
  value: string
  index: number
  onRemove: (index: number, focus: boolean) => void
  onSelectedIndex: (index: number) => void
  focus: boolean
  className?: string
}

const Element = (props: ElementProps): JSX.Element => {
  const [focus, setFocus] = useState(false)
  const onclick = () => {
    props.onRemove(props.index, focus)
  }
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (ref.current && props.focus) {
      ref.current.focus()
    }
  }, [props.focus])

  const onkeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = event
    event.preventDefault()
    if (key === 'Backspace' || key === 'Delete') {
      props.onRemove(props.index, props.focus)
    } else if (key === 'ArrowLeft') {
      props.onSelectedIndex(props.index - 1)
    } else if (key === 'ArrowRight') {
      props.onSelectedIndex(props.index + 1)
    }
  }
  return (
    <div
      data-testid='tag-element'
      ref={ref}
      tabIndex={0}
      className={classnames(
        'badge bg-secondary bg-gradient me-1 pe-1 justify-content-between',
        props.className
      )}
      onKeyUp={onkeydown}
      onFocus={() => {
        setFocus(true)
      }}
      onBlur={() => {
        setFocus(false)
      }}
    >
      {props.value}
      <button
        data-testid='tag-clean-element'
        aria-label='remove path fragment'
        tabIndex={-1}
        className='border-0 bg-transparent ps-auto pe-0'
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
