import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../app/ui/Footer'

test('Footer', () => {
    render(Footer())
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeDefined()
})