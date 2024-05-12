interface OfficeDataInterface {
  id: string;
  name: string;
  address: string;
  renderData: OfficeRenderData;
  deskList: Desks[];
  authorId: string;
  users: { name: string; surname: string }[];
  invitationCode: string;
}

type DeskRenderData = {
  deskPath: string;
  deskName: string;
  equipPath: string;
  equipment: string[];
  id: string;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
  type: "static" | "desk";
  x: number;
  y: number;
  z: number;
};

type FloorRenderData = {
  color: string;
  endX: number;
  endY: number;
  endZ: number;
  id: string;
  x: number;
  y: number;
  z: number;
};

type ElementRenderData = {
  id: string;
  path: string;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
  type: "static" | "desk";
  x: number;
  y: number;
  z: number;
};

type WallRenderData = {
  color: string;
  endX: number;
  endY: number;
  endZ: number;
  id: string;
  transparent?: boolean;
  x: number;
  y: number;
  z: number;
};

type OfficeRenderData = {
  desks: DeskRenderData[];
  floor: FloorRenderData[];
  elements: ElementRenderData[];
  walls: WallRenderData[];
};

export type ReservationData = {
  reservationId: string;
  userId: string;
  user: { name: string; surname: string };
  startTime: Date;
  endTime: Date;
  createdAt: Date;
};

export type Desks = {
  deskId: string;
  deskName: string;
  equipment: string[];
  reservationData: ReservationData[];
  active: boolean;
};

export default OfficeDataInterface;
