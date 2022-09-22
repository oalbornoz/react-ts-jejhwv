import React from 'react'
import { render, screen } from '@testing-library/react'
import { PokemonGuesserPresentational } from './PokemonGuesserPresentational'
import '@testing-library/jest-dom'
// eslint-disable-next-line jest/no-mocks-import
import { mockedPokemon } from '../../../__mocks__'

import { ResultState } from './types'
import userEvent from '@testing-library/user-event'

describe('renders PokemonGuesserPresentational', () => {
  it('renders form', () => {
    render(
      <PokemonGuesserPresentational
        pokemon={mockedPokemon}
        isLoading={false}
        state={ResultState.GUESSING}
        onCheck={() => {}}
        onRetry={() => {}}
      />
    )
    const buttonElement = screen.getByRole('button', {
      name: /check/i,
    })
    expect(buttonElement).toBeInTheDocument()
    const inputElement = screen.getByPlaceholderText(/who's that pokemon\?/i)
    expect(inputElement).toBeInTheDocument()
  })
  it('renders loader', () => {
    render(
      <PokemonGuesserPresentational
        pokemon={mockedPokemon}
        isLoading={true}
        state={ResultState.GUESSING}
        onCheck={() => {}}
        onRetry={() => {}}
      />
    )
    const element = screen.getByTestId('infinity-spin')
    expect(element).toBeInTheDocument()
  })
  it('renders error', () => {
    render(
      <PokemonGuesserPresentational
        pokemon={mockedPokemon}
        isLoading={false}
        state={ResultState.ERROR}
        onCheck={() => {}}
        onRetry={() => {}}
      />
    )
    const labelElement = screen.getByText(/oops, that's wrong/i)
    expect(labelElement).toBeInTheDocument()
    const buttonElement = screen.getByRole('button', {
      name: /try again/i,
    })
    expect(buttonElement).toBeInTheDocument()
  })
  it('renders result', () => {
    render(
      <PokemonGuesserPresentational
        pokemon={mockedPokemon}
        isLoading={false}
        state={ResultState.SUCCESS}
        onCheck={() => {}}
        onRetry={() => {}}
      />
    )
    const labelElement = screen.getByText(/excellent!!/i)
    expect(labelElement).toBeInTheDocument()
    const buttonElement = screen.getByRole('button', {
      name: /keep playing/i,
    })
    expect(buttonElement).toBeInTheDocument()
  })
})

describe('calls callbacks', () => {
  it('calls onCheck with the typed value', () => {
    const mockOnCheck = jest.fn(() => {})

    render(
      <PokemonGuesserPresentational
        pokemon={mockedPokemon}
        isLoading={false}
        state={ResultState.GUESSING}
        onCheck={mockOnCheck}
        onRetry={() => {}}
      />
    )
    const pokemon = 'pikachu'
    userEvent.type(screen.getByRole('textbox'), pokemon)
    userEvent.click(
      screen.getByRole('button', {
        name: /check/i,
      })
    )
    expect(mockOnCheck).toBeCalledTimes(1)
    expect(mockOnCheck).toHaveBeenCalledWith(pokemon)
  })
  it('calls onRetry callback', () => {
    const mockOnRetry = jest.fn(() => {})

    render(
      <PokemonGuesserPresentational
        pokemon={mockedPokemon}
        isLoading={false}
        state={ResultState.ERROR}
        onCheck={() => {}}
        onRetry={mockOnRetry}
      />
    )
    userEvent.click(
      screen.getByRole('button', {
        name: /try again/i,
      })
    )
    expect(mockOnRetry).toBeCalledTimes(1)
  })
})
