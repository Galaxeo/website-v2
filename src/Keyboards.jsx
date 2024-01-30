import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Image,
  Text,
  Billboard,
  ScrollControls,
  useScroll,
  Html,
} from "@react-three/drei";
import { easing } from "maath";
import { useSpring, animated } from "@react-spring/three";
const keyboardDescriptions = [
  {
    title: "GMMK Pro",
    switches: "Banana Splits",
    keycaps: "EnjoyPBT WoB",
  },
  {
    title: "Mode Eighty First Edition",
    switches: "Original Aspirations",
    keycaps: "GMK Honor Dark",
  },
  {
    title: "KBD8X MKII",
    switches: "Boba U4Ts",
    keycaps: "EnjoyPBT Sky Dolch",
  },
  {
    title: "Mode SixtyFive",
    switches: "NovelKeys Creams",
    keycaps: "EnjoyPBT Blumen",
  },
  {
    title: "Rama M65-B",
    switches: "Boba U4Ts",
    keycaps: "GMK Hallyu",
  },
  {
    title: "Tofu 65",
    switches: "Hako Clears",
    keycaps: "PG Retro",
  },
  {
    title: "NK65 Entry Edition",
    switches: "Boba U4Ts",
    keycaps: "XDA Apollo",
  },
  {
    title: "Rama U80-A SEQ2",
    switches: "Boba U4Ts",
    keycaps: "EnjoyPBT Miami Nights",
  },
  {
    title: "Bakeneko 65",
    switches: "Mauves",
    keycaps: "NicePBT Sugarplum",
  },
  {
    title: "NK87",
    switches: "Boba U4 Silents",
    keycaps: "NovelKeys Cherry Blossom",
  },
  {
    title: "Mode Eighty 2022",
    switches: "Pewters",
    keycaps: "XY Kitty Paw",
  },
  {
    title: "Owlab Spring",
    switches: "Original Aspiration Creamsicles",
    keycaps: "GMK Alter",
  },
  {
    title: "Monokei x TGR Tomo",
    switches: "MX Browns",
    keycaps: "NicePBT Noel",
  },
  {
    title: "Norbauer Heavy Grail",
    switches: "Topre",
    keycaps: "Stock HHKB",
  },
  {
    title: "Wooting 60HE in Mekanisk Fjell",
    switches: "Geon Raptors/Gateron Lekker Frankenswitch",
    keycaps: "GMK Hallyu",
  },
  {
    title: "Mode Sonnet",
    switches: "Boba U4Ts",
    keycaps: "NovelKeys Cherry Taro",
  },
  {
    title: "Mode Envoy",
    switches: "NK Dreams",
    keycaps: "MW Heresy",
  },
];
export function Scene() {
  const props = useSpring({
    scale: [1.2, 1.2, 1.2],
    from: { scale: [0, 0, 0] },
    config: { mass: 0.7, tension: 70, friction: 20 },
  });
  const imagePaths = Array.from(
    { length: 17 },
    (_, i) => `../src/assets/Keyboards/${i + 1}.jpg`
  );
  const ref = useRef();
  const scroll = useScroll();
  const radius = 2;
  const [hoveredImage, setHoveredImage] = useState(null);
  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2);
    state.events.update();
    easing.damp3(state.camera.position, [0, 3, 9], 0.3, delta);
    state.camera.lookAt(0, 0, 0);
    const cameraDirection = new THREE.Vector3();
    state.camera.getWorldDirection(cameraDirection);

    let minDistance = Infinity;
    let imageInFront = null;
    ref.current.children.forEach((billboard, i) => {
      const image = billboard.children[0]; // Access the image
      const imageWorldPosition = new THREE.Vector3();
      image.getWorldPosition(imageWorldPosition); // Get the world position of the image
      const distance = imageWorldPosition.distanceTo(state.camera.position);
      if (distance < minDistance) {
        minDistance = distance;
        imageInFront = i;
      }
    });

    setHoveredImage(imageInFront + 1);
  });
  const hoveredImageUrl =
    hoveredImage !== null ? imagePaths[hoveredImage - 1] : null;

  return (
    <>
      <animated.group scale={props.scale} ref={ref}>
        {imagePaths.map((path, i) => {
          const theta = (i / imagePaths.length) * 2 * Math.PI;
          const x = radius * Math.cos(theta);
          const z = radius * Math.sin(theta);

          return (
            <Billboard
              key={i + 1}
              position={[x, -1, z]}
              onPointerOver={() => setHoveredImage(i + 1)}
              onPointerOut={() => setHoveredImage(null)}
            >
              <Image url={path} />
            </Billboard>
          );
        })}
        {hoveredImageUrl && ( // Add this block
          <Billboard position={[0, radius, 0]}>
            <Image
              scale={[7.12, 4]}
              url={hoveredImageUrl}
              transparent
              opacity={0.85}
            />
            <Text
              font={"./RodinL.woff"}
              position={[-3, 2.5, 0]}
              anchorX={"left"}
              color={"white"}
            >
              kb inform
            </Text>
          </Billboard>
        )}
      </animated.group>
    </>
  );
}

export function Keyboards() {
  return (
    <ScrollControls infinite>
      <Scene />
    </ScrollControls>
  );
}
