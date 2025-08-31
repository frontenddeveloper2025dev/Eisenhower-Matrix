import { format } from 'date-fns';
import { Check, Trash2, Edit } from 'lucide-react';
import { useState } from 'react';
import { Task } from '@/types/task';
import { useTaskStore } from '@/store/task-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedTask, setEditedTask] = useState<Partial<Task>>({
    name: task.name,
    description: task.description,
    deadline: task.deadline,
  });
  
  const { toggleTaskCompletion, deleteTask, updateTask } = useTaskStore();

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTaskCompletion(task.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditDialogOpen(true);
  };

  const handleSave = () => {
    updateTask(task.id, {
      name: editedTask.name || '',
      description: editedTask.description,
      deadline: editedTask.deadline,
    });
    setIsEditDialogOpen(false);
  };

  return (
    <>
      <Card 
        className={cn(
          "w-full transition-all duration-200 cursor-pointer hover:shadow-md overflow-hidden flex flex-col",
          task.completed ? "opacity-70" : "opacity-100"
        )}
      >
        {/* Task header with completion toggle */}
        <div className="p-3 flex items-start justify-between">
          <div className="flex-1 mr-2">
            <h3 className={cn(
              "font-medium leading-tight",
              task.completed && "line-through text-muted-foreground"
            )}>
              {task.name}
            </h3>
            
            {task.deadline && (
              <div className="text-xs text-muted-foreground mt-1">
                Due: {format(new Date(task.deadline), 'MMM d, yyyy')}
              </div>
            )}
          </div>
          
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={handleToggleComplete}>
              <Check className={cn("h-4 w-4", task.completed ? "text-green-500" : "text-muted-foreground")} />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={handleEdit}>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
        
        {/* Description if available */}
        {task.description && (
          <div className="px-3 pb-3 text-sm text-muted-foreground">
            <p className={cn(task.completed && "line-through")}>{task.description}</p>
          </div>
        )}
      </Card>
      
      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Task Name</Label>
              <Input
                id="name"
                value={editedTask.name || ''}
                onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={editedTask.description || ''}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline (Optional)</Label>
              <Input
                id="deadline"
                type="date"
                value={editedTask.deadline ? format(new Date(editedTask.deadline), 'yyyy-MM-dd') : ''}
                onChange={(e) => setEditedTask({ 
                  ...editedTask, 
                  deadline: e.target.value ? new Date(e.target.value) : undefined
                })}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}