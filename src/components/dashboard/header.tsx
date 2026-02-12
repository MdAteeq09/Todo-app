'use client';

import { Search, Plus, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserNav } from './user-nav';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MainSidebar } from './main-sidebar';

interface HeaderProps {
  onNewTask: () => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

export function Header({ onNewTask, searchTerm, onSearchTermChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-20 items-center gap-4 border-b bg-card px-4 md:px-6">
       <div className="md:hidden">
         <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <MainSidebar />
            </SheetContent>
          </Sheet>
       </div>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search tasks..."
          className="w-full pl-10"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
      </div>
      <Button onClick={onNewTask} className="hidden md:flex items-center gap-2">
        <Plus className="h-5 w-5" />
        <span>New Task</span>
      </Button>
      <div className="hidden md:block">
        <UserNav />
      </div>
    </header>
  );
}
