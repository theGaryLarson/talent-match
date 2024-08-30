import React, { SyntheticEvent, useMemo, useState } from 'react';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { debounce } from '@mui/material/utils';

interface CachedFetches<ValueType> {
  [searchTerms: string]: ValueType[];
}

interface Props<ValueType> {
  apiSearchRoute: string,
  fieldLabel: string,
  id?: string | undefined,
  maxTags?: number,
  noResultsText?: string | undefined,
  value: string | ValueType,
  onChange: (
    event: SyntheticEvent<Element, Event>,
    value: string | ValueType | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<string | ValueType> | undefined
  ) => void,
  searchingText?: string | undefined,
  searchPlaceholder: string,
  getOptionLabel: ((option: ValueType) => string) | undefined
}

export default function TextFieldWithAutocomplete<ValueType>({
  apiSearchRoute,
  fieldLabel,
  id,
  noResultsText,
  value = "",
  onChange,
  searchingText,
  searchPlaceholder,
  getOptionLabel,
}:Props<ValueType>) {
  const [options, setOptions] = useState<ValueType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = useMemo(
    () => {
      const cachedFetches:CachedFetches<ValueType> = {
        "": [] // Shows nothing when there is no search terms in the input box
      };
      
      return debounce(
        async (event:SyntheticEvent<Element, Event>, newInputValue:string) => {
          try {
            if (cachedFetches.hasOwnProperty(newInputValue)) {
              setOptions(cachedFetches[newInputValue]); // Update the options with cached fetch data instead of hitting API again
            }
            else if (newInputValue.length !== 0) {
              setLoading(true);
              const response = await fetch(`${apiSearchRoute}${encodeURIComponent(newInputValue)}`);
              const data:ValueType[] = await response.json();
              cachedFetches[newInputValue] = data; // Cache the fetch data

              setOptions(data); // Update the options with fetched data
              setLoading(false);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        },
        500
      );
    },
    [apiSearchRoute, setLoading, setOptions]
  );

  return (
    <Autocomplete
      freeSolo
      autoComplete
      autoSelect
      filterSelectedOptions
      id={id}
      loading={loading}
      loadingText={searchingText}
      noOptionsText={noResultsText}
      value={value}
      onChange={(ev, val, reason, details) => {
        if (reason === 'selectOption') {
          onChange(ev, val, reason, details);
        }
        else if (reason === 'blur') {
          if (typeof val === "string" && getOptionLabel) {
            const optionIndex = options.findIndex(option => (getOptionLabel(option).toLowerCase().trim() === val.toLowerCase().trim()));
            if (optionIndex !== -1) {
              onChange(ev, options[optionIndex], reason, details);
            }
            else {
              onChange(ev, val, reason, details);
            }
          }
        }
        else if (reason === 'clear') {
          onChange(ev, val, reason, details);
        }
      }}
      onInputChange={handleInputChange}
      options={(loading)? [] : options}
      renderInput={(params) => (
        <TextField
          {...params}
          label={fieldLabel}
          placeholder={searchPlaceholder}
          value={
            (typeof value === "string")? value
            : (getOptionLabel && value && getOptionLabel(value)) ?? ""
          }
        />
      )}
      getOptionLabel={(option: string | ValueType) => {
        if (typeof option === "string") {
          return option;
        }
        else if (getOptionLabel) {
          return getOptionLabel(option);
        }
        return "";
      }}
    />
  );
}
