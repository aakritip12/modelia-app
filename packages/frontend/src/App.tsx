import React from 'react';

import { ErrorBoundary } from './commonComponents';
import { MessageList } from './pages';
import Logo from './assets/logo.svg';
import Modelia from './assets/modelia.svg';

import './index.css';

const App: React.FC = () => (
  <ErrorBoundary>
    <div>
      <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
        <div className="w-[108rem] flex-none flex ">
          <picture>
            <source
              srcSet="https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif"
              type="image/avif"
            />
            <img
              src="https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif"
              alt=""
              className="w-[71.75rem] flex-none max-w-none dark:hidden"
              decoding="async"
            />
          </picture>
          <picture>
            <source
              srcSet="https://tailwindcss.com/_next/static/media/docs-dark@30.1a9f8cbf.avif"
              type="image/avif"
            />
            <img
              src="https://tailwindcss.com/_next/static/media/docs-dark@30.1a9f8cbf.avif"
              alt=""
              className="w-[90rem] flex-none max-w-none hidden dark:block"
              decoding="async"
            />
          </picture>
        </div>
      </div>

      <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75">
        <div className="max-w-8xl mx-auto">
          <div className="py-2 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
            <div className="relative flex items-center">
              <a
                className="mr-3 flex-none w-[2.0625rem] overflow-hidden md:w-auto"
                href="/"
              >
                <img className="block sm:hidden" src={Logo} alt="Logo" />
                <img
                  className="hidden sm:block"
                  src={Modelia}
                  alt="Modelia Logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <MessageList />
    </div>
  </ErrorBoundary>
);

export default App;
