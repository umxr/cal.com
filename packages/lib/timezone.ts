import cityTimezones from "city-timezones";
import { allTimezones, ITimezoneOption } from "react-timezone-select";

import { ICity } from "@calcom/ui/components/form/timezone-select";

export const filterByCities = (tz: string): ICity[] => {
  const cityLookup = cityTimezones.findFromCityStateProvince(tz);
  return cityLookup.map(({ city, timezone }) => ({ city, timezone }));
};

export const addCitiesToDropdown = (cities: ICity[]) => {
  const cityTimezones = cities?.reduce((acc: { [key: string]: string }, city: ICity) => {
    if (Object.keys(allTimezones).includes(city.timezone)) {
      acc[city.timezone] = city.city;
    }
    return acc;
  }, {});
  return cityTimezones || {};
};

export const handleOptionLabel = (option: ITimezoneOption, cities: ICity[]) => {
  const timezoneValue = option.label.split(")")[0].replace("(", " ").replace("T", "T ");
  const cityName = option.label.split(") ")[1];
  return cities.length > 0 ? `${cityName}${timezoneValue}` : `${option.value}${timezoneValue}`;
};
