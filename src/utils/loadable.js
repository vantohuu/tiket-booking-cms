import React, { lazy, Suspense } from 'react';

const loadable = (importFunc, { fallback = null } = {}) => {
  const LazyComponent = lazy(importFunc);
  console.log("LazyComponent");
  return (props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;