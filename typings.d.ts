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
    name: string;
    image: string | null | undefined;
    price: number | undefined;
    createad_at?: string | null | undefined;
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

  type BookingDetails = {
    cabinId: number | null;
    cabins: { name: string | null } | null;
    cabinPrice: number | null;
    created_at: string;
    endDate: string | null;
    extrasPrice: number | null;
    guestId: number | null;
    guests: {
      fullName: string | null;
      email: string | null;
      nationalID: string | null;
      countryFlag: string | null;
    } | null;
    hasBreakfast: boolean | null;
    id: number;
    isPaid: boolean | null;
    numGuests: number | null;
    numNights: number | null;
    observations: string | null;
    startDate: string | null;
    status: string | null;
    totalPrice: number | null;
  } | null;

  type Settings = {
    breakfastPrice: number | null;
    minBookingLength: number | null;
    maxBookingLength: number | null;
    maxGuestsPerBooking: number | null;
    id: number;
    created_at: string | null;
  };
}

export {};
