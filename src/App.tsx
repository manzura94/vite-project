import Home from './components/Home.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundry.js';
import ItemView from './components/ItemView.js';
import { NotFound } from './components/NotFound.js';

export const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<ItemView />} />
          <Route path="*" element={<NotFound />} />
          {/* </Route> */}
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};
