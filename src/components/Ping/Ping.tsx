import React from 'react';

export const Ping = () => (
  <section className='flex h-screen flex-col items-center justify-center'>
    <div className='flex h-[50px] w-[50px] items-center justify-center'>
      <div className='inline-flex h-full w-full animate-ping rounded-full bg-slate-400 opacity-75' />
    </div>
  </section>
);
