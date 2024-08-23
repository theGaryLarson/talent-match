import React, { SyntheticEvent, useEffect, useMemo, useState } from 'react';
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
  onChange?: ((event: SyntheticEvent<Element, Event>, value: ValueType[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<ValueType> | undefined) => void) | undefined,
  searchingText?: string | undefined,
  searchPlaceholder: string,
  getOptionLabel: ((option: ValueType) => string) | undefined,
  initialTags?: string[]
}

export default function TagsWithAutocomplete<ValueType>({
  apiSearchRoute,
  fieldLabel,
  id,
  maxTags = -1,
  noResultsText,
  onChange,
  searchingText,
  searchPlaceholder,
  getOptionLabel,
  initialTags,
}: Props<ValueType>) {
  const [options, setOptions] = useState<ValueType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<ValueType[]>([]);

  const handleInputChange = useMemo(
    () => {
      const cachedFetches: CachedFetches<ValueType> = {
        "": [] // Shows nothing when there is no search terms in the input box
      };

      return debounce(
        async (event: SyntheticEvent<Element, Event>, newInputValue: string) => {
          try {
            if (cachedFetches.hasOwnProperty(newInputValue)) {
              setOptions(cachedFetches[newInputValue]); // Update the options with cached fetch data instead of hitting API again
            }
            else if (newInputValue.length !== 0) {
              setLoading(true);
              const response = await fetch(`${apiSearchRoute}${encodeURIComponent(newInputValue)}`);
              const data: ValueType[] = await response.json();
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

  async function initTags() {
    var initTagsToSelect: ValueType[] = [];
    if (initialTags != null) {
      for (var i = 0; i < initialTags.length; i++) {
        const response = await fetch(`${apiSearchRoute}${initialTags[i]}`);
        const data: ValueType[] = await response.json();
        if (data.length > 0) initTagsToSelect.push(data[0]);
      }
      setSelectedTags(initTagsToSelect);
    }
  }

  // Load the init tags once on init
  useEffect(() => {
    initTags();
  }, []);


  return (
    <Autocomplete
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
      options={(loading) ? [] : options}
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
            }
          }}
          label={fieldLabel}
          placeholder={searchPlaceholder}
        />
      )}
      getOptionLabel={getOptionLabel}
      value={selectedTags}
      sx={{
        // Try my best to override Mui style defaults to make the skills match our style
        "& .MuiChip-filled": {
          backgroundColor: "rgb(8 145 178)",
          color: "#FFFFFF",
          fontFamily: '__Inter_36bd41', // What are the chances this works forever? 😅
          fontStyle: "normal",
          fontSize: "1rem",
          letterSpacing: "0em",
          height: "auto",
          '&:hover': {
            backgroundColor: "rgb(14 116 144)",
          },
        },
        // I can't for the life of me find a way to override the X to be white
        // MuiButton hover keeps getting applied last...
      }}
    />
  );
}
