"use client"

import { Button } from "./ui/button"
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import Link from "next/link"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"
import SignInDialog from "./sign-in-dialog"

const SidebarSheet = () => {
  const { data } = useSession()
  const handleLogoutClick = () => signOut()

  return (
    <SheetContent className="overflow-y-auto px-0">
      <SheetHeader className="px-4 sm:px-6">
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {/* Usuário */}
      <div className="flex items-center justify-between gap-3 border-b border-border/50 px-4 py-6 sm:px-6">
        {data?.user ? (
          <div className="flex flex-1 items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={data?.user?.image ?? ""} />
            </Avatar>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold sm:text-base">
                {data.user.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {data.user.email}
              </p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      {/* Navegação Principal */}
      <div className="flex flex-col gap-2 border-b border-border/50 px-4 py-4 sm:px-6">
        <SheetClose asChild>
          <Button
            className="h-10 justify-start gap-3 text-sm transition-all hover:bg-muted sm:h-11 sm:text-base"
            variant="ghost"
            asChild
          >
            <Link href="/">
              <HomeIcon size={20} />
              <span>Início</span>
            </Link>
          </Button>
        </SheetClose>
        <SheetClose asChild>
          <Button
            className="h-10 justify-start gap-3 text-sm transition-all hover:bg-muted sm:h-11 sm:text-base"
            variant="ghost"
            asChild
          >
            <Link href="/bookings">
              <CalendarIcon size={20} />
              <span>Meus Agendamentos</span>
            </Link>
          </Button>
        </SheetClose>
      </div>

      {/* Serviços Rápidos */}
      <div className="flex flex-col gap-2 border-b border-border/50 px-4 py-4 sm:px-6">
        <h3 className="px-2 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Serviços
        </h3>
        {quickSearchOptions.map((option) => (
          <SheetClose key={option.title} asChild>
            <Button
              className="h-10 justify-start gap-3 text-sm transition-all hover:bg-muted sm:h-11 sm:text-base"
              variant="ghost"
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  alt={option.title}
                  src={option.imageURL}
                  height={20}
                  width={20}
                />
                <span>{option.title}</span>
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>

      {/* Logout */}
      {data?.user && (
        <div className="flex flex-col gap-2 px-4 py-4 sm:px-6">
          <Button
            variant="ghost"
            className="h-10 justify-start gap-3 text-sm text-destructive transition-all hover:bg-destructive/20 sm:h-11 sm:text-base"
            onClick={handleLogoutClick}
          >
            <LogOutIcon size={20} />
            <span>Sair da conta</span>
          </Button>
        </div>
      )}
    </SheetContent>
  )
}

export default SidebarSheet
