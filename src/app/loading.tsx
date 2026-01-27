import React from 'react';
import Hero from './components/Hero';

// This loading UI appears while the root route is streaming/transitioning
export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-black">
      <Hero />
    </div>
  );
}
