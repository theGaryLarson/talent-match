import React, { SyntheticEvent, useMemo, useState } from 'react';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { debounce } from '@mui/material/utils';

interface CachedFetches {
  [name: string]: string[];
}

interface Props {
  apiSearchRoute: string,
  fieldLabel: string,
  id?: string | undefined,
  noResultsText?: string | undefined,
  onChange?: ((event: SyntheticEvent<Element, Event>, value: string[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<string> | undefined) => void) | undefined,
  searchingText?: string | undefined,
  searchPlaceholder: string,
}

export default function TagsWithAutocomplete({
  apiSearchRoute,
  fieldLabel,
  id,
  noResultsText,
  onChange,
  searchingText,
  searchPlaceholder,
}:Props) {
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = useMemo(() => {
    const cachedFetches:CachedFetches = {
      "": []
    };
    
    return debounce(
      async (event:SyntheticEvent<Element, Event>, newInputValue:string) => {
        try {
          console.log(newInputValue);
          if (cachedFetches.hasOwnProperty(newInputValue)) {
            console.log("setting all");
            setOptions(cachedFetches[newInputValue]); // Update the options with cached fetch data instead of hitting API again
          }
          else if (newInputValue.length !== 0) {
            setLoading(true);
            const response = await fetch(`${apiSearchRoute}${newInputValue}`);
            const data:string[] = await response.json();
            cachedFetches[newInputValue] = data; // Cache the fetch data

            // Add new results into cached all results
            if (data.length !== 0) {
              const allResults = new Set(cachedFetches[""]);
              for (let newResult of data) {
                allResults.add(newResult);
              }
              cachedFetches[""] = Array.from(allResults);
            }

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
  [apiSearchRoute, setLoading, setOptions]);

  return (
    <Autocomplete
      defaultValue={[]}
      filterSelectedOptions
      id={id}
      loading={loading}
      loadingText={searchingText}
      multiple
      noOptionsText={noResultsText}
      onChange={onChange}
      onInputChange={handleInputChange}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label={fieldLabel}
          placeholder={searchPlaceholder}
        />
      )}
    />
  );
}
