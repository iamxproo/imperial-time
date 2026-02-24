import BrandStory from "../components/home/BrandStory";
import CollectionSection from "../components/home/CollectionSection";
import FeaturedWatches from "../components/home/FeaturedWatches";
import HeroSection from "../components/home/HeroSection";
import PromotionalSection from "../components/home/PromotionalSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <CollectionSection />
      <FeaturedWatches />
      <PromotionalSection />
      <BrandStory />
    </>
  );
};

export default Home;