import { customAlphabet } from 'nanoid';
import { useRef, useState } from 'react';
import useSWR from 'swr';
import { useDebounceValue } from './useDebounceValue';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 10);

export const useFieldFetchData = (props: any) => {
  const [cacheKey] = useState(() => {
    return nanoid();
  });

  const proFieldKeyRef = useRef(cacheKey);

  const swrKey = useDebounceValue(
    [proFieldKeyRef.current, props.params] as const,
    props.debounceTime ?? props?.fieldProps?.debounceTime ?? 0,
    [props.params],
  );

  const { data, isValidating } = useSWR<any, any, any>(
    () => {
      if (typeof props.options !== 'function') {
        return null;
      }
      return swrKey;
    },
    (_: any, params: any) => {
      return props.options(
        {
          ...params,
        },
        props,
      );
    },
    // {
    //   revalidateIfStale: true,
    //   // 打开 cacheForSwr 的时候才应该支持两个功能
    //   revalidateOnReconnect: false,
    //   shouldRetryOnError: false,
    //   // @todo 这个功能感觉应该搞个API出来
    //   revalidateOnFocus: false,
    // },
  );

  return [
    isValidating,
    typeof props.options === 'function' ? data : props.options,
  ];
};
