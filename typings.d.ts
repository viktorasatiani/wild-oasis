declare global {
  interface NavLinks {
    name: string;
    path: string;
    icon: string;
  }

  type Cabin = {
    $createdAt: string;
    id: string;
    image: string;
    name: string;
    capacity: number;
    price: number;
    discount: number;
  };
}

export {};
