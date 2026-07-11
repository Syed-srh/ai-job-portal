import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ToastContainer from './components/ToastContainer';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { SavedJobsProvider } from './context/SavedJobsContext';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import SavedJobs from './pages/SavedJobs';
import About from './pages/About';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <SavedJobsProvider>
          <BrowserRouter>
            <ScrollToTop />
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/jobs/:id" element={<JobDetails />} />
                  <Route path="/saved" element={<SavedJobs />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <ToastContainer />
          </BrowserRouter>
        </SavedJobsProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
