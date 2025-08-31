import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Task, Quadrant, quadrants } from '@/types/task';
import { useTaskStore } from '@/store/task-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TaskCard } from '@/components/TaskCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

interface QuadrantPanelProps {
  quadrantId: Quadrant;
}

export function QuadrantPanel({ quadrantId }: QuadrantPanelProps) {
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    name: '',
    description: '',
    quadrant: quadrantId,
    completed: false,
  });

  const { getTasksByQuadrant, addTask } = useTaskStore();
  const tasks = getTasksByQuadrant(quadrantId);
  const quadrantInfo = quadrants[quadrantId];

  const handleAddTask = () => {
    if (newTask.name) {
      addTask({
        name: newTask.name,
        description: newTask.description,
        quadrant: quadrantId,
        deadline: newTask.deadline,
        completed: false
      });
      
      // Reset form and close dialog
      setNewTask({
        name: '',
        description: '',
        quadrant: quadrantId,
        completed: false,
      });
      setIsAddTaskDialogOpen(false);
    }
  };

  return (
    <>
      <div className="h-full flex flex-col">
        {/* Quadrant Header */}
        <Card className={`${quadrantInfo.color} ${quadrantInfo.foregroundColor} p-3 mb-3`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-lg">{quadrantInfo.label}</h2>
              <p className="text-sm opacity-90">{quadrantInfo.description}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-white/20"
              onClick={() => setIsAddTaskDialogOpen(true)}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </Card>

        {/* Tasks List with ScrollArea for overflow */}
        <ScrollArea className="flex-1 overflow-auto pr-2">
          <div className="space-y-2">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <div className="text-center p-4 text-sm text-muted-foreground">
                No tasks yet
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Add Task Dialog */}
      <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Task to {quadrantInfo.label}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Task Name</Label>
              <Input
                id="name"
                value={newTask.name || ''}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                placeholder="Enter task name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={newTask.description || ''}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Add more details about this task"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline (Optional)</Label>
              <Input
                id="deadline"
                type="date"
                value={newTask.deadline ? new Date(newTask.deadline).toISOString().split('T')[0] : ''}
                onChange={(e) => setNewTask({ 
                  ...newTask, 
                  deadline: e.target.value ? new Date(e.target.value) : undefined
                })}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTaskDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddTask}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}