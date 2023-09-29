import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// theme
import ThemeProvider from '../theme';
// components
import { StyledChart } from '../components/chart';
import ScrollToTop from '../components/scroll-to-top';

export default function index() {
    return (
        <HelmetProvider>
            <ThemeProvider>
                <ScrollToTop />
                <StyledChart />
            </ThemeProvider>
        </HelmetProvider>
    );
}
