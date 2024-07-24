import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import  { useContext } from 'react';
import { ThemeProvider, ThemeContext } from '../context/ThemeContext.js';


const TestComponent = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)!;
    
    return (
        <div>
            <p data-testid="theme">{theme}</p>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
};

describe('ThemeContext', () => {
    it('provides default theme and toggle functionality', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );


        expect(screen.getByTestId('theme')).toHaveTextContent('light');
        

        fireEvent.click(screen.getByText('Toggle Theme'));
        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
        

        fireEvent.click(screen.getByText('Toggle Theme'));
        expect(screen.getByTestId('theme')).toHaveTextContent('light');
    });
});
