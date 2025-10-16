import * as React from "react"
import { cn } from "@/lib/utils"

// 🌈 TABLE CONTAINER
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto max-h-full rounded-2xl border border-gray-200 shadow-md bg-gradient-to-br from-white via-[#f8fafc] to-[#eef2ff] scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-100 ">
    <table
      ref={ref}
      className={cn(
        "w-full border-collapse caption-bottom text-xs text-gray-800",
        className
      )}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

// 🧭 HEADER
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-[13px] font-semibold tracking-wide sticky top-0 z-10 ",
      className
    )}
    {...props}
  />
))
TableHeader.displayName = "TableHeader"

// 📋 BODY
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      "divide-y divide-gray-200 bg-white/80 backdrop-blur-sm italic",
      className
    )}
    {...props}
  />
))
TableBody.displayName = "TableBody"

// 🔻 FOOTER
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "bg-indigo-50 border-t border-indigo-200 font-medium text-indigo-700 [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

// 🧱 ROW
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      " rounded-xl transition-all hover:bg-indigo-50/70 even:bg-indigo-50/30 border-b border-gray-200 data-[state=selected]:bg-indigo-100/70",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

// 🧭 HEAD CELL
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 py-2 px-4 text-left align-middle font-semibold uppercase text-[11px] tracking-widest text-white/90",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

// 📄 CELL
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 text-xs text-gray-700 border-b border-gray-200 align-middle group-hover:text-indigo-700 transition-colors",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

// 📝 CAPTION
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      "mt-4 text-sm italic text-indigo-600 bg-indigo-50 py-1 rounded-md",
      className
    )}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
