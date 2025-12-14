import { CalendarIcon, Github, ExternalLink } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export function HoverCardComponent() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="text-primary font-semibold">vishal</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/vishal.png" />
            <AvatarFallback>VH</AvatarFallback>
          </Avatar>
          <div className="space-y-2 flex-1">
            <div>
              <h4 className="text-sm font-semibold">Vishal</h4>
              <p className="text-xs text-muted-foreground">Developer & Creator</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Full-stack developer passionate about building modern web applications 
              with Next.js, React, and TypeScript.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a 
                href="https://github.com/vishal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                <Github className="h-3 w-3" />
                GitHub Profile
              </a>
            </div>
            <div className="text-muted-foreground text-xs flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              Project started 2024
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
