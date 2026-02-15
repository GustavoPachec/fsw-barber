"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/app/_components/ui/carousel"
import { Barbershop } from "@prisma/client"
import BarbershopItem from "./barbershop-item"
import { useEffect, useState, useCallback } from "react"
import Autoplay from "embla-carousel-autoplay"

interface CarouselBarbershopItemProps {
  barbershops: Barbershop[]
  className?: string
}

export function CarouselBarbershopItem({
  barbershops,
  className,
}: CarouselBarbershopItemProps) {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [visibleItems, setVisibleItems] = useState(1)

  const autoplayPlugin = Autoplay({
    delay: 4000,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
  })

  const handleSelect = useCallback(() => {
    if (api) {
      setCurrent(api.selectedScrollSnap() + 1)
    }
  }, [api])

  const handleDotClick = useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api],
  )

  // Atualiza o número de itens visíveis com base no tamanho da tela
  const updateVisibleItems = useCallback(() => {
    const width = window.innerWidth
    if (width >= 1280) {
      // xl
      setVisibleItems(5)
    } else if (width >= 1024) {
      // lg
      setVisibleItems(4)
    } else if (width >= 768) {
      // md
      setVisibleItems(3)
    } else if (width >= 640) {
      // sm
      setVisibleItems(2)
    } else {
      setVisibleItems(1)
    }
  }, [])

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", handleSelect)

    return () => {
      api.off("select", handleSelect)
    }
  }, [api, handleSelect])

  useEffect(() => {
    updateVisibleItems()
    const handleResize = () => {
      if (api) {
        setCount(api.scrollSnapList().length)
      }
      updateVisibleItems()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [api, updateVisibleItems])

  if (!barbershops?.length) {
    return (
      <div className="flex items-center justify-center rounded-lg bg-muted px-4 py-12 text-center sm:py-16">
        <p className="text-sm text-muted-foreground sm:text-base">
          Nenhuma barbearia encontrada
        </p>
      </div>
    )
  }

  return (
    <div className="group relative w-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
          skipSnaps: false,
          dragFree: false,
        }}
        plugins={[autoplayPlugin]}
        className="w-full"
      >
        <CarouselContent className="-ml-1.5 sm:-ml-2 md:-ml-3">
          {barbershops.map((barbershop) => (
            <CarouselItem
              key={barbershop.id}
              className={`pl-1.5 sm:pl-2 md:pl-3 ${className ?? ""}`}
            >
              <BarbershopItem barbershop={barbershop} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Setas de navegação - apenas se houver mais items do que o visível */}
        {count > visibleItems && (
          <>
            <CarouselPrevious
              aria-label="Voltar slide"
              className="absolute -left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md transition hover:scale-105 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 sm:-left-3 sm:flex md:-left-4 lg:h-10 lg:w-10"
            />

            <CarouselNext
              aria-label="Avançar slide"
              className="absolute -right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md transition hover:scale-105 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 sm:-right-3 sm:flex md:-right-4 lg:h-10 lg:w-10"
            />
          </>
        )}
      </Carousel>

      {/* Indicadores (bolinhas) - apenas em mobile quando houver mais items */}
      {count > visibleItems && (
        <div className="mt-4 flex justify-center gap-1.5 sm:hidden">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              aria-label={`Ir para slide ${index + 1}`}
              aria-current={current === index + 1 ? "true" : "false"}
              className={`h-1.5 w-1.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                current === index + 1
                  ? "scale-125 bg-primary"
                  : "bg-muted hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
