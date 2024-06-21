import { FaFire } from "react-icons/fa";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Spinner from "@/components/ui/Spinner";
import Render3D from "@/components/models3d/Render3D";
import Desk3D from "@/components/models3d/Desk3D";

export default function Greeting() {
  return (
    <div className="h-screen pb-10 max-w-7xl mx-auto">
      <div className="static  lg:grid grid-cols-2 h-full py-8 mx-5 md:mx-10 z-[0]  shadow-2xl  text-black rounded-3xl bg-cover bg-white">
        <div className=" mt-[25vh] lg:mt-0 place-content-center justify-center items-center lg:ml-20 ">
          <div className="justify-center items-center  py-12 ">
            <h1 className="z-[0] font-bold sm:text-5xl text-4xl text-center lg:text-left items-center justify-center ">
              <span className="  lg:ml-24">Welcome to</span>
              <span className=" static z-[0] justify-center lg:justify-normal flex text-5xl sm:text-7xl lg:ml-5 my-5">
                <FaFire className="  text-main2 " />
                <span className=" font-normal">Fire</span>
                <span className=" font-normal text-main2 ">Desk</span>!
              </span>
            </h1>
          </div>
          <h2 className=" justify-center mx-10 sm:mx-20 md:mx-32 lg:ml-24 lg:mx-0 2xl:mr-20 sm:text-2xl text-xl md800:my-5 flex items-centre text-center lg:text-left">
            Reserve your desk and do not worry about place to work!
          </h2>

          <a
            href="/signup"
            className="justify-center flex md:grid my-5 py-2 mx-10 sm:mx-32 md:mx-40 px-10 min-w-40 lg:ml-24 bg-gradient-to-r to-main1 via-main2 from-main1 bg-size-200 bg-pos-0 hover:bg-pos-100  text-white uppercase tracking-widest rounded-full transition-all duration-300"
          >
            Sign up
          </a>
        </div>
        <div className="hidden lg:block">
          <Suspense fallback={<Spinner />}>
            <Canvas
              camera={{
                fov: 60,
                position: [-9, 3, 7],
              }}
              shadows={true}
            >
              <OrbitControls
                target={new THREE.Vector3(-1, -0.5, 0)}
                enableZoom={false}
                enableDamping={false}
                enablePan={false}
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 2 - 0.1}
              />
              <Desk3D
                id={"1"}
                deskName={"1"}
                type={"static"}
                deskPath={"desk_bigger"}
                equipPath={"pc_setup_dual_monitor"}
                x={0}
                y={-1.5}
                z={0}
                rotX={0}
                rotY={0}
                rotZ={0}
                scale={1}
                transparent={false}
                equipment={[
                  "laptop",
                  "second monitor",
                  "lamp",
                  "mini cactus",
                  "big desk",
                ]}
              />
              <Render3D
                path="chair_black"
                x={-2}
                y={-1.5}
                z={-1}
                scale={0.8}
                rotY={2}
              />
              <mesh
                position={new THREE.Vector3(-1, -1.5, 0)}
                geometry={new THREE.BoxGeometry(5, 0.1, 5)}
                receiveShadow={true}
                castShadow={true}
              >
                <meshPhongMaterial color={"#e4d3c8"} />
              </mesh>
              <ambientLight intensity={4} />
              <directionalLight
                castShadow={true}
                position={[1, 3, 0]}
                intensity={10}
                color="#fff"
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
            </Canvas>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
