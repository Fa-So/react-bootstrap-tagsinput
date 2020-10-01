import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { InputTags, TagsValue } from '.'

describe('InputTags', (): void => {
  it('is truthy', (): void => {
    expect(InputTags).toBeTruthy()
  })

  it('should render InputTag', () => {
    render(<InputTags values={[]} onTags={jest.fn()} />)
    expect(screen.getByTestId('input-tags')).toBeTruthy()
  })

  it('should be empty by default', () => {
    render(<InputTags values={[]} onTags={jest.fn()} />)
    expect(
      (screen.getByTestId('input-tags') as HTMLInputElement).value
    ).toHaveLength(0)
  })

  it('should accept initial tags as property', () => {
    render(<InputTags values={['one', 'two']} onTags={jest.fn()} />)
    expect(screen.getAllByTestId('tag-element')).toHaveLength(2)
    expect(screen.getAllByTestId('tag-clean-element')).toHaveLength(2)
  })

  it('should callback with value on enter', (done) => {
    const onchange = (value: TagsValue) => {
      if (value.values.length > 0) {
        expect(value.values[0]).toBe('hello')
        done()
      }
    }
    render(<InputTags values={[]} onTags={onchange} />)
    const input = screen.getByTestId('input-tags') as HTMLInputElement

    fireEvent.input(input, {
      target: { value: 'hello' }
    })
    // make sure input has new value / state
    expect(input.value).toBe('hello')
    // simulate enter
    fireEvent.keyUp(input, {
      key: 'Enter'
    })
  })
  it('should callback with value on space', (done) => {
    const onchange = (value: TagsValue) => {
      if (value.values.length > 0) {
        expect(value.values[0]).toBe('hello')
        done()
      }
    }
    render(<InputTags values={[]} onTags={onchange} />)
    const input = screen.getByTestId('input-tags') as HTMLInputElement

    fireEvent.input(input, {
      target: { value: 'hello' }
    })
    // make sure input has new value / state
    expect(input.value).toBe('hello')
    // simulate enter
    fireEvent.keyUp(input, {
      key: ' '
    })
  })

  it('should not add a tag when input field is empty', () => {
    const onChange = jest.fn()
    render(<InputTags values={[]} onTags={onChange} />)
    const input = screen.getByTestId('input-tags') as HTMLInputElement

    fireEvent.input(input, {
      target: { value: '' }
    })
    // make sure input has new value / state
    expect(input.value).toBe('')
    // simulate enter
    fireEvent.keyUp(input, {
      key: 'Enter'
    })
    expect(onChange).toHaveBeenCalled()
    expect(screen.queryAllByTestId('tag-element')).toHaveLength(0)
  })

  it('should focus the last tag when left arrow is pressed inside input the field', () => {
    render(<InputTags values={['one']} onTags={jest.fn()} />)
    const input = screen.getByTestId('input-tags') as HTMLInputElement
    fireEvent.keyUp(input, {
      key: 'Backspace'
    })
    expect(screen.getAllByTestId('tag-element')).toHaveLength(1)
    expect(screen.getAllByTestId('tag-clean-element')).toHaveLength(1)
    expect(document.activeElement).toBe(screen.getAllByTestId('tag-element')[0])
  })

  it('should focus the last tag when left arrow is pressed inside input the field', () => {
    render(<InputTags values={['one', 'two']} onTags={jest.fn()} />)
    const input = screen.getByTestId('input-tags') as HTMLInputElement
    expect(screen.getAllByTestId('tag-element')).toHaveLength(2)
    expect(screen.getAllByTestId('tag-clean-element')).toHaveLength(2)
    fireEvent.keyUp(input, {
      key: 'ArrowLeft'
    })
    expect(document.activeElement).toBe(screen.getAllByTestId('tag-element')[1])
  })

  it('should focus the first tag when right arrow is pressed inside input the field', () => {
    render(<InputTags values={['one', 'two']} onTags={jest.fn()} />)
    const input = screen.getByTestId('input-tags') as HTMLInputElement
    expect(screen.getAllByTestId('tag-element')).toHaveLength(2)
    expect(screen.getAllByTestId('tag-clean-element')).toHaveLength(2)
    fireEvent.keyUp(input, {
      key: 'ArrowRight'
    })
    expect(document.activeElement).toBe(screen.getAllByTestId('tag-element')[0])
  })

  it('should focus the first tag when left arrow is focus second tag (key: ArrowLeft)', () => {
    render(<InputTags values={['one', 'two']} onTags={jest.fn()} />)
    const div = screen.getAllByTestId('tag-element')[1] as HTMLDivElement
    fireEvent.keyUp(div, {
      key: 'ArrowLeft'
    })
    expect(document.activeElement).toBe(screen.getAllByTestId('tag-element')[0])
  })

  it('should focus the first tag when left arrow is focus second tag (key: ArrowRight)', () => {
    render(<InputTags values={['one', 'two']} onTags={jest.fn()} />)
    const div = screen.getAllByTestId('tag-element')[0] as HTMLDivElement
    fireEvent.keyUp(div, {
      key: 'ArrowRight'
    })
    expect(document.activeElement).toBe(screen.getAllByTestId('tag-element')[1])
  })

  it('should focus inside input the field when keyup Backspace', () => {
    render(<InputTags values={['one', 'two']} onTags={jest.fn()} />)
    screen.getAllByTestId('tag-element')[0].focus()
    const div = screen.getAllByTestId('tag-element')[0] as HTMLDivElement
    fireEvent.keyUp(div, {
      key: 'Backspace'
    })
    expect(document.activeElement).toBe(screen.getByTestId('input-tags'))
  })

  it('should ignore other keys when tag focused', () => {
    render(<InputTags values={['one', 'two']} onTags={jest.fn()} />)
    screen.getAllByTestId('tag-element')[0].focus()
    const div = screen.getAllByTestId('tag-element')[0] as HTMLDivElement
    fireEvent.keyUp(div, {
      key: 'Enter'
    })
    expect(document.activeElement).toBe(screen.getAllByTestId('tag-element')[0])
  })

  it('should focus the first tag when left arrow is pressed twite inside input the field', () => {
    render(<InputTags values={['one', 'two']} onTags={jest.fn()} />)
    const input = screen.getByTestId('input-tags') as HTMLInputElement
    screen.getAllByTestId('tag-element')[1].focus()
    fireEvent.keyUp(input, {
      key: 'ArrowLeft'
    })
    const div = screen.getAllByTestId('tag-element')[0] as HTMLDivElement
    fireEvent.keyUp(div, {
      key: 'ArrowLeft'
    })
    expect(document.activeElement).toBe(screen.getByTestId('input-tags'))
  })

  it('should delete the tag when click on delete button and focus inside input field', () => {
    render(<InputTags values={['one', 'two']} onTags={jest.fn()} />)
    screen.getAllByTestId('tag-element')[1].focus()
    const deleteButton = screen.getAllByTestId(
      'tag-clean-element'
    )[1] as HTMLButtonElement
    fireEvent.click(deleteButton)
    expect(document.activeElement).toBe(screen.getAllByTestId('tag-element')[0])
  })
})
