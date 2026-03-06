import type { PhoneDetail, PhoneSpecs } from "@/lib/types";

export type PhoneSpecsData = Pick<PhoneDetail, "brand" | "name" | "description"> & PhoneSpecs;

export interface SpecKey {
  label: string;
  key: keyof PhoneSpecsData;
}

export const SPEC_KEYS: SpecKey[] = [
  { label: "BRAND", key: "brand" },
  { label: "NAME", key: "name" },
  { label: "DESCRIPTION", key: "description" },
  { label: "SCREEN", key: "screen" },
  { label: "RESOLUTION", key: "resolution" },
  { label: "PROCESSOR", key: "processor" },
  { label: "MAIN CAMERA", key: "mainCamera" },
  { label: "SELFIE CAMERA", key: "selfieCamera" },
  { label: "BATTERY", key: "battery" },
  { label: "OS", key: "os" },
  { label: "SCREEN REFRESH RATE", key: "screenRefreshRate" },
];
