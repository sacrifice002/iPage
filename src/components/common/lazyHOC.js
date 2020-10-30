import React, { Suspense } from 'react'

function LazyHOC (WrappedComponent) {
  return function () {
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <WrappedComponent />
        </Suspense>
      </div>
    )
  }
}

export default LazyHOC
