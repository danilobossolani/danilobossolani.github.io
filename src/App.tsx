import { SiteProvider } from './context/SiteContext';
import { Nav } from './components/Nav';
import { ScrollProgress } from './components/ScrollProgress';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Work } from './components/Work';
import { About } from './components/About';
import { Stack } from './components/Stack';
import { AI } from './components/AI';
import { Path } from './components/Path';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <SiteProvider>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Work />
        <About />
        <Stack />
        <AI />
        <Path />
        <Contact />
      </main>
      <Footer />
    </SiteProvider>
  );
}
