import { elementInterface } from "@/app/view/creator/page";
import Render3D from "@/components/models3d/Render3D";
import { Box } from "@react-three/drei";
import React, {
  Dispatch,
  MouseEvent,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Vector3 } from "three";

interface MenuProps {
  canvasRef: MutableRefObject<HTMLElement | null>;
  setActiveElement: Dispatch<SetStateAction<string>>;
  setElements: Dispatch<SetStateAction<elementInterface[]>>;
}

export default function Menu({
  canvasRef,
  setActiveElement,
  setElements,
}: MenuProps) {
  function appendElement(
    e: React.MouseEvent<HTMLButtonElement>,
    path: string,
    type: "desk" | "static",
    scale: number
  ) {
    const id = `${new Date().getTime().toString()}-${path}`;
    console.log(id);
    setElements((elements) => [
      ...elements,
      {
        id: id,
        path: path,
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        scale: scale,
        type: "static",
        x: e.clientX,
        y: 0,
        z: e.clientY,
      },
    ]);
    setActiveElement(id);

    console.log("append");
  }

  return (
    <div>
      Menu
      <button onClick={(e) => appendElement(e, "pot_cactus", "static", 1)}>
        cactus
      </button>
    </div>
  );
}

// export default function Menu({ workspace }: MenuProps) {
//   //   console.log(workspace);

//   //   function placeDesk() {
//   //     const dupa = document.querySelector("#dupa");
//   //     console.log(dupa);
//   //     dupa?.append(<Box />);
//   //     // if (workspace.current instanceof HTMLElement) {
//   //     //   const space = createRoot(workspace.current);
//   //     //   space.render(<Box />);
//   //     // }
//   //   }

//   useEffect(function () {
//     function animate(e: MouseEvent) {
//       let scale = 0.003;
//       camera.position.x = -5 - (e.clientX * scale) / 2;
//       camera.position.y = 2 + (e.clientY * scale) / 2;
//       camera.position.z = 6 + (-e.clientX * scale) / 2;
//     }

//     document.addEventListener("mousemove", animate);

//     return () => {
//       document.removeEventListener("mousemove", animate);
//     };
//   }, []);

//   const placeDesk = () => {
//     const newPosition = new Vector3(
//       Math.random() * 10 - 5,
//       Math.random() * 10 - 5,
//       Math.random() * 10 - 5
//     );

//     setStaticElements((elements) => [
//       ...elements,
//       { id: prevBoxes.length, position: newPosition },
//     ]);
//   };

//   return (
//     <div>
//       Menu
//       <button onClick={placeDesk}>desk</button>
//     </div>
//   );
// }
