import * as React from "react"
import { cn } from "@/lib/utils"

// 🌈 TABLE CONTAINER
// 🌈 TABLE CONTAINER - Luxurious Deep Glassmorphism Design
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  // Border is now a more subtle indigo/purple blend
  <div className="relative w-full overflow-hidden rounded-md border border-indigo-300/30 shadow-xl backdrop-blur-3xl bg-white/70">
    <div className="overflow-auto max-h-full scrollbar-thin scrollbar-thumb-purple-400/60 scrollbar-track-transparent hover:scrollbar-thumb-purple-500/80 transition-all ">
      <table
        ref={ref}
        className={cn(
          // Text color changed from gray-700 to a darker gray-800 for contrast
          "w-full border-collapse text-sm text-gray-800",
          className
        )}
        {...props}
      />
    </div>
  </div>
))
Table.displayName = "Table"

// 🧭 HEADER - Gradient with Subtle Shadow
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "bg-gradient-to-r from-gray-700 via-sky-800 to-gray-700 text-white sticky top-0 z-30 shadow-lg shadow-black/20",
      className
    )}
    {...props}
  />
))
TableHeader.displayName = "TableHeader"

// 📋 BODY - Clean with Better Dividers
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      // Clearer divider lines
      "divide-y divide-indigo-100/80 bg-white/50 ",
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

// 🧱 ROW - Smooth Hover, Focus, and Selection Transitions
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      " border-b border-gray-100/50",
      // Enhanced Hover: Stronger bg, bigger scale, and slight shadow
      "hover:bg-indigo-100/90 hover:shadow-lg hover:z-10",
      "even:bg-gray-50/20",
      // Accessibility Focus State: Ring on focus
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:ring-offset-2",
      "data-[state=selected]:bg-indigo-200/90 data-[state=selected]:shadow-xl",
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
      "py-3 px-4 text-left align-middle font-semibold uppercase text-[11px] tracking-widest text-white/90 ",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

// 📄 CELL - High-Contrast Interactions
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "px-6 py-2 text-xs text-gray-700 align-middle transition-colors duration-200",
      // Stronger hover effect
      "group-hover:text-indigo-950 group-hover:font-semibold",
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
