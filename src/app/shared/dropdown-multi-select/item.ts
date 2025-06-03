export interface Item {
  uuid?: string;
  id: number | null;
  name: string;
  checked?: boolean;
  visible?: boolean;
}


export interface Food {
  id: number;
  name: string;
}
