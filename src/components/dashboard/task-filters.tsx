'use client';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Priority } from '@/lib/types';

interface TaskFiltersProps {
  statusFilter: 'all' | 'active' | 'completed';
  onStatusFilterChange: (value: 'all' | 'active' | 'completed') => void;
  priorityFilter: Priority | 'all';
  onPriorityFilterChange: (value: Priority | 'all') => void;
}

export function TaskFilters({
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <div className="flex items-center space-x-1 rounded-lg bg-muted p-1">
        <Button
          variant={statusFilter === 'all' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onStatusFilterChange('all')}
          className="h-8"
        >
          All
        </Button>
        <Button
          variant={statusFilter === 'active' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onStatusFilterChange('active')}
          className="h-8"
        >
          Active
        </Button>
        <Button
          variant={statusFilter === 'completed' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onStatusFilterChange('completed')}
          className="h-8"
        >
          Completed
        </Button>
      </div>
      <Select
        value={priorityFilter}
        onValueChange={(value: Priority | 'all') => onPriorityFilterChange(value)}
      >
        <SelectTrigger className="w-full sm:w-[180px] h-10">
          <SelectValue placeholder="Filter by priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          <SelectItem value="urgent">Urgent</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
