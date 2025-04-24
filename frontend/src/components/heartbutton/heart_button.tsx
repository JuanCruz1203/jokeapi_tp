import { useEffect, useRef } from "react";

interface FavoriteButtonProps {
  onClick?: () => void;
}

export default function FavoriteButton({ onClick }: FavoriteButtonProps) {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
    script.type = "module";
    document.body.appendChild(script);
  }, []);

  const handleClick = () => {
    if (playerRef.current) {
      playerRef.current.seek(0);
      playerRef.current.play();
    }
    if (onClick) {
      onClick(); // ejecuta la función que viene como prop
    }
  };

  return (
    <div className="w-[100px] h-[100px] cursor-pointer" onClick={handleClick}>
      <dotlottie-player
        ref={playerRef}
        src="https://lottie.host/23d3d7cc-60c2-4acb-8541-2b412690a56a/PGaZYWO5Wb.lottie"
        background="transparent"
        speed="1"
        style={{ width: "80px", height: "80px", filter: "brightness(0) invert(1)" }}
        loop={false}
        autoplay={false}
      ></dotlottie-player>
    </div>
  );
}
