import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import BookingItem from "../_components/booking-item"

import { getConcludedBookings } from "../_data/get-concluded-bookings"
import { getConfirmedBookings } from "../_data/get-confirmed-booking"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return notFound()
  }

  const confirmedBookings = await getConfirmedBookings()
  const concludedBookings = await getConcludedBookings()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-10">
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Meus Agendamentos
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Gerencie seus compromissos agendados
          </p>
        </div>

        {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
          <div className="flex h-64 items-center justify-center rounded-2xl border border-border/50 bg-secondary/30">
            <div className="px-4 text-center">
              <p className="text-base font-medium text-muted-foreground sm:text-lg">
                Você não tem agendamentos
              </p>
              <p className="mt-2 text-sm text-muted-foreground/70">
                Explore nossas barbearias e reserve seu horário
              </p>
            </div>
          </div>
        )}

        {confirmedBookings.length > 0 && (
          <div className="mb-8 space-y-4 sm:mb-10">
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Agendamentos Confirmados ({confirmedBookings.length})
              </h2>
              <p className="text-xs text-muted-foreground/70 sm:text-sm">
                Seus compromissos agendados
              </p>
            </div>
            <div className="grid gap-3 sm:gap-4">
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </div>
        )}

        {concludedBookings.length > 0 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Agendamentos Finalizados ({concludedBookings.length})
              </h2>
              <p className="text-xs text-muted-foreground/70 sm:text-sm">
                Seus compromissos concluídos
              </p>
            </div>
            <div className="grid gap-3 sm:gap-4">
              {concludedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Bookings
