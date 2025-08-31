// Task priority types based on Eisenhower Matrix quadrants
export type Quadrant = 'urgent-important' | 'important' | 'urgent' | 'not-urgent-not-important';

export interface Task {
  id: string;
  name: string;
  description?: string;
  quadrant: Quadrant;
  deadline?: Date;
  createdAt: Date;
  completed: boolean;
}

// Quadrant information with label and description
export interface QuadrantInfo {
  id: Quadrant;
  label: string;
  description: string;
  color: string;
  foregroundColor: string;
}

// Quadrant configuration
export const quadrants: Record<Quadrant, QuadrantInfo> = {
  'urgent-important': {
    id: 'urgent-important',
    label: 'Do',
    description: 'Urgent & Important',
    color: 'bg-urgent-important',
    foregroundColor: 'text-urgent-important-foreground'
  },
  'important': {
    id: 'important',
    label: 'Decide',
    description: 'Important, Not Urgent',
    color: 'bg-important',
    foregroundColor: 'text-important-foreground'
  },
  'urgent': {
    id: 'urgent',
    label: 'Delegate',
    description: 'Urgent, Not Important',
    color: 'bg-urgent',
    foregroundColor: 'text-urgent-foreground'
  },
  'not-urgent-not-important': {
    id: 'not-urgent-not-important',
    label: 'Delete',
    description: 'Not Urgent, Not Important',
    color: 'bg-not-urgent-not-important',
    foregroundColor: 'text-not-urgent-not-important-foreground'
  }
};