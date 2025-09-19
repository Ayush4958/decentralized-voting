import React from 'react';
import MagicLoader from "../components/lightswindui/lightswind/magic-loader";

function loader() {
  return (
    <>
      <MagicLoader
  size={200}
  speed={0.8}
  hueRange={[180, 220]}
/>
    </>
  )
}

export default loader
