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
import AdminPanel from './pages/AdminPanel.jsx';
import Tailwind from "./pages/Tailiwnd.jsx";
import Javascript from "./pages/Javascript.jsx";
import Course from "./pages/Course.jsx";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/verify-certificate" element={<CertificateInput />} />
        <Route path="/certificate-preview/:authCode" element={<CertificatePreview />} />
        <Route path="/join-our-team" element={<JoinOurTeamSection />} />
        <Route path="/project" element={<Projects />} />
        <Route path="/tailwind" element={<Tailwind />} />
<Route path="/admin9958399157" element={<AdminPanel />} />
        <Route path="/course" element={<Course />} />
 
 
        <Route path="/javascript" element={<Javascript />} />
        {/* Catch-all for 404 */}
        <Route path="*" element={<NotFound />} />
      
      </Routes>
    </Router>
  );
};

export default App;
