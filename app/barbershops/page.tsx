import BarbershopItem from "../_components/barbershop-item"
import Header from "../_components/header"
import Search from "../_components/search"
import { db } from "../_lib/prisma"

interface BarbershopsPageProps {
  searchParams: {
    title?: string
    service?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        searchParams?.title
          ? {
              name: {
                contains: searchParams?.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParams.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })

  const searchQuery = searchParams?.title || searchParams?.service

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-3 py-4 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-10">
        <div className="mb-8">
          <div className="mb-6">
            <h1 className="mb-2 text-xl font-bold text-foreground sm:text-3xl md:text-4xl">
              Barbearias
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              {searchQuery
                ? `Resultados para "${searchQuery}"`
                : "Encontre a barbearia perfeita"}
            </p>
          </div>
          <Search />
        </div>

        {barbershops.length === 0 ? (
          <div className="flex h-64 items-center justify-center rounded-2xl border border-border/50 bg-secondary/30">
            <div className="px-4 text-center">
              <p className="text-base font-medium text-muted-foreground sm:text-lg">
                Nenhuma barbearia encontrada
              </p>
              <p className="mt-2 text-sm text-muted-foreground/70">
                Tente buscar por outro termo ou navegue por nossa seção de
                populares
              </p>
            </div>
          </div>
        ) : (
          <div>
            <p className="mb-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:text-sm">
              {barbershops.length} resultado
              {barbershops.length !== 1 ? "s" : ""} encontrado
              {barbershops.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-3 lg:gap-4 xl:gap-4">
              {barbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default BarbershopsPage
