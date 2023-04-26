/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from "react";

// a useEffect that does not run on the initial render
const useUpdateEffect = (func: () => void, dependencies: any[]) => {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      func();
    } else {
      hasMounted.current = true;
    }
  }, dependencies);
};

export default useUpdateEffect;