import { useCallback, useEffect, useRef, useMemo } from 'react';
import _ from 'lodash';

type useDeepFunction<T> = (callback: () => T, dependencies: Array<any>) => T;

const useDeepCompareMemoize = (value: Array<any> = []) => {
  const ref = useRef([]);
  if (!_.isEqual(ref.current, value)) {
    // @ts-ignore
    ref.current = value;
  }
  return ref.current;
};

//react's use memo compares references for array/objects because of this we use a ref to store the current reference
//and only change the reference when the value of the object changes using a deep compare method.
const useDeepMemo: useDeepFunction<any> = (callback, dependencies) => {
  const memoisedDependencies: Array<any> = useDeepCompareMemoize(dependencies);
  return useMemo(callback, memoisedDependencies);
};
const useDeepEffect = (callback, dependencies) => {
  const memoisedDependencies = useDeepCompareMemoize(dependencies);
  return useEffect(callback, memoisedDependencies);
};

const useDeepCallback = (callback, dependencies) => {
  const memoisedDependencies: Array<any> = useDeepCompareMemoize(dependencies);
  return useCallback(callback, memoisedDependencies);
};
export { useDeepMemo, useDeepEffect, useDeepCallback };
