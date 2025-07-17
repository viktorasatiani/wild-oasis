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

  type Booking = {
    id: number;
    created_at: string | null;
    startDate: string | null;
    endDate: string | null;
    numNights: number | null;
    numGuests: number | null;
    totalPrice: number | null;
    status: string | null;
    guests: { fullName: string | null; email: string | null } | null;
    cabins: { name: string | null } | null;
  };

  type BookingTable = {
    id: number;
    created_at: string;
    startDate: string | null;
    endDate: string | null;
    numNights: number | null;
    numGuests: number | null;
    totalPrice: number | null;
    status: string | null;
    guestsName: string | null | undefined;
    guestsEmail: string | null | undefined;
    cabinsId: string | null | undefined;
  };
}

export {};
