
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
