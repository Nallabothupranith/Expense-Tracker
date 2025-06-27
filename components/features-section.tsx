"use client";
import { useEffect, useState } from "react";

function FeatureCard({
  title,
  description,
  animate,
  delay,
}: {
  title: string;
  description: string;
  animate: boolean;
  delay: number;
}) {
  return (
    <div
      className={`bg-white/80 rounded-2xl shadow-md p-6 flex flex-col items-center text-center backdrop-blur-md border border-white/40 transition-all duration-700 ${
        animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-4">{/* You can add an icon here */}</div>
      <h3 className="text-xl font-bold text-[#2d2e82] mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function FeaturesSection() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
  }, []);

  const features = [
    {
      title: "Track balances",
      description: "Keep track of shared expenses, balances, and who owes who.",
    },
    {
      title: "Organize expenses",
      description:
        "Split expenses with any group: trips, housemates, friends, and family.",
    },
    {
      title: "Add expenses easily",
      description: "Quickly add expenses on the go before you forget who paid.",
    },
    {
      title: "Pay friends back",
      description:
        "Settle up with a friend and record any cash or online payment.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
      {features.map((feature, idx) => (
        <FeatureCard
          key={feature.title}
          title={feature.title}
          description={feature.description}
          animate={animate}
          delay={700 + idx * 200}
        />
      ))}
    </section>
  );
}
