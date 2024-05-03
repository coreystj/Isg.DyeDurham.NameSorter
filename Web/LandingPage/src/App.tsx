
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '/App.css'

import LandingPage from './components/LandingPage/Main'

export default function App() {

  return (
      <Router>
        <Routes>
          <Route path="/index.html" element={<LandingPage />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
  );
}
