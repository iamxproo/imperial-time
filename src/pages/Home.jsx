import BrandStory from "../components/home/BrandStory";
import CollectionSection from "../components/home/CollectionSection";
import FeaturedWatches from "../components/home/FeaturedWatches";
import HeroSection from "../components/home/HeroSection";
import PromotionalSection from "../components/home/PromotionalSection";
import SignatureShowcase from "../components/home/SignatureShowcase";

const Home = () => {
  return (
    <>
      <HeroSection />
      <CollectionSection />
      <FeaturedWatches />
      <SignatureShowcase />
      <PromotionalSection />
      <BrandStory />
    </>
  );
};

export default Home;