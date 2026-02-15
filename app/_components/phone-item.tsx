"use client"

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopyPhoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast.success("Telefone copiado com sucesso!")
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-3 transition-all duration-200 hover:shadow-md sm:p-4">
      {/* ESQUERDA */}
      <div className="flex flex-1 items-center gap-3">
        <div className="rounded-full bg-muted p-2">
          <SmartphoneIcon className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
        </div>
        <p className="text-sm font-medium text-foreground sm:text-base">
          {phone}
        </p>
      </div>
      {/* DIREITA */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleCopyPhoneClick(phone)}
        className="ml-2 text-xs transition-all sm:text-sm"
      >
        Copiar
      </Button>
    </div>
  )
}

export default PhoneItem
