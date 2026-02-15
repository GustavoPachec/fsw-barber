import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"

interface BarbershopItemProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Link href={`/barbershops/${barbershop.id}`}>
      <Card className="group flex min-h-0 w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg">
        <CardContent className="flex flex-col p-0">
          {/* IMAGEM */}
          <div className="relative aspect-video max-h-44 w-full flex-shrink-0 overflow-hidden bg-muted sm:aspect-square sm:max-h-60">
            <Image
              alt={barbershop.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              src={barbershop.imageUrl}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />

            <Badge
              className="absolute left-2 top-2 space-x-1 border border-primary/20 bg-background/90 text-xs backdrop-blur-sm sm:left-3 sm:top-3"
              variant="secondary"
            >
              <StarIcon size={12} className="fill-primary text-primary" />
              <span className="font-semibold">5,0</span>
            </Badge>
          </div>

          {/* TEXTO */}
          <div className="flex min-h-0 flex-grow flex-col space-y-0.5 p-1.5 sm:space-y-2 sm:p-3">
            <h3 className="line-clamp-1 text-xs font-semibold leading-tight sm:line-clamp-2 sm:text-sm">
              {barbershop.name}
            </h3>
            <p className="line-clamp-1 flex-grow text-xs text-muted-foreground sm:line-clamp-2">
              {barbershop.address}
            </p>
            <Button
              variant="secondary"
              className="mt-0.5 w-full text-xs"
              size="sm"
            >
              Reservar Agora
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default BarbershopItem
