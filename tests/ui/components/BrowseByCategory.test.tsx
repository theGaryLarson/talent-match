import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BrowseByCategory from '../../../app/ui/components/BrowseByCategory';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { afterEach } from 'node:test';
import { useRouter } from 'next/navigation';

// Mock the useRouter hook
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        route: '/',
        pathname: '',
        query: {},
        asPath: '',
        push: vi.fn(),
        replace: vi.fn(),
        reload: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
        prefetch: vi.fn(),
        beforePopState: vi.fn(),
        events: {
            on: vi.fn(),
            off: vi.fn(),
            emit: vi.fn(),
        },
        isFallback: false,
        basePath: '',
        isLocaleDomain: false,
        isReady: true,
        isPreview: false,
    }),
}));

const mockRouter = {
    route: '/',
    pathname: '',
    query: {},
    asPath: '',
    push: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    beforePopState: vi.fn(),
    events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
    },
    isFallback: false,
    basePath: '',
    isLocaleDomain: false,
    isReady: true,
    isPreview: false,
};

describe('BrowseByCategory Component', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders the heading', () => {
        render(
            <RouterContext.Provider value={mockRouter}>
                <BrowseByCategory />
            </RouterContext.Provider>
        );
        const heading = screen.getByText('Browse by Category');
        expect(heading).toBeDefined();
    });

    it('renders all category links with correct text and href', () => {
        render(
            <RouterContext.Provider value={mockRouter}>
                <BrowseByCategory />
            </RouterContext.Provider>
        );
        const links = [
            { text: 'Cloud Computing', href: '/services/employers/dashboard/listview?search=Cloud+Computing' },
            { text: 'Cyber Security', href: '/services/employers/dashboard/listview?search=Cyber+Security' },
            { text: 'Data Analyst', href: '/services/employers/dashboard/listview?search=Data+Analytics' },
            { text: 'IT Support', href: '/services/employers/dashboard/listview?search=IT+Support' },
            { text: 'Project Manag.', href: '/services/employers/dashboard/listview?search=Project+Management' },
            { text: 'Software Dev', href: '/services/employers/dashboard/listview?search=Software+Development' },
            { text: 'AI Analyst', href: '/services/employers/dashboard/listview?search=AI+Analytics' },
            { text: 'UX Researcher', href: '/services/employers/dashboard/listview?search=UX+Research' },
            { text: 'Machine Learning', href: '/services/employers/dashboard/listview?search=Machine+Learning' },
            { text: 'UX Designer', href: '/services/employers/dashboard/listview?search=UX+Designer' },
            { text: 'Lorem Ipsum', href: '/underconstruction' },
        ];

        // TODO(): Very fragile
        links.forEach(link => {
            const linkElements = screen.getAllByText(link.text);
            linkElements.forEach(linkElement => {
                expect(linkElement).toBeDefined();
                const href = linkElement.getAttribute('href');
                const url = href ? new URL(href, 'http://localhost:3000') : null;
                expect(`${url?.pathname}${url?.search ?? ''}`).toBe(link.href);
            });
        });
    });
});