"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { testimonials } from "@/lib/mock-data"
import { FadeIn } from "@/components/shared/page-transition"

export function Testimonials() {
  const carouselRef = useRef<any>(null)

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollNext()
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Loved by Society Residents
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Hear from the communities we serve every day.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-16">
            <Carousel
              setApi={(api) => (carouselRef.current = api)}
              opts={{ align: "start", loop: true }}
              className="mx-auto max-w-5xl"
            >
              <CarouselContent className="-ml-6">
                {testimonials.map((t) => (
                  <CarouselItem
                    key={t.id}
                    className="pl-6 md:basis-1/2 lg:basis-1/2"
                  >
                    <Card className="h-full rounded-3xl border bg-background/70 backdrop-blur-xl shadow-sm hover:shadow-xl transition-all">
                      <CardContent className="flex h-full flex-col gap-6 p-8">
                        
                        {/* Stars */}
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`size-4 ${
                                i < t.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-muted"
                              }`}
                            />
                          ))}
                        </div>

                        {/* Review */}
                        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                          "{t.review}"
                        </p>

                        {/* User */}
                        <div className="flex items-center gap-4 border-t pt-5">
                         <div className="relative size-25 overflow-hidden rounded-full ring-2 ring-primary/20">
  <Image
    src={t.image}
    alt={t.name}
    fill
    className="object-cover"
  />
                          </div>
                          <div>
                            <p className="text-sm font-semibold">
                              {t.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {t.society}
                            </p>
                          </div>
                        </div>

                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}