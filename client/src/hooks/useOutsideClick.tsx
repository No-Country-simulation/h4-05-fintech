import { useEffect, useRef, MutableRefObject } from 'react';

export function useOutsideClick<T extends HTMLElement>(
  handle: () => void,
  useCapture = true
): MutableRefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(
    function () {
      function handleClick(e: any) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          handle();
        }
      }

      document.addEventListener('click', handleClick, useCapture);

      return function () {
        document.removeEventListener('click', handleClick, useCapture);
      };
    },

    [handle, useCapture]

  );
  return ref;
}