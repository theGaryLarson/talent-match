import React, { SyntheticEvent, useMemo, useState } from 'react';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { debounce } from '@mui/material/utils';
import { Chip } from '@mui/material';
import clsx from 'clsx';

interface CachedFetches<ValueType> {
  [searchTerms: string]: ValueType[];
}

interface Props<ValueType> {
  apiSearchRoute: string,
  fieldLabel: string,
  id?: string | undefined,
  maxTags?: number,
  noResultsText?: string | undefined,
  onChange?: ((event: SyntheticEvent<Element, Event>, value: (string | ValueType)[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<string | ValueType> | undefined) => void) | undefined,
  searchingText?: string | undefined,
  searchPlaceholder: string,
  getOptionLabel: ((option: ValueType) => string) | undefined
  getOptionLink?: ((option: ValueType) => string) | undefined
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
  getOptionLink,
}:Props<ValueType>) {
  const [options, setOptions] = useState<ValueType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<ValueType[]>([]);

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
      autoComplete
      autoSelect
      filterSelectedOptions
      freeSolo
      id={id}
      loading={loading}
      loadingText={searchingText}
      multiple
      noOptionsText={noResultsText}
      onChange={(ev, val, reason, details) => {
        // Disallow change event if max tags has been violated
        //   or if an item not in the options was entered
        if ((maxTags !== -1 && val.length > maxTags)
            || !val.every(item => typeof item !== "string")) {
          ev.stopPropagation();
        }
        // Propagate the event if it's valid
        else {
          setSelectedTags(val as ValueType[]);
          onChange && onChange(ev, val as ValueType[], reason, details);
        }
      }}
      onInputChange={handleInputChange}
      options={(loading)? [] : options}
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
      renderTags={(value: readonly (string | ValueType)[], getTagProps) =>
        value.map((option: string | ValueType, index: number) => {
          const { key, ...tagProps } = getTagProps({ index });
          const link = (getOptionLink && getOptionLink(option as ValueType)) ?? "#";
          const label = (typeof option === "string")? option : getOptionLabel && getOptionLabel(option);
          if (link !== "#") {
            return (
              <Chip label={<a href={link} target="_blank" className={clsx('text-cyan-700', 'hover:underline', 'decoration-dotted', 'decoration-cyan-700')}>{label}</a>} key={key} {...tagProps} />
            );
          }
          else {
            return (
              <Chip label={label} key={key} {...tagProps} />
            );
          }
        })}
      getOptionLabel={(option: string | ValueType) => {
        if (typeof option === "string") {
          return option;
        }
        else if (getOptionLabel) {
          return getOptionLabel(option as ValueType);
        }
        return "";
      }}
      value={selectedTags}
    />
  );
}
