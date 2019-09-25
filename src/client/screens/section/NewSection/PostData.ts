import Axios from "axios";
import { SectionType, FloorType, RoomType } from "datatypes";
import { ApiPath } from "../../../../global/ApiPath";

export default async function PostData() {
  const alert = {
    msg: "",
    success: true
  };
  try {
    const section = GetSectionFormData();
    if (section) {
      const sectionRes = await Axios.post(`${ApiPath.section}/new`, section);
      console.log(`Post Data from New Section Success ${sectionRes.data}`);

      const floors = GetFloorsFormData(section);
      const floorRes = await Axios.post(`${ApiPath.floor}/new`, floors);
      console.log(`Post Data from New Section Success ${floorRes.data}`);

      const rooms = floors.map(floor => GetRoomsFormData(floor)).flat();
      const roomRes = await Axios.post(`${ApiPath.room}/new`, rooms);
      console.log(`Post Data from New Section Success ${roomRes.data}`);

      alert.msg = "New section created!";
      alert.success = true;
    } else {
      alert.msg = "Section not found!";
      alert.success = false;
    }
  } catch (error) {
    alert.msg = error.response.data as string;
    alert.success = true;
  }
  return alert;
}

export function GetSectionFormData() {
  const sectionForm = document.getElementById("section") as HTMLFormElement;
  if (sectionForm) {
    const sectionFormData = new FormData(sectionForm);
    const section = {} as SectionType;
    section.id = sectionFormData.get("section-id") as string;
    section.floor_quantity = parseInt(sectionFormData.get(
      "floor-quantity"
    ) as string);
    return section;
  }
}

export function GetFloorsFormData(section: SectionType) {
  const floors: FloorType[] = [];
  for (let i = 1; i <= section.floor_quantity; i++) {
    const floorForm = document.getElementById(
      `${section.id}-${i}`
    ) as HTMLFormElement;
    if (floorForm) {
      const floorFormData = new FormData(floorForm);
      const floor: FloorType = {
        section_id: section.id,
        id: i,
        room_quantity: parseInt(floorFormData.get("room-quantity") as string)
      };
      floors.push(floor);
    }
  }
  return floors;
}

export function GetRoomsFormData(floor: FloorType) {
  const rooms: RoomType[] = [];
  for (let i = 1; i <= floor.room_quantity; i++) {
    const roomForm = document.getElementById(
      `${floor.section_id}-${floor.id}-${i}`
    ) as HTMLFormElement;
    if (roomForm) {
      const roomFormData = new FormData(roomForm);
      const room: RoomType = {
        section_id: floor.section_id,
        floor_id: floor.id,
        id: i,
        type: parseInt(roomFormData.get("room-type") as string),
        availability: 1
      };
      rooms.push(room);
    }
  }

  return rooms;
}
