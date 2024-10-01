import { cleanup, render, screen } from '@testing-library/react';
import ArticleStub from '../../../app/ui/components/ArticleStub';
import { vi, afterEach, describe, expect, it } from 'vitest';

vi.mock('next/link', () => ({
    default: ({ children, ...props }: { children: React.ReactNode }) => <a {...props}>{children}</a>,
}));
vi.mock('next/image', () => ({
    default: (props: any) => <img {...props} />,
}));
vi.mock('next/navigation', () => ({
    usePathname: vi.fn()
}));

describe('ArticleStub', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders the image with the correct src and alt attributes', () => {
        render(<ArticleStub isPhotoFirst={true} imagesrc="test-image.jpg" />);
        const imageElement = screen.getByAltText('') as HTMLImageElement;;
        expect(imageElement.src).toContain('test-image.jpg');
        expect(imageElement).toHaveProperty('alt', '');
    });

    it('renders the text content correctly', () => {
        render(<ArticleStub isPhotoFirst={true} imagesrc="test-image.jpg" />);
        const headingElement = screen.getByText('Become a Volunteer');
        expect(headingElement).toBeDefined();
        const paragraphElements = screen.getAllByText(/Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua./i);
        expect(paragraphElements.length).toBe(2);
    });

    it('renders the link with correct href', () => {
        render(<ArticleStub isPhotoFirst={true} imagesrc="test-image.jpg" />);
        const linkElement = screen.getByRole('link', { name: /Cick here to learn more/i }) as HTMLAnchorElement;
        expect(linkElement.getAttribute('href')).toBe('/#');
    });

    it('applies the correct class based on isPhotoFirst prop', () => {
        const { rerender } = render(<ArticleStub isPhotoFirst={true} imagesrc="test-image.jpg" />);
        let containerElement = screen.getByAltText('').parentElement;
        expect(containerElement).toBeDefined();
        // Extra space after fle-row because it comes up empty when isPhotoFirst = true.
        expect(containerElement?.className).toBe('flex flex-row  justify-evenly flex-wrap gap-[42px] desktop:justify-evenly laptop:flex-nowrap');

        rerender(<ArticleStub isPhotoFirst={false} imagesrc="test-image.jpg" />);
        containerElement = screen.getByAltText('').parentElement;
        expect(containerElement).toBeDefined();
        expect(containerElement?.className).toBe('flex flex-row flex-row-reverse justify-evenly flex-wrap gap-[42px] desktop:justify-evenly laptop:flex-nowrap');
    });
});