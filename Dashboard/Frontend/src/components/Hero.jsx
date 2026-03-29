import React from 'react'
import { useNavigate } from "react-router-dom";
import { NoiseBackground } from './ui/noise-background';

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center justify-center text-center pt-60 px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Omniproctor
          <span className="block text-blue-500 dark:text-blue-400 mt-2">
            AI-Powered Exam Monitoring
          </span>
        </h1>

        <p className="max-w-2xl text-gray-600 dark:text-gray-300 text-lg mb-8">
          Secure online examinations with real-time AI monitoring,
          face detection, behavior analysis, and automated reports —
          all in one platform.
        </p>

        <div className="flex gap-4">
          <div className="flex justify-center">
            <NoiseBackground
              containerClassName="w-fit p-2 rounded-full mx-auto z-10"
              gradientColors={[
                "rgb(59, 130, 246)",   // blue-500
                "rgb(37, 99, 235)",    // blue-600
                "rgb(29, 78, 216)",    // blue-700
              ]}
            >
              <button className="h-full w-full cursor-pointer rounded-full bg-linear-to-r from-neutral-100 via-neutral-100 to-white px-4 py-2 text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)]">
                Get Started &rarr;
              </button>
            </NoiseBackground>
          </div>
        </div>
      </section>

  )
}

