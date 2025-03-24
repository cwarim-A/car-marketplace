export interface Item {
    label: string;
    name: string;
    fieldType: string;
    required?: boolean;
    column: number;
    icon: string;
    options?: any[]; 
  }

export interface feature{
  label:string;
  name:string;
  fieldType:string;
}

export interface CarFeatures {
  powerSteering: boolean;
  stabilityControl: boolean;
  tractionControl: boolean;
  brakeAssist: boolean;
  antiLockBraking: boolean;
  airConditioner:boolean;
  leatherSeats:boolean;
  touchScreenDisplay:boolean;
  childSafetyLocks:boolean;
  rainSensingWiper:boolean;
  bluetooth:boolean;
  digitalOdometer:boolean;
  panoramicRoof:boolean;
  driverAirBag:boolean;
  rearSpoiler:boolean;
  androidAuto:boolean;
  homeLink:boolean;
  heater:boolean;
  tachometer:boolean;
  powerDoorLocks:boolean;
  fogLightFronts:boolean;
  windowsElectric:boolean;
  appleCarplay:boolean;
  comfortConvenience:boolean;
  appleCarPlay:boolean;
}

export interface CarListing {
  id: number;
  listingTitle: string;
  tagline: string;
  originalPrice: string | null;
  sellingPrice: string;
  category: string;
  condition: string;
  make: string;
  model: string;
  year: string;
  driveType: string;
  transmission: string;
  fuelType: string;
  mileage: string;
  engineSize: string | null;
  cylinder: string | null;
  color: string;
  door: string;
  vin: string | null;
  offerType: string | null;
  listingDescription: string;
  features: CarFeatures | null ;
  createdBy: string;
  userName: string;
  userImageUrl: string | null;
  postedOn: string | null;

}

export interface CarImage {
  id: number;
  imageUrl: string;
  carListingId: number;
}

export interface ResponseItem {
  carListing?: CarListing;
  carImages: CarImage | null;
}

export interface ResultItem {
  car: CarListing;
  images: CarImage[];
}

export interface FinalResultItem extends CarListing {
  images: CarImage[];
  userImageUrl: string | null; 
  [key: string]: any;
}




export interface CarDetail {
  id: number;
  listingTitle: string;
  listingDescription:string;
  sellingPrice:string;
  category: string;
  color: string;
  condition: string;
  cylinder: string | null;
  door: string;
  driveType: string;
  engineSize: string | null;
  make: string;
  model: string;
  offerType: string | null;
  originalPrice: string | null;
  tagline: string;
  year: string ;
  mileage: string ;
  transmission: string;
  fuelType: string;
  features: CarFeatures | null; 
  createdBy: string;
  userName: string;
  userImageUrl: string | null ;
  images: CarImage[];
  [key: string]: any;
}

export interface CarInfo {
  listingTitle: string;
  tagline: string;
  originalPrice: string | null;
  sellingPrice: string;
  category: string;
  condition: string;
  make: string;
  model: string;
  year: string;
  driveType: string;
  transmission: string;
  fuelType: string;
  mileage: string;
  engineSize: string | null;
  cylinder: string | null;
  color: string;
  door: string;
  vin: string | null;
  offerType: string | null;
  listingDescription: string;
  createdBy: string;
  userName: string;
  userImageUrl: string | null;
  postedOn: string | null;
  [key: string]: string | null;
}
