import React from 'react'
import { getByText, render, screen, waitFor } from '@testing-library/react'
import * as api from '../../config/api'
import PokeContainer from './PokeContainer'

//file to mock
jest.mock('../../config/api')

describe('PokeContainer component', () => {
  beforeEach(() => jest.clearAllMocks())
  it('Pokemon details should be rendered when api returns successful call', async () => {
    //expected mock value returned
    api.PokemonApi.mockResolvedValue({
      results: [{ name: 'gurulab' }],
    })
    render(<PokeContainer />)
    await waitFor(() => {
      screen.getByText('gurulab')
    })
  })

  it('Render error message if api call fails', async () => {
    api.PokemonApi.mockResolvedValue({})
    render(<PokeContainer />)
    await waitFor(() => {
      screen.getByText(/issue/)
    })
  })
})
