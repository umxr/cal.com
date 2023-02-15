import { useMemo, useState } from "react";
import BaseSelect, {
  allTimezones,
  ITimezoneOption,
  ITimezone,
  Props as SelectProps,
} from "react-timezone-select";

import { filterByCities, addCitiesToDropdown, handleOptionLabel } from "@calcom/lib/timezone";

import { getReactSelectProps } from "../select";

export interface ICity {
  city: string;
  timezone: string;
}

export function TimezoneSelect({ className, components, ...props }: SelectProps) {
  const [cities, setCities] = useState<ICity[]>([]);

  const handleInputChange = (tz: string) => {
    setCities(filterByCities(tz));
  };

  const reactSelectProps = useMemo(() => {
    return getReactSelectProps({ className, components: components || {} });
  }, [className, components]);

  return (
    <BaseSelect
      {...reactSelectProps}
      timezones={{
        ...allTimezones,
        ...addCitiesToDropdown(cities),
        "America/Asuncion": "Asuncion",
      }}
      onInputChange={handleInputChange}
      {...props}
      formatOptionLabel={(option) => <p className="truncate">{(option as ITimezoneOption).value}</p>}
      getOptionLabel={(option) => handleOptionLabel(option as ITimezoneOption, cities)}
    />
  );
}

export type { ITimezone, ITimezoneOption };
