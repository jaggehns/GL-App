import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from '../Header/Header'

test('UI Sanity Check', () => {
  render(<Header />)
  const linkElement = screen.getByText(/Pokémon App/i)
  expect(linkElement).toBeInTheDocument()
})
