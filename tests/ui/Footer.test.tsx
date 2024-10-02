import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Footer from '../../app/ui/Footer';

vi.mock('next/link', () => ({
    default: ({ children, ...props }: { children: React.ReactNode }) => <a {...props}>{children}</a>,
}));

vi.mock('next/image', () => ({
    default: (props: any) => <img {...props} />,
}));

describe('Footer', () => {
    beforeEach(() => {
        render(<Footer />);
    });

    afterEach(() => {
        cleanup();
    });

    it('renders the Tech Workforce Coalition logo', () => {
        const logo = screen.getByAltText('Tech Workforce Coalition');
        expect(logo).toBeDefined();
        expect(logo.getAttribute('src')).toBe('/images/TWC logo_White.svg');
        expect(logo.getAttribute('width')).toBe('75');
        expect(logo.getAttribute('height')).toBe('31.8');
    });

    it('renders the LinkedIn link', () => {
        const linkedinLink = screen.getByText('Follow Us:').closest('a');
        expect(linkedinLink?.getAttribute('href')).toBe('https://www.linkedin.com/company/washington-tech-workforce-coalition');
        expect(linkedinLink?.getAttribute('target')).toBe('_blank');

        const linkedinIcon = screen.getByAltText('Linkedin Link');
        expect(linkedinIcon).toBeDefined();
        expect(linkedinIcon.getAttribute('src')).toBe('/images/stock/LI-In-Bug.png');
        expect(linkedinIcon.getAttribute('width')).toBe('40');
    });

    it('renders the Privacy Policy link', () => {
        const privacyLink = screen.getByText('Privacy Policy');
        expect(privacyLink.getAttribute('href')).toBe('/underconstruction');
        expect(privacyLink.className).toContain('text-white');
        expect(privacyLink.className).toContain('underline');
        expect(privacyLink.className).toContain('REPLACE-BEFORE-RELEASE');
    });

    it('renders the copyright text', () => {
        const copyrightText = screen.getByText('© Copyright 2024. All rights reserved.');
        expect(copyrightText).toBeDefined();
    });
});