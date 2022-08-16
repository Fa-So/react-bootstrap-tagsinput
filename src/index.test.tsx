import React from 'react'
import { render, screen } from '@testing-library/react'
import useEvent from '@testing-library/user-event'
import { InputTags } from '.'

describe('InputTags', (): void => {
  it('is truthy', (): void => {
    expect(InputTags).toBeTruthy()
  })

  it('should render InputTag', async () => {
    render(<InputTags onTags={jest.fn()} />)
    expect(screen.getByTestId('input-tags')).toBeTruthy()
  })

  it('should be empty by default', async () => {
    render(<InputTags onTags={jest.fn()} />)
    expect(
      (screen.getByTestId('input-tags') as HTMLInputElement).value
    ).toHaveLength(0)
  })

  it('should accept initial tags as property', async () => {
    render(<InputTags values={['one', 'two']} onTags={jest.fn()} />)
    expect(screen.getAllByTestId('tag-element')).toHaveLength(2)
    expect(screen.getAllByTestId('tag-clean-element')).toHaveLength(2)
  })

  it('should callback with value on enter', async () => {
    const onchange = jest.fn()
    render(<InputTags values={[]} onTags={onchange} />)
    const input = screen.getByTestId('input-tags') as HTMLInputElement

    await useEvent.type(input, 'hello')
    // make sure input has new value / state
    expect(input.value).toBe('hello')
    // simulate enter
    await useEvent.type(input, '{enter}')
    expect(onchange).toHaveBeenLastCalledWith({
      name: undefined,
      values: ['hello']
    })
  })

  it('should callback with value on space', async () => {
    const onchange = jest.fn()
    render(<InputTags values={[]} onTags={onchange} />)
    const input = screen.getByTestId('input-tags') as HTMLInputElement

    await useEvent.type(input, 'hello')
    // make sure input has new value / state
    expect(input.value).toBe('hello')
    // simulate space
    await useEvent.type(input, ' ')
    expect(onchange).toBeCalledWith({
      name: undefined,
      values: ['hello']
    })
  })
  it('should callback with value on tab', async () => {
    const onchange = jest.fn()
    render(<InputTags values={[]} onTags={onchange} />)
    const input = screen.getByTestId('input-tags') as HTMLInputElement

    await useEvent.type(input, 'hello')
    // make sure input has new value / state
    expect(input.value).toBe('hello')
    // simulate space
    await useEvent.keyboard('[Tab]')
    expect(onchange).toBeCalledWith({
      name: undefined,
      values: ['hello']
    })
  })

  it('should not add a tag when input field is empty', async () => {
    const onChange = jest.fn()
    render(<InputTags values={[]} onTags={onChange} />)
    const input = screen.getByTestId('input-tags') as HTMLInputElement

    await useEvent.clear(input)
    // make sure input has new value / state
    expect(input.value).toBe('')
    // simulate enter
    await useEvent.keyboard('[Enter]')
    // await useEvent.type(input, '{enter}')
    expect(onChange).toHaveBeenCalled()
    expect(screen.queryAllByTestId('tag-element')).toHaveLength(0)
  })

  it('should focus the last tag when left arrow is pressed inside input the field', async () => {
    render(<InputTags values={['one']} onTags={jest.fn()} />)
    const input = screen.getByTestId('input-tags') as HTMLInputElement
    await useEvent.type(input, '{Backspace}')
    expect(screen.getAllByTestId('tag-element')).toHaveLength(1)
    expect(screen.getAllByTestId('tag-clean-element')).toHaveLength(1)
    expect(document.activeElement).toBe(screen.getAllByTestId('tag-element')[0])
  })

  it('should focus the last tag when left arrow is pressed inside input the field', async () => {
    render(<InputTags values={['one', 'two']} onTags={jest.fn()} />)
    const input = screen.getByTestId('input-tags') as HTMLInputElement
    expect(screen.getAllByTestId('tag-element')).toHaveLength(2)
    expect(screen.getAllByTestId('tag-clean-element')).toHaveLength(2)
    await useEvent.type(input, '{arrowLeft}')
    expect(document.activeElement).toBe(screen.getAllByTestId('tag-element')[1])
  })

  it('should focus the first tag when right arrow is pressed inside input the field', async () => {
    render(<InputTags values={['one', 'two']} onTags={jest.fn()} />)
    const input = screen.getByTestId('input-tags') as HTMLInputElement
    expect(screen.getAllByTestId('tag-element')).toHaveLength(2)
    expect(screen.getAllByTestId('tag-clean-element')).toHaveLength(2)
    await useEvent.type(input, ' {arrowRight}')
    expect(document.activeElement).toBe(screen.getAllByTestId('tag-element')[0])
  })

  it('should focus the first tag when left arrow is focus second tag (key: ArrowLeft)', async () => {
    render(<InputTags values={['one', 'two']} onTags={jest.fn()} />)
    const div = screen.getAllByTestId('tag-element')[1] as HTMLDivElement
    await useEvent.type(div, '{arrowLeft}')
    expect(document.activeElement).toBe(screen.getAllByTestId('tag-element')[0])
  })

  it('should focus the first tag when left arrow is focus second tag (key: ArrowRight)', async () => {
    render(<InputTags values={['one', 'two']} onTags={jest.fn()} />)
    const div = screen.getAllByTestId('tag-element')[0] as HTMLDivElement
    await useEvent.type(div, '{arrowRight}')
    expect(document.activeElement).toBe(screen.getAllByTestId('tag-element')[1])
  })

  it('should focus inside input the field when keyup Backspace', async () => {
    render(<InputTags values={['one', 'two']} onTags={jest.fn()} />)
    screen.getAllByTestId('tag-element')[0].focus()
    const div = screen.getAllByTestId('tag-element')[0] as HTMLDivElement
    await useEvent.type(div, '{Backspace}')
    expect(document.activeElement).toBe(screen.getByTestId('input-tags'))
  })

  it('should ignore other keys when tag focused', async () => {
    render(<InputTags values={['one', 'two']} onTags={jest.fn()} />)
    screen.getAllByTestId('tag-element')[0].focus()
    const div = screen.getAllByTestId('tag-element')[0] as HTMLDivElement
    await useEvent.type(div, '{enter}')
    expect(document.activeElement).toBe(screen.getAllByTestId('tag-element')[0])
  })

  it('should focus the first tag when left arrow is pressed twite inside input the field', async () => {
    render(<InputTags values={['one', 'two']} onTags={jest.fn()} />)
    const input = screen.getByTestId('input-tags') as HTMLInputElement
    screen.getAllByTestId('tag-element')[1].focus()
    await useEvent.type(input, '{arrowLeft}')
    const div = screen.getAllByTestId('tag-element')[0] as HTMLDivElement
    await useEvent.type(div, '{arrowLeft}')
    expect(document.activeElement).toBe(screen.getByTestId('input-tags'))
  })

  it('should delete the tag when click on delete button and focus inside input field', async () => {
    render(<InputTags values={['one', 'two']} onTags={jest.fn()} />)
    screen.getAllByTestId('tag-element')[1].focus()
    const deleteButton = screen.getAllByTestId(
      'tag-clean-element'
    )[1] as HTMLButtonElement
    await useEvent.click(deleteButton)
    expect(document.activeElement).toBe(screen.getAllByTestId('tag-element')[0])
  })
})
