type Variant = "el-primo" | "default" | "leon" | "skeleton";
interface FarmButtonProps {
  variant?: Variant;
  className?: string;
}
const skins: Record<Variant, string> = {
  "el-primo": "/images/el-primo.png",
  // default: "/images/default.png",
  default: "/images/brawl-button.svg",
  leon: "/images/leon.png",
  skeleton: "/images/skeleton.webp",
};

export default function FarmButtonSkin({
  variant = "el-primo",
  className = "",
}: FarmButtonProps) {
  const currentSkin = skins[variant];

  return (
    <div
      className="size-full rounded-full"
      style={{
        background: `url(${currentSkin})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    />
  );
}
