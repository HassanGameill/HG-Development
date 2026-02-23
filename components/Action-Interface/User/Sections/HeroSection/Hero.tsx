import HeroContent from "./HeroContent";
import HeroActionButton from "./HeroActionButton";
import { HeroData } from "./heroData";
import HeroImage from "./HeroImage";
import { ParticleCanvas } from "@/hooks/particle";
// import getHero from "@/lib/Actions/FrontendAction/getHeroSection";

const Hero = async () => {
  // const heroes = await getHero(); // returns array
  const heroes = await HeroData; // returns array

  const heroData = heroes.find((h) => h.id === "1");

  if (!heroData) return null; // handle missing hero

  return (
    <div className="relative w-full overflow-hidden">
      {/* <HeroBanner bgImages={heroData}  /> */}
            <ParticleCanvas />



      <div className="container relative z-10 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-start">
            <HeroContent heroContent={heroData} />
            <HeroActionButton />
          </div>

          {/* Image Section */}
          <div className="relative order-2 lg:order-2 w-full h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden">
            <HeroImage imagesData={heroData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
