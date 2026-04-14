import React from "react";
import { useNavigate } from "react-router-dom";
import { NoiseBackground } from "./ui/noise-background";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center text-center pt-40 md:pt-52 px-6">
      
      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
        Omniproctor
        <span className="block mt-3 text-muted-foreground bg-clip-text ">
          AI-Powered Exam Monitoring
        </span>
      </h1>

      {/* Description */}
      <p className="max-w-2xl text-muted-foreground text-lg mt-6 mb-10 leading-relaxed">
        Secure online examinations with real-time AI monitoring,
        face detection, behavior analysis, and automated reports —
        all in one platform.
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-4 flex-wrap justify-center">
        
        {/* Primary CTA */}
        <NoiseBackground
          containerClassName="w-fit p-2 rounded-full"
          gradientColors={[
            "rgb(59, 130, 246)",
            "rgb(37, 99, 235)",
            "rgb(29, 78, 216)",
          ]}
        >
          <button
            onClick={() => navigate("/signup")}
            className="rounded-full px-6 py-3 text-sm font-semibold 
            bg-background text-foreground 
            shadow-md border border-border
            hover:scale-105 transition-all duration-200"
          >
            Get Started →
          </button>
        </NoiseBackground>

      </div>
    </section>
  );
}