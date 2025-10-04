import { useState, useEffect } from "react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

interface ComboBoxProps<T> {
  value: string
  onSelect: (item: T) => void
  fetchData: (query: string,type:string) => Promise<T[]> // parent provides API call
  placeholder?: string
  labelKey: keyof T
}

export function ComboBox<T extends { id: number }>({
  value,
  onSelect,
  fetchData,
  placeholder = "Search...",
  labelKey
}: ComboBoxProps<T>) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const [options, setOptions] = useState<T[]>([])

  // debounce
  useEffect(() => {
    if (!inputValue || inputValue.trim() === "") {
      setOptions([])
      return
    }

    const timeout = setTimeout(() => {
      fetchData(inputValue).then(setOptions).catch(() => setOptions([]))
    }, 300) // wait 300ms after typing

    return () => clearTimeout(timeout)
  }, [inputValue, fetchData])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="w-[250px] border rounded-md px-3 py-2 cursor-pointer">
          {value || placeholder}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0" sideOffset={4}>
        <Command>
          <CommandInput
            value={inputValue}
            onValueChange={setInputValue}
            placeholder={placeholder}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => {
                    onSelect(item)
                    setOpen(false)
                  }}
                >
                  {String(item[labelKey])}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
