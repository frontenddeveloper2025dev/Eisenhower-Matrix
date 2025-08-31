import { CheckSquare } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex items-center h-16 px-4">
        <div className="flex items-center gap-2">
          <CheckSquare className="h-6 w-6 text-primary" />
          <h1 className="font-semibold text-xl">Eisenhower Matrix</h1>
        </div>
      </div>
    </header>
  );
}