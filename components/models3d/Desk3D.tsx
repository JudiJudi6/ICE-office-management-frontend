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
  activeDesk,
  setActiveDesk,
  selectedDesk,
  setSelectedDesk,
  isDeskAvailable,
  highlightDesks,
}: deskInterface) {
  const [enter, setEnter] = useState(false);
  const deskUrl = `/assets3d/${deskPath}.glb`;
  const epuipUrl = `/assets3d/${equipPath}.glb`;
  const pcUrl = `/assets3d/pc.glb`;
  const laptopUrl = `/assets3d/laptop.glb`;
  const miniCactusUrl = `/assets3d/pot_cactus.glb`;
  const lampUrl = `/assets3d/lamp3.glb`;
  const mesh = useRef<Mesh>(null!);
  const gltf1 = useLoader(GLTFLoader, deskUrl);
  const gltf2 = useLoader(GLTFLoader, epuipUrl);
  const gltf3 = useLoader(GLTFLoader, pcUrl);
  const gltf4 = useLoader(GLTFLoader, laptopUrl);
  const gltf5 = useLoader(GLTFLoader, miniCactusUrl);
  const gltf6 = useLoader(GLTFLoader, lampUrl);
  const scene1 = gltf1.scene;
  const scene2 = gltf2.scene;
  const scene3 = gltf3.scene;
  const scene4 = gltf4.scene;
  const scene5 = gltf5.scene;
  const scene6 = gltf6.scene;

  console.log(isDeskAvailable);

  return (
    <Suspense fallback={null}>
      <mesh
        ref={mesh}
        position={[x, y, z]}
        scale={scale}
        rotation={[rotX, rotY, rotZ]}
        receiveShadow
        castShadow={true}
        onClick={() => {
          if (setSelectedDesk && selectedDesk) {
            setSelectedDesk(id);
            console.log(selectedDesk);
          }
        }}
      >
        <Clone
          object={scene1}
          castShadow
          receiveShadow
          onPointerEnter={(e) => {
            e.stopPropagation();
            if (setActiveDesk) {
              setActiveDesk(id);
            }
            setEnter(true);
          }}
          rotation={[0, equipment.includes("desk 90deg") ? 3.15 : 0, 0]}
          onPointerLeave={() => {
            setEnter(false);
            if (setActiveDesk) {
              setActiveDesk("");
            }
          }}
          onClick={(e) => {
            destroyElement && id && destroyElement(e, id);
            setSelectedDesk && setSelectedDesk(id);
            console.log(equipment);
          }}
          inject={
            mouseInteractions && enter ? (
              <meshStandardMaterial
                color={0xff0000}
                opacity={0.5}
                transparent
              />
            ) : transparent ? (
              <meshStandardMaterial
                color={0x00ab1b}
                opacity={0.8}
                transparent
              />
            ) : activeDesk === id || selectedDesk === id ? (
              <meshStandardMaterial
                color={0x00ab1b}
                opacity={0.8}
                transparent
              />
            ) : (
              highlightDesks &&
              (isDeskAvailable ? (
                <meshStandardMaterial
                  color={0x00ab1b}
                  opacity={0.8}
                  transparent
                />
              ) : (
                <meshStandardMaterial
                  color={0xff0000}
                  opacity={0.8}
                  transparent
                />
              ))
            )
          }
        />
        <Clone
          object={scene2}
          position={
            new THREE.Vector3(
              equipment.includes("laptop") &&
              equipment.includes("second monitor")
                ? 0.2
                : 0.3,
              1.6,
              equipment.includes("laptop") &&
              equipment.includes("second monitor")
                ? 0.5
                : 0
            )
          }
          castShadow
          receiveShadow
          rotation={[
            0,
            equipment.includes("laptop") && equipment.includes("second monitor")
              ? -0.2
              : 0,
            0,
          ]}
          onPointerEnter={(e) => {
            e.stopPropagation();
            setEnter(true);
            if (setActiveDesk) {
              setActiveDesk(id);
            }
          }}
          onPointerLeave={() => {
            setEnter(false);
            if (setActiveDesk) {
              setActiveDesk("");
            }
          }}
          onClick={(e) => {
            destroyElement && id && destroyElement(e, id);
            setSelectedDesk && setSelectedDesk(id);
            console.log(equipment);
          }}
          inject={
            mouseInteractions && enter ? (
              <meshStandardMaterial
                color={0xff0000}
                opacity={0.5}
                transparent
              />
            ) : transparent ? (
              <meshStandardMaterial
                color={0x00ab1b}
                opacity={0.8}
                transparent
              />
            ) : activeDesk === id || selectedDesk === id ? (
              <meshStandardMaterial
                color={0x00ab1b}
                opacity={0.8}
                transparent
              />
            ) : (
              highlightDesks &&
              (isDeskAvailable ? (
                <meshStandardMaterial
                  color={0x00ab1b}
                  opacity={0.8}
                  transparent
                />
              ) : (
                <meshStandardMaterial
                  color={0xff0000}
                  opacity={0.8}
                  transparent
                />
              ))
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
            if (setActiveDesk) {
              setActiveDesk(id);
            }
          }}
          onPointerLeave={() => {
            setEnter(false);
            if (setActiveDesk) {
              setActiveDesk("");
            }
          }}
          onClick={(e) => {
            destroyElement && id && destroyElement(e, id);
            setSelectedDesk && setSelectedDesk(id);
            console.log(equipment);
          }}
          inject={
            mouseInteractions && enter ? (
              <meshStandardMaterial
                color={0xff0000}
                opacity={0.5}
                transparent
              />
            ) : transparent ? (
              <meshStandardMaterial
                color={0x00ab1b}
                opacity={0.8}
                transparent
              />
            ) : activeDesk === id || selectedDesk === id ? (
              <meshStandardMaterial
                color={0x00ab1b}
                opacity={0.8}
                transparent
              />
            ) : (
              highlightDesks &&
              (isDeskAvailable ? (
                <meshStandardMaterial
                  color={0x00ab1b}
                  opacity={0.8}
                  transparent
                />
              ) : (
                <meshStandardMaterial
                  color={0xff0000}
                  opacity={0.8}
                  transparent
                />
              ))
            )
          }
        />
        {equipment.includes("laptop") && (
          <Clone
            object={scene4}
            position={new THREE.Vector3(-0.1, 1.6, -1.2)}
            rotation={[0, -1, 0]}
            castShadow
            receiveShadow
            onPointerEnter={(e) => {
              e.stopPropagation();
              setEnter(true);
              if (setActiveDesk) {
                setActiveDesk(id);
              }
            }}
            onPointerLeave={() => {
              setEnter(false);
              if (setActiveDesk) {
                setActiveDesk("");
              }
            }}
            onClick={(e) => {
              destroyElement && id && destroyElement(e, id);
              setSelectedDesk && setSelectedDesk(id);
              console.log(equipment);
            }}
            inject={
              mouseInteractions && enter ? (
                <meshStandardMaterial
                  color={0xff0000}
                  opacity={0.5}
                  transparent
                />
              ) : transparent ? (
                <meshStandardMaterial
                  color={0x00ab1b}
                  opacity={0.8}
                  transparent
                />
              ) : activeDesk === id || selectedDesk === id ? (
                <meshStandardMaterial
                  color={0x00ab1b}
                  opacity={0.8}
                  transparent
                />
              ) : (
                highlightDesks &&
                (isDeskAvailable ? (
                  <meshStandardMaterial
                    color={0x00ab1b}
                    opacity={0.8}
                    transparent
                  />
                ) : (
                  <meshStandardMaterial
                    color={0xff0000}
                    opacity={0.8}
                    transparent
                  />
                ))
              )
            }
          />
        )}
        {equipment.includes("mini cactus") && (
          <Clone
            object={scene5}
            position={
              new THREE.Vector3(
                0.2,
                1.6,
                equipment.includes("second monitor") ? 1.5 : 1.2
              )
            }
            scale={0.2}
            rotation={[0, -1, 0]}
            castShadow
            receiveShadow
            onPointerEnter={(e) => {
              e.stopPropagation();
              setEnter(true);
              if (setActiveDesk) {
                setActiveDesk(id);
              }
            }}
            onPointerLeave={() => {
              setEnter(false);
              if (setActiveDesk) {
                setActiveDesk("");
              }
            }}
            onClick={(e) => {
              destroyElement && id && destroyElement(e, id);
              setSelectedDesk && setSelectedDesk(id);
              console.log(equipment);
            }}
            inject={
              mouseInteractions && enter ? (
                <meshStandardMaterial
                  color={0xff0000}
                  opacity={0.5}
                  transparent
                />
              ) : transparent ? (
                <meshStandardMaterial
                  color={0x00ab1b}
                  opacity={0.8}
                  transparent
                />
              ) : activeDesk === id || selectedDesk === id ? (
                <meshStandardMaterial
                  color={0x00ab1b}
                  opacity={0.8}
                  transparent
                />
              ) : (
                highlightDesks &&
                (isDeskAvailable ? (
                  <meshStandardMaterial
                    color={0x00ab1b}
                    opacity={0.8}
                    transparent
                  />
                ) : (
                  <meshStandardMaterial
                    color={0xff0000}
                    opacity={0.8}
                    transparent
                  />
                ))
              )
            }
          />
        )}
        {equipment.includes("lamp") && (
          <Clone
            object={scene6}
            position={
              new THREE.Vector3(
                equipment.includes("second monitor") ? -0.8 : -0.1,
                1.6,
                equipment.includes("second monitor") ? -1.5 : 1.4
              )
            }
            rotation={[0, equipment.includes("second monitor") ? -1 : 2, 0]}
            castShadow
            receiveShadow
            onPointerEnter={(e) => {
              e.stopPropagation();
              setEnter(true);
              if (setActiveDesk) {
                setActiveDesk(id);
              }
            }}
            onPointerLeave={() => {
              setEnter(false);
              if (setActiveDesk) {
                setActiveDesk("");
              }
            }}
            onClick={(e) => {
              destroyElement && id && destroyElement(e, id);
              setSelectedDesk && setSelectedDesk(id);
              console.log(equipment);
            }}
            inject={
              mouseInteractions && enter ? (
                <meshStandardMaterial
                  color={0xff0000}
                  opacity={0.5}
                  transparent
                />
              ) : transparent ? (
                <meshStandardMaterial
                  color={0x00ab1b}
                  opacity={0.8}
                  transparent
                />
              ) : activeDesk === id || selectedDesk === id ? (
                <meshStandardMaterial
                  color={0x00ab1b}
                  opacity={0.8}
                  transparent
                />
              ) : (
                highlightDesks &&
                (isDeskAvailable ? (
                  <meshStandardMaterial
                    color={0x00ab1b}
                    opacity={0.8}
                    transparent
                  />
                ) : (
                  <meshStandardMaterial
                    color={0xff0000}
                    opacity={0.8}
                    transparent
                  />
                ))
              )
            }
          />
        )}
      </mesh>
    </Suspense>
  );
}
