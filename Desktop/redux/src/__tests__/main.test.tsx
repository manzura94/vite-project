import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../app/store.js';
import App from '../App.js';
import { ThemeProvider } from '../context/ThemeContext.js';
import React from 'react';

describe('Root application rendering', () => {
    it('renders the app without crashing', () => {
        const div = document.createElement('div');
        div.setAttribute('id', 'root');
        document.body.appendChild(div);

        render(
            <React.StrictMode>
                <Provider store={store}>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </Provider>
            </React.StrictMode>,
            { container: div }
        );
    });
});
