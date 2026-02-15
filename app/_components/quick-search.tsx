import Link from "next/link"
import Image from "next/image"
import { quickSearchOptions } from "../_constants/search"
import { Button } from "./ui/button"

const QuickSearch = () => {
  return (
    <div className="mt-4 flex gap-2 overflow-x-auto md:mt-4 md:justify-center lg:mt-6 lg:justify-center lg:gap-4 [&::-webkit-scrollbar]:hidden">
      {quickSearchOptions.map((option) => {
        return (
          <Button
            className="gap-2 text-xs transition-all duration-200 hover:shadow-md sm:text-sm"
            variant="secondary"
            key={option.title}
            asChild
          >
            <Link
              href={`/barbershops?service=${option.title}`}
              className="flex items-center gap-2"
            >
              <Image
                src={option.imageURL}
                width={18}
                height={18}
                alt={option.title}
                className="h-4 w-4 sm:h-5 sm:w-5"
              />
              <span>{option.title}</span>
            </Link>
          </Button>
        )
      })}
    </div>
  )
}

export default QuickSearch
