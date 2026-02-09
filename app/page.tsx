import Header from "./_components/header"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { getConfirmedBookings } from "./_data/get-confirmed-booking"
import { CarouselBarbershopItem } from "./_components/carousel-barbershop-item"
import QuickSearch from "./_components/quick-search"
import { mostVisitedBarbershops } from "./_actions/most-visited"

const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  })
  const confirmedBookings = await getConfirmedBookings()
  const mostVisitedBarbershop = await mostVisitedBarbershops()

  return (
    <div className="min-h-screen">
      <header>
        <Header />
      </header>

      <main className="mx-auto w-full max-w-screen-2xl px-4 py-6 sm:px-6 md:px-8 md:py-8 lg:px-12 lg:py-12 xl:px-16 xl:py-16">
        {/* Superior */}
        <section className="flex flex-col gap-8 md:gap-10 lg:flex-row lg:gap-12 xl:gap-16">
          {/* Coluna Esquerda */}
          <div className="flex w-full flex-col justify-between gap-6 md:gap-8 lg:w-1/2">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl md:text-3xl">
                Olá, {session?.user ? session.user.name : "Bem-vindo"}
              </h1>

              {/* Data */}
              <p className="text-sm text-gray-600 dark:text-gray-300 sm:text-base md:text-lg">
                <span className="capitalize">
                  {format(new Date(), "EEEE, dd", { locale: ptBR })}
                </span>
                <span>&nbsp;de&nbsp;</span>
                <span className="capitalize">
                  {format(new Date(), "MMMM", { locale: ptBR })}
                </span>
              </p>

              {/* Busca */}
              <div className="w-full">
                <Search />
              </div>

              {/* Busca Rápida */}
              <div className="lg:hidden">
                <QuickSearch />
              </div>
            </div>

            {/* Agendamentos */}
            {confirmedBookings.length > 0 && (
              <div className="mt-2 space-y-3 md:mt-4 md:space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-wide text-gray-400 sm:text-sm">
                  Agendamentos
                </h2>
                <div className="flex gap-3 overflow-x-auto pb-2 md:gap-4 [&::-webkit-scrollbar]:hidden">
                  {confirmedBookings.map((booking) => (
                    <div key={booking.id} className="flex-shrink-0">
                      <BookingItem booking={booking} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Coluna Direita */}
          <aside className="flex w-full flex-col lg:w-1/2">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-100 sm:text-base md:mb-5 lg:text-lg">
              Recomendados
            </h2>
            <CarouselBarbershopItem
              barbershops={barbershops}
              className="w-full basis-auto sm:w-1/2 md:w-1/3 lg:basis-1/2 xl:basis-1/3"
            />
          </aside>
        </section>

        {/* Populares */}
        <section className="mt-12 sm:mt-14 md:mt-16 lg:mt-20 xl:mt-24">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-100 sm:text-base md:mb-5 lg:text-lg">
            Populares
          </h2>
          <CarouselBarbershopItem
            barbershops={popularBarbershops}
            className="w-full basis-auto sm:w-1/2 md:w-1/3 lg:basis-1/4 xl:basis-1/5"
          />
        </section>

        {/* Mais Visitadas */}
        <section className="mt-12 sm:mt-14 md:mt-16 lg:mt-20 xl:mt-24">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-100 sm:text-base md:mb-5 lg:text-lg">
            Mais Visitadas
          </h2>
          {mostVisitedBarbershop.length > 0 ? (
            <CarouselBarbershopItem
              barbershops={mostVisitedBarbershop}
              className="w-full basis-auto sm:w-1/2 md:w-1/3 lg:basis-1/4 xl:basis-1/5"
            />
          ) : (
            <div className="flex min-h-[12rem] items-center justify-center rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50 sm:min-h-[14rem] md:min-h-[16rem]">
              <div className="max-w-md px-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                  Nenhuma barbearia visitada ainda.
                </p>
                <p className="mt-2 text-xs text-gray-400 dark:text-gray-500 sm:text-sm">
                  Faça seu primeiro agendamento para ver suas favoritas!
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default Home
