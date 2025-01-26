// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import RegistrationForm from './pages/RegistrationForm.jsx';
import CertificateInput from './pages/CertificateInput.jsx';
import CertificatePreview from './pages/CertificatePreview.jsx';
import JoinOurTeamSection from './sections/JoinOurTeamSection.jsx';
import Projects from './sections/Projects.jsx';
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/verify-certificate" element={<CertificateInput />} />
        <Route path="/certificate-preview/:authCode" element={<CertificatePreview />} />
        <Route path="/join-our-team" element={<JoinOurTeamSection />} />
        <Route path="/project" element={<Projects />} />
        {/* Catch-all route for 404 pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
