import React from 'react'
import { Bell } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './Ui/Popover'
import { cn } from '../lib/utils'

export function NotificationPopover({ className }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={cn("icon-button w-10 h-10 relative", className)}>
          <Bell size={24} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0 bg-white" sideOffset={0}>
        <div className="px-4 py-3 border-b border-gray-100">
          <h2 className="text-base font-semibold">Notificações</h2>
        </div>
        <div className="p-4 text-center text-sm text-gray-500">
          Você não tem notificações no momento.
        </div>
      </PopoverContent>
    </Popover>
  )
}

