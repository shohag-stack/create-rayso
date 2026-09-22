import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type SliderImage = {
  label?: string;
  url: string;
};

export interface BookingFormValues {
  adults: number;
  children: number;
  checkIn: string;
  checkOut: string;
  promoCode: string;
}

export interface SearchParams {
  checkIn?:  string;
  checkOut?: string;
  adults?:   string;
  children?: string;
  promo?:    string;
}
