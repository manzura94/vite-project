import  { useContext } from 'react';
import './Header.css';
import { ThemeContext, ThemeContextType } from '../context/ThemeContext.js';

export const Header = () => {
    const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextType;
    console.log(theme);

    return (
        <header className='header'>
            <h1 className={`header_title ${theme}`}>Book store</h1>
            <div>
                <label className='theme-toggle-button'>
                    <input type='checkbox' checked={theme === 'dark'} onChange={toggleTheme} />
                    <span className='slider'></span>
                </label>
            </div>
        </header>
    );
};
