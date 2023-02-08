import React from 'react';
import { FADE_IN_ANIMATION_SETTINGS } from '../utils/constant';
import { AnimatePresence, motion } from 'framer-motion';

import { ReactNode } from 'react';
import useScroll from '../utils/hooks/use-scroll';

export function Layout({
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  const scrolled = useScroll(50);

  return (
    <>
      <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? 'border-b border-gray-200 bg-white/50 backdrop-blur-xl'
            : 'bg-white/0'
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <div className="font-display flex items-center text-2xl">
            <p className="text-center font-bold text-gray-600 md:text-xl">
              Members Role
            </p>
          </div>
          <div>
            <AnimatePresence>
              <motion.button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                {...FADE_IN_ANIMATION_SETTINGS}
              >
                Sign In
              </motion.button>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <main className="flex w-full flex-col items-center justify-center py-32">
        {children}
      </main>
      <div className="absolute w-full border-t border-gray-200 bg-white py-5 text-center">
        <p className="text-gray-500">
          Create, Update, and View Your Blockchain Roles{' '}
          <a
            className="font-medium text-gray-800 underline transition-colors"
            href="https://aguadulcehq.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Aguadulcehq
          </a>
        </p>
      </div>
    </>
  );
}
