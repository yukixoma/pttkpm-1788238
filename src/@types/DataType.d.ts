declare module "datatypes" {
  export interface SectionType {
    id: string;
    floor_quantity: number;
  }
  export interface FloorType {
    section_id: string;
    id: number;
    room_quantity: number;
  }
  export interface RoomType {
    section_id: string;
    floor_id: number;
    id: number;
    type: number;
    availability: 0 | 1;
    [key: string]: any;
  }
  export interface RoomTypeType {
    id: number;
    price: number;
    convinient: string;
    capacity: number;
  }
  export interface CheckInOutType {
    section_id: string;
    floor_id: number;
    room_id: number;
    id: string;
    price: number;
    total_price: number;
    start_date: string;
    expect_end?: string;
    end_date: string;
    customer_fullname: string;
    customer_id: string;
    is_check_out: 0 | 1;
    [key: string]: any;
  }
  export interface YearRevenueType {
    year: string;
    total: number;
    month: number[];
  }
  export interface AuthorizeInfoType {
    id: string;
    username: string;
    password: string;
    section_id?: string;
    role: string;
  }
  export interface LocalAuthorizedInfoType {
    id: string;
    role: string;
    section_id?: string;
  }
}
