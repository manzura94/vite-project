import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from '../components/Header.js';
import { ThemeContext, ThemeContextType } from '../context/ThemeContext.js';


const mockToggleTheme = vi.fn();

const mockThemeContext: ThemeContextType = {
    theme: 'light', 
    toggleTheme: mockToggleTheme,
};

describe('Header component', () => {
    it('renders with the correct theme class', () => {

        render(
            <ThemeContext.Provider value={{ ...mockThemeContext, theme: 'light' }}>
                <Header />
            </ThemeContext.Provider>
        );


        expect(screen.getByText('Book store')).toHaveClass('header_title light');


        expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('renders with the correct theme class for dark theme', () => {

        render(
            <ThemeContext.Provider value={{ ...mockThemeContext, theme: 'dark' }}>
                <Header />
            </ThemeContext.Provider>
        );

        expect(screen.getByText('Book store')).toHaveClass('header_title dark');

        expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('calls toggleTheme when the checkbox is clicked', () => {

        render(
            <ThemeContext.Provider value={{ ...mockThemeContext, theme: 'light' }}>
                <Header />
            </ThemeContext.Provider>
        );

        fireEvent.click(screen.getByRole('checkbox'));

        expect(mockToggleTheme).toHaveBeenCalled();
    });
});
