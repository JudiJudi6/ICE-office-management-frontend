import * as THREE from "three";
import { ThreeEvent, useLoader } from "@react-three/fiber";
import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Mesh, MeshPhongMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Clone } from "@react-three/drei";
import { deskInterface } from "@/app/view/creator/page";

export default function Desk3D({
  id,
  x,
  y,
  z,
  scale,
  rotX = 0,
  rotY = 0,
  rotZ = 0,
  deskPath,
  equipPath,
  transparent,
  mouseInteractions = false,
  destroyElement,
  equipment,
}: deskInterface) {
  const [enter, setEnter] = useState(false);
  const deskUrl = `/assets3d/${deskPath}.glb`;
  const epuipUrl = `/assets3d/${equipPath}.glb`;
  const pcUrl = `/assets3d/pc.glb`;
  const mesh = useRef<Mesh>(null!);
  const gltf1 = useLoader(GLTFLoader, deskUrl);
  const gltf2 = useLoader(GLTFLoader, epuipUrl);
  const gltf3 = useLoader(GLTFLoader, pcUrl);
  const scene1 = gltf1.scene;
  const scene2 = gltf2.scene;
  const scene3 = gltf3.scene;

  return (
    <Suspense fallback={null}>
      <mesh
        ref={mesh}
        position={[x, y, z]}
        scale={scale}
        rotation={[rotX, rotY, rotZ]}
        receiveShadow
        castShadow={true}
      >
        <Clone
          object={scene1}
          castShadow
          receiveShadow
          onPointerEnter={(e) => {
            e.stopPropagation();
            setEnter(true);
          }}
          rotation={[0, equipment.includes("desk 90deg") ? 3.15 : 0, 0]}
          onPointerLeave={() => setEnter(false)}
          onClick={(e) => {
            destroyElement && id && destroyElement(e, id);
            console.log(equipment);
          }}
          inject={
            mouseInteractions && enter ? (
              <meshStandardMaterial
                color={0xff0000}
                opacity={0.5}
                transparent
              />
            ) : (
              transparent && (
                <meshStandardMaterial
                  color={0x00ab1b}
                  opacity={0.8}
                  transparent
                />
              )
            )
          }
        />
        <Clone
          object={scene2}
          position={new THREE.Vector3(0.3, 1.6, 0)}
          castShadow
          receiveShadow
          onPointerEnter={(e) => {
            e.stopPropagation();
            setEnter(true);
          }}
          onPointerLeave={() => setEnter(false)}
          onClick={(e) => {
            destroyElement && id && destroyElement(e, id);
            console.log(equipment);
          }}
          inject={
            mouseInteractions && enter ? (
              <meshStandardMaterial
                color={0xff0000}
                opacity={0.5}
                transparent
              />
            ) : (
              transparent && (
                <meshStandardMaterial
                  color={0x00ab1b}
                  opacity={0.8}
                  transparent
                />
              )
            )
          }
        />
        <Clone
          object={scene3}
          position={
            new THREE.Vector3(
              0,
              0,
              equipment.includes("big desk") ? 1.38 : 0.88
            )
          }
          rotation={[0, 3.15, 0]}
          castShadow
          receiveShadow
          onPointerEnter={(e) => {
            e.stopPropagation();
            setEnter(true);
          }}
          onPointerLeave={() => setEnter(false)}
          onClick={(e) => {
            destroyElement && id && destroyElement(e, id);
            console.log(equipment);
          }}
          inject={
            mouseInteractions && enter ? (
              <meshStandardMaterial
                color={0xff0000}
                opacity={0.5}
                transparent
              />
            ) : (
              transparent && (
                <meshStandardMaterial
                  color={0x00ab1b}
                  opacity={0.8}
                  transparent
                />
              )
            )
          }
        />
      </mesh>
    </Suspense>
  );
}
