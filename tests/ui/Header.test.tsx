import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Header from '../../app/ui/Header';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';

vi.mock('next/link', () => ({
    default: ({ children, ...props }: { children: React.ReactNode }) => <a {...props}>{children}</a>,
}));
vi.mock('next/image', () => ({
    default: (props: any) => <img {...props} />,
}));
vi.mock('next/navigation', () => ({
    usePathname: vi.fn()
}));

vi.mock('next-auth/react', () => ({
    useSession: vi.fn(() => ({
        expires: "1",
        user: { email: "bagel@bagel.com", name: "Bagel", image: "/images/loveBagels.jpg" },
    })),
    SessionProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('./components/mui/AccountMenu', () => ({
    default: () => <div data-testid="account-menu">Account Menu</div>
}));

const renderWithProviders = (ui: React.ReactElement) => {
    return render(<SessionProvider>{ui}</SessionProvider>);
};

describe('Header', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders the logo and navigation links', async () => {
        vi.mocked(usePathname).mockReturnValue('/');
        renderWithProviders(<Header />);

        expect(screen.getByAltText('Tech Workforce Coalition')).toBeDefined();

        const topLinkForEmployers = screen.getByText('For Employers');
        expect(topLinkForEmployers).toBeDefined();
        await userEvent.click(topLinkForEmployers);
        expect(screen.getByText('Landing Page')).toBeDefined();
        expect(screen.getByText('Talent Showcase')).toBeDefined();

        const topLinkForJobseekers = screen.getByText('For Jobseekers');
        expect(topLinkForJobseekers).toBeDefined();
        await userEvent.click(topLinkForJobseekers);
        expect(screen.getByText('Landing Page')).toBeDefined();
        expect(screen.getByText('Job Listings')).toBeDefined();

        const topLinkOurCommunity = screen.getByText('Our Community');
        expect(topLinkOurCommunity).toBeDefined();
        await userEvent.click(topLinkOurCommunity);
        expect(screen.getByText('Join Our Community')).toBeDefined();
        expect(screen.getByText('Careers')).toBeDefined();

        expect(screen.getByText('Events')).toBeDefined();

        const topLinkCoalition = screen.getByText('Coalition');
        expect(topLinkCoalition).toBeDefined();
        await userEvent.click(topLinkCoalition);
        expect(screen.getByText('Training Providers')).toBeDefined();

        expect(screen.getByText('About Us')).toBeDefined();
    });

    it('changes logo based on pathname', () => {
        vi.mocked(usePathname).mockReturnValue('/services/jobseekers');
        renderWithProviders(<Header />);

        const logo = screen.getByAltText('Tech Workforce Coalition') as HTMLImageElement;
        expect(logo.src).toContain('/images/TWC%20logo_White.svg');
    });

    it('renders AccountMenu component', () => {
        renderWithProviders(<Header />);
        expect(screen.getByLabelText('Account settings')).toBeDefined();
    });

    it('renders correct links in mobile menu', () => {
        vi.mocked(usePathname).mockReturnValue('/');
        renderWithProviders(<Header />);


        fireEvent.click(screen.getByText('Open main menu'));

        const mobileMenu = screen.getByRole('dialog');

        expect(within(mobileMenu).getByText('Talent Showcase')).toBeDefined();
        expect(within(mobileMenu).getByText('For Employers')).toBeDefined();
        expect(within(mobileMenu).getByText('For Job Seekers')).toBeDefined();
    });
});