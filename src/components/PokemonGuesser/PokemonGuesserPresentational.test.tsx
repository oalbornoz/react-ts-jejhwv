import React from 'react'
import { render, screen } from '@testing-library/react'
import { PokemonGuesserPresentational } from './PokemonGuesserPresentational'
import '@testing-library/jest-dom'
// eslint-disable-next-line jest/no-mocks-import
import { mockedPokemon } from '../../../__mocks__'

import { ResultState } from './types'

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
