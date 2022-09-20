import React from 'react'
import { render } from '@testing-library/react'
import { PokemonGuesserPresentational } from './PokemonGuesserPresentational'
import '@testing-library/jest-dom'
// eslint-disable-next-line jest/no-mocks-import
import { mockedPokemon } from '../../../__mocks__'

import { ResultState } from './types'

test('renders PokemonGuesserPresentational', () => {
  render(
    <PokemonGuesserPresentational
      pokemon={mockedPokemon}
      isLoading={false}
      state={ResultState.SUCCESS}
      onCheck={() => {}}
      onRetry={() => {}}
    />
  )
})
