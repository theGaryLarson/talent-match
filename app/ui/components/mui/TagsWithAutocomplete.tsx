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
  maxTags?: number,
  noResultsText?: string | undefined,
  onChange?: ((event: SyntheticEvent<Element, Event>, value: string[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<string> | undefined) => void) | undefined,
  searchingText?: string | undefined,
  searchPlaceholder: string,
}

export default function TagsWithAutocomplete({
  apiSearchRoute,
  fieldLabel,
  id,
  maxTags = -1,
  noResultsText,
  onChange,
  searchingText,
  searchPlaceholder,
}:Props) {
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleInputChange = useMemo(
    () => {
      const cachedFetches:CachedFetches = {
        "": []
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
    [apiSearchRoute, setLoading, setOptions]
  );

  return (
    <Autocomplete
      defaultValue={[]}
      filterSelectedOptions
      id={id}
      loading={loading}
      loadingText={searchingText}
      multiple
      noOptionsText={noResultsText}
      onChange={(ev, val, reason, details) => {
        // Disallow change event if max tags has been violated
        if (maxTags !== -1 && val.length > maxTags) {
          ev.stopPropagation();
        }
        // Propagate the event if it's valid
        else {
          setSelectedTags(val);
          onChange && onChange(ev, val, reason, details);
        }
      }}
      onInputChange={handleInputChange}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            onKeyDown: (ev) => {
              // Prevent a repeated backspace from deleting tags while allowing a fresh backspace to do it
              if (ev.repeat && ev.key === "Backspace" && (ev.target as HTMLInputElement).value === "") {
                ev.stopPropagation();
              }
            },
          }}    
          label={fieldLabel}
          placeholder={searchPlaceholder}
        />
      )}
      value={selectedTags}
    />
  );
}
