interface CardHeaderProps {
  image: string | null; 
}

export default function CardHeader({ image }: CardHeaderProps) {
  return (
    <div>
      <img
        src={image || "https://www.mapsofworld.com/style_2019/images/world-map.png?v:1"}
        alt="Georgia"
        className="country-image"
      />
    </div>
  );
}
