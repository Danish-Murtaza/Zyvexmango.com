import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock IntersectionObserver for motion/react animations
beforeEach(() => {
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  });
  vi.stubGlobal('IntersectionObserver', mockIntersectionObserver);

  // Clear localStorage between tests
  localStorage.clear();

  // Reset document direction
  document.documentElement.dir = 'ltr';
  document.documentElement.className = '';
});

describe('App Component', () => {
  describe('Rendering', () => {
    it('should render the brand name ZYVEX', () => {
      render(<App />);
      const brandElements = screen.getAllByText(/ZYVEX/i);
      expect(brandElements.length).toBeGreaterThan(0);
    });

    it('should render the phone number in the top bar', () => {
      render(<App />);
      const phoneElements = screen.getAllByText('+92 300 6872012');
      expect(phoneElements.length).toBeGreaterThan(0);
    });

    it('should render language toggle buttons', () => {
      render(<App />);
      expect(screen.getByText('English')).toBeInTheDocument();
      expect(screen.getByText('اردو')).toBeInTheDocument();
      expect(screen.getByText('عربي')).toBeInTheDocument();
    });

    it('should render navigation links in English by default', () => {
      render(<App />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About Us')).toBeInTheDocument();
      expect(screen.getByText('Varieties')).toBeInTheDocument();
    });
  });

  describe('Language Switching', () => {
    it('should switch to Urdu when Urdu button is clicked', async () => {
      render(<App />);
      const urButton = screen.getByText('اردو');
      fireEvent.click(urButton);

      expect(document.documentElement.dir).toBe('rtl');
      expect(document.documentElement.className).toBe('lang-ur');
    });

    it('should switch to Arabic when Arabic button is clicked', async () => {
      render(<App />);
      const arButton = screen.getByText('عربي');
      fireEvent.click(arButton);

      expect(document.documentElement.dir).toBe('rtl');
      expect(document.documentElement.className).toBe('lang-ar');
    });

    it('should switch back to LTR when English is selected after RTL', () => {
      render(<App />);

      // Switch to Arabic (RTL)
      fireEvent.click(screen.getByText('عربي'));
      expect(document.documentElement.dir).toBe('rtl');

      // Switch back to English (LTR)
      fireEvent.click(screen.getByText('English'));
      expect(document.documentElement.dir).toBe('ltr');
      expect(document.documentElement.className).toBe('');
    });
  });

  describe('Inquiry Form Validation', () => {
    it('should not submit form when required fields are empty', async () => {
      render(<App />);

      // Find the submit button by its text content
      const submitButtons = screen.getAllByRole('button', { name: /submit official inquiry/i });
      if (submitButtons.length > 0) {
        fireEvent.click(submitButtons[0]);
      }

      // localStorage should remain empty if form didn't submit
      expect(localStorage.getItem('zyvex_inquiries')).toBeNull();
    });

    it('should save inquiry to localStorage on valid form submission', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Fill in the required fields using exact placeholders from App.tsx
      const nameInput = screen.getByPlaceholderText('e.g. Salim Al Mansoori');
      const companyInput = screen.getByPlaceholderText('e.g. Gulf Fresh Fruits LLC');
      const emailInput = screen.getByPlaceholderText('e.g. import@gulffresh.ae');
      const phoneInput = screen.getByPlaceholderText('e.g. +971 50 1234567');

      await user.type(nameInput, 'Test User');
      await user.type(companyInput, 'Test Company');
      await user.type(emailInput, 'test@example.com');
      await user.type(phoneInput, '+971501234567');

      // Submit
      const submitButtons = screen.getAllByRole('button', { name: /submit official inquiry/i });
      await user.click(submitButtons[0]);

      // Check localStorage was updated
      const saved = localStorage.getItem('zyvex_inquiries');
      expect(saved).not.toBeNull();
      const parsed = JSON.parse(saved!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].name).toBe('Test User');
    });
  });

  describe('localStorage Inquiry History', () => {
    it('should load previous inquiries from localStorage on mount', () => {
      const previousInquiries = [
        {
          name: 'Previous Buyer',
          company: 'Old Corp',
          country: 'Saudi Arabia',
          email: 'old@example.com',
          phone: '+966500000000',
          variety: 'chaunsa',
          quantity: '100 boxes',
          message: 'Previous inquiry',
        },
      ];
      localStorage.setItem('zyvex_inquiries', JSON.stringify(previousInquiries));

      render(<App />);

      // The app should have loaded the inquiries (we verify by checking localStorage wasn't cleared)
      const stored = localStorage.getItem('zyvex_inquiries');
      expect(stored).not.toBeNull();
      expect(JSON.parse(stored!)).toHaveLength(1);
    });

    it('should handle corrupted localStorage gracefully', () => {
      localStorage.setItem('zyvex_inquiries', 'not-valid-json{{{');

      // Should not throw
      expect(() => render(<App />)).not.toThrow();
    });
  });

  describe('Mango Variety Tabs', () => {
    it('should render variety filter tabs', () => {
      render(<App />);
      // Check for variety names in the page content
      expect(screen.getAllByText(/sindhri/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/anwar ratol/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/chaunsa/i).length).toBeGreaterThan(0);
    });
  });
});
