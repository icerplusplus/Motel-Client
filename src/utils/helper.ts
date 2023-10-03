import { LocationType } from "@/hooks";

export const currencyFormatter = new Intl.NumberFormat("vn-VN", {
  style: "currency",
  currency: "VND",
  notation: "compact",
  // These options are needed to round to whole numbers if that's what you want.
  // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const formatCurrencyWithoutSymbol = (value: number) => {
  // Format the value with currency symbol
  const formattedValueWithSymbol = currencyFormatter.format(value);

  // Remove the currency symbol ('đ')
  const formattedValueWithoutSymbol = formattedValueWithSymbol.replace(
    /[^0-9.,]/g,
    ""
  );

  return formattedValueWithoutSymbol;
};

export const convertTime = (timestampString: string) => {
  // Parse the timestamp into a Date object (as discussed earlier)
  const [datePart, timePart] = timestampString.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);

  const timeComponents = timePart.split(":");
  const hour = Number(timeComponents[0]);
  const minute = Number(timeComponents[1]);
  const secondsAndMicroseconds = timeComponents[2].split(".");
  const second = Number(secondsAndMicroseconds[0]);
  const microseconds = Number(secondsAndMicroseconds[1]);
  const milliseconds = Math.floor(microseconds / 1000);

  const timestampDate = new Date(
    year,
    month - 1,
    day,
    hour,
    minute,
    second,
    milliseconds
  );

  // Convert to Vietnam (VN) timezone
  const options = { timeZone: "Asia/Ho_Chi_Minh" };
  return timestampDate.toLocaleString("en-US", options);
};

export const formatPhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber.length || phoneNumber.length !== 10) return;
  return "+84" + phoneNumber.slice(1);
};

export function debounce<T>(
  func: (...args: any[]) => Promise<T>,
  delay: number = 1000
): (...args: any[]) => Promise<T> {
  let timeoutId: NodeJS.Timeout;

  return function (...args: any[]): Promise<T> {
    timeoutId && clearTimeout(timeoutId);

    return new Promise<T>((resolve, reject) => {
      timeoutId = setTimeout(async () => {
        try {
          const result = await func(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}

export function throttle<T>(
  func: (...args: any[]) => Promise<T>,
  wait: number
): (...args: any[]) => Promise<T> {
  let isThrottled = false;
  let pendingArgs: any[] | null = null;

  return async function (...args: any[]): Promise<T> {
    if (!isThrottled) {
      isThrottled = true;
      try {
        const result = await func(...args); // No need for apply, use spread operator
        if (pendingArgs) {
          // If there are pending arguments, execute the function with them
          const nextArgs = pendingArgs;
          pendingArgs = null;
          await func(...nextArgs);
        }
        isThrottled = false;
        return result;
      } catch (error) {
        isThrottled = false;
        throw error;
      }
    } else {
      // Store the latest arguments to be executed after the throttle period
      pendingArgs = args;
      return new Promise<T>((resolve, reject) => {
        setTimeout(async () => {
          try {
            if (pendingArgs) {
              // Execute the function with the stored arguments
              const result = await func(...pendingArgs);
              pendingArgs = null;
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        }, wait);
      });
    }
  };
}
// GOOGLE API HELPERS
export interface PlaceApiParams {
  input: string;
  yourLocation?: { latitude: number; longitude: number };
  radius?: number;
  types?:
    | "establishment"
    | "accounting"
    | "airport"
    | "amusement_park"
    | "aquarium"
    | "art_gallery"
    | "atm"
    | "bakery"
    | "bank"
    | "bar"
    | "beauty_salon"
    | "bicycle_store"
    | "book_store"
    | "bowling_alley"
    | "bus_station"
    | "cafe"
    | "campground"
    | "car_dealer"
    | "car_rental"
    | "car_repair"
    | "car_wash"
    | "casino"
    | "cemetery"
    | "church"
    | "city_hall"
    | "clothing_store"
    | "convenience_store"
    | "courthouse"
    | "dentist"
    | "department_store"
    | "doctor"
    | "drugstore"
    | "electrician"
    | "electronics_store"
    | "embassy"
    | "fire_station"
    | "florist"
    | "funeral_home"
    | "furniture_store"
    | "gas_station"
    | "gym"
    | "hair_care"
    | "hardware_store"
    | "hindu_temple"
    | "home_goods_store"
    | "hospital"
    | "insurance_agency"
    | "jewelry_store"
    | "laundry"
    | "lawyer"
    | "library"
    | "light_rail_station"
    | "liquor_store"
    | "local_government_office"
    | "locksmith"
    | "lodging"
    | "meal_delivery"
    | "meal_takeaway"
    | "mosque"
    | "movie_rental"
    | "movie_theater"
    | "moving_company"
    | "museum"
    | "night_club"
    | "painter"
    | "park"
    | "parking"
    | "pet_store"
    | "pharmacy"
    | "physiotherapist"
    | "plumber"
    | "police"
    | "post_office"
    | "primary_school"
    | "real_estate_agency"
    | "restaurant"
    | "roofing_contractor"
    | "rv_park"
    | "school"
    | "secondary_school"
    | "shoe_store"
    | "shopping_mall"
    | "spa"
    | "stadium"
    | "storage"
    | "store"
    | "subway_station"
    | "supermarket"
    | "synagogue"
    | "taxi_stand"
    | "tourist_attraction"
    | "train_station"
    | "transit_station"
    | "travel_agency"
    | "university"
    | "veterinary_care"
    | "zoo";
}

export interface Prediction {
  description: string;
  matched_substrings: { lenght: number; offset: number }[];
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: { lenght: number; offset: number }[];
    secondary_text: string;
  };
  terms: { offset: number; value: string }[];
  types: string[];
}

export const PlacesMapApi = {
  searchWithAutocompleteApi: async ({
    input,
    radius = 2000,
    yourLocation,
    types = "establishment",
  }: PlaceApiParams): Promise<Prediction[] | undefined> => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&radius=${radius}&type=${types}&location=${yourLocation}&key=AIzaSyD_ACDdk2v1RL9WRbwQcZpn8EJ7llSjXz4`
    );

    const results = await response.json();
    if (results.status !== "OK" && results.predictions.length === 0) return;
    return results.predictions;
  },
  getLocationByPlaceId: async (
    placeId: string
  ): Promise<LocationType | undefined> => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyD_ACDdk2v1RL9WRbwQcZpn8EJ7llSjXz4`
    );

    const results = await response.json();
    if (results.status !== "OK" && !results?.result) return;

    return {
      latitude: results?.result?.geometry?.location?.lat,
      longitude: results?.result?.geometry?.location?.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    } as LocationType;
  },
};
