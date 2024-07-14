import Home from './components/Home.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundry.js';
import ItemView from './components/ItemView.js';
import { NotFound } from './components/NotFound.js';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';

export const App: React.FC = () => {

  const containerRef = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(false);
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/details/:id"
            element={
              <ItemView
                containerRef={containerRef}
                display={display}
                setDisplay={setDisplay}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};
