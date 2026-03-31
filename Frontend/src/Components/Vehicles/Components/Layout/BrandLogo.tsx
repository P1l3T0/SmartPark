import { carBrands } from "../../../../Utils/data";

const BrandLogo = ({ brand }: { brand: string }) => {
  const slug = carBrands[brand];
  const carLogos: string = "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized";

  return (
    <img
      src={`${carLogos}/${slug}.png`}
      alt={`${brand} logo`}
      className="w-32 h-auto object-contain"
    />
  );
};

export default BrandLogo;