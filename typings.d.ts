declare global {
  interface NavLinks {
    name: string;
    path: string;
    icon: string;
  }

  type Cabin = {
    capacity: number | null;
    createad_at: string | null;
    discount: number | null;
    id: number;
    image: string | null;
    name: string | null;
    price: number | null;
  };

  type UpdateCabin = {
    capacity: number | undefined;
    discount: number | undefined;
    id: number;
    name: string | undefined;
    price: number | undefined;
  };
}

export {};
