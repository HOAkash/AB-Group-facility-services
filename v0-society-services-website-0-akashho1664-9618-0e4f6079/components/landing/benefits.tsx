"use client"

import Image from "next/image"
import { Clock, Zap, ShieldCheck, Smile } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Clock,
    title: "Less Time in the Chair",
    description:
      "We streamline service workflows to reduce wait times and improve efficiency for your residents.",
  },
  {
    icon: Zap,
    title: "More Efficient",
    description:
      "Our technology-driven processes ensure faster issue resolution and seamless coordination.",
  },
  {
    icon: ShieldCheck,
    title: "Longer Lasting",
    description:
      "We focus on quality execution so that maintenance and services stand the test of time.",
  },
  {
    icon: Smile,
    title: "More Comfortable Experience",
    description:
      "Residents enjoy a hassle-free, transparent and smooth service experience every time.",
  },
]

export function Benefits() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Why Choose Us?
          </h2>
        </div>

        {/* Content */}
        <div className="mt-16 grid items-center gap-16 lg:grid-cols-2">
          
          {/* LEFT SIDE - FEATURES */}
          <div className="space-y-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="group flex gap-5 rounded-2xl bg-background p-6 shadow-sm transition-all hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary/20">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT SIDE - IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[2rem] shadow-2xl">
              <Image
                src="/images/why.jpg" // replace with your image
                alt="Service Experience"
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
             {/* Teal gradient overlay — matches the ad card aesthetic */}
                    <div
                      className="absolute inset-0 z-10 rounded-[2rem] shadow-2xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(30, 2, 85, 0.65) 4%, rgba(0,40,80,0.2) 100%, rgba(5,15,45,0.98) 100%)",
                      }}
                    />
          </motion.div>

        </div>
      </div>
    </section>
  )
}