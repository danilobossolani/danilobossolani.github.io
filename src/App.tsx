import { SiteProvider } from './context/SiteContext';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Work } from './components/Work';
import { Experience } from './components/Experience';
import { Stack } from './components/Stack';
import { AI } from './components/AI';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <SiteProvider>
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <Experience />
        <Stack />
        <AI />
        <Contact />
      </main>
      <Footer />
    </SiteProvider>
  );
}
