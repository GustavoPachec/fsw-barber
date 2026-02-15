import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import SidebarSheet from "@/app/_components/sidebar-sheet"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* IMAGEM */}
      <div className="relative h-[280px] w-full overflow-hidden sm:h-[350px] md:h-[400px] lg:h-[500px]">
        <Image
          alt={barbershop.name}
          src={barbershop?.imageUrl}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority
        />

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="absolute left-0 right-0 top-0 z-10 flex justify-between p-4 sm:p-6">
          <Button
            size="lg"
            variant="secondary"
            className="rounded-full shadow-lg transition-all hover:shadow-xl"
            asChild
          >
            <Link href="/" className="flex items-center gap-2">
              <ChevronLeftIcon className="h-5 w-5" />
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full shadow-lg transition-all hover:shadow-xl"
              >
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SidebarSheet />
          </Sheet>
        </div>
      </div>

      <div className="flex-1">
        <div className="mx-auto w-full max-w-7xl">
          {/* TÍTULO */}
          <div className="border-b border-border/50 px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10">
            <h1 className="mb-4 text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl">
              {barbershop.name}
            </h1>
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground sm:text-base">
                <MapPinIcon className="h-4 w-4 flex-shrink-0 text-primary sm:h-5 sm:w-5" />
                <p className="line-clamp-2">{barbershop?.address}</p>
              </div>

              <div className="flex items-center gap-2 text-sm sm:text-base">
                <StarIcon className="h-4 w-4 flex-shrink-0 fill-primary text-primary sm:h-5 sm:w-5" />
                <p className="font-medium text-foreground">
                  5,0 (499 avaliações)
                </p>
              </div>
            </div>
          </div>

          {/* DESCRIÇÃO */}
          <div className="space-y-4 border-b border-border/50 px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground sm:text-sm">
              Sobre nós
            </h2>
            <p className="text-justify text-sm leading-relaxed text-muted-foreground sm:text-base">
              {barbershop?.description}
            </p>
          </div>

          {/* SERVIÇOS */}
          <div className="space-y-6 border-b border-border/50 px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground sm:text-sm">
              Nossos Serviços
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {barbershop.services.map((service) => (
                <ServiceItem
                  key={service.id}
                  barbershop={JSON.parse(JSON.stringify(barbershop))}
                  service={JSON.parse(JSON.stringify(service))}
                />
              ))}
            </div>
          </div>

          {/* CONTATO */}
          <div className="space-y-4 px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground sm:text-sm">
              Contatos
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {barbershop.phones.map((phone) => (
                <PhoneItem key={phone} phone={phone} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarbershopPage
