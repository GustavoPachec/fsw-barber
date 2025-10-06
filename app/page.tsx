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
    <div>
      <header>
        <Header />
      </header>

      <main className="mx-auto w-full max-w-screen-2xl p-4 pt-6 md:p-16 lg:p-16">
        {/* Superior */}
        <section className="flex flex-col gap-10 lg:flex-row xl:gap-16">
          {/* Coluna Esquerda */}
          <div className="flex w-full flex-col justify-between lg:w-1/2 xl:w-1/2">
            <div>
              <h1 className="text-2xl text-gray-900 dark:text-white xl:text-3xl">
                Olá, {session?.user ? session.user.name : "Bem-vindo"}
              </h1>

              {/* Data */}
              <p className="mt-3 text-base text-gray-600 dark:text-gray-300 xl:text-lg">
                <span className="capitalize">
                  {format(new Date(), "EEEE, dd", { locale: ptBR })}
                </span>
                <span>&nbsp;de&nbsp;</span>
                <span className="capitalize">
                  {format(new Date(), "MMMM", { locale: ptBR })}
                </span>
              </p>

              {/* Busca */}
              <div className="mt-6 sm:mt-8">
                <Search />
              </div>

              {/* Busca Rápida */}
              <div className="mt-4 lg:hidden">
                <QuickSearch />
              </div>
            </div>

            {/* Agendamentos */}
            {confirmedBookings.length > 0 && (
              <div className="mt-8 xl:mt-12">
                <h2 className="mb-5 text-xs font-bold uppercase text-gray-400">
                  Agendamentos
                </h2>
                <div className="flex gap-2 overflow-x-auto xl:gap-3 [&::-webkit-scrollbar]:hidden">
                  {confirmedBookings.map((booking) => (
                    <BookingItem key={booking.id} booking={booking} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Coluna Direita */}
          <aside className="flex w-full flex-col justify-end lg:w-1/2 xl:w-1/2">
            <h2 className="mb-5 text-sm font-bold uppercase text-gray-100 lg:text-lg">
              Recomendados
            </h2>
            <CarouselBarbershopItem
              barbershops={barbershops}
              className="basis-auto sm:w-1/3 lg:basis-1/2 xl:basis-1/3"
            />
          </aside>
        </section>

        {/* Populares */}
        <section className="mt-16 xl:mt-20 xl:pt-16">
          <h2 className="mb-5 text-sm font-bold uppercase text-gray-100 lg:text-lg">
            Populares
          </h2>
          <CarouselBarbershopItem
            barbershops={popularBarbershops}
            className="basis-auto sm:w-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/5"
          />
        </section>

        {/*Mais Visitadas */}
        <section className="xl:mt-20 xl:pt-10">
          <h2 className="mb-5 text-sm font-bold uppercase text-gray-100 lg:text-lg">
            Mais Visitadas
          </h2>
          {mostVisitedBarbershop.length > 0 ? (
            <CarouselBarbershopItem
              barbershops={mostVisitedBarbershop}
              className="basis-auto sm:w-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/5"
            />
          ) : (
            <div className="flex h-48 items-center justify-center rounded-lg bg-gray-50">
              <div className="px-4 text-center">
                <p className="text-sm text-gray-500 sm:text-base">
                  Nenhuma barbearia visitada ainda.
                </p>
                <p className="mt-1 text-xs text-gray-400 sm:text-sm">
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
