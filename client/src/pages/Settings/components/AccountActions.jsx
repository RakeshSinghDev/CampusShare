import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { LogOut, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export function AccountActions() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleLogout = async () => {
    if (isSigningOut) return;

    try {
      setIsSigningOut(true);
      await logout(queryClient);
      navigate('/login', { replace: true });
    } catch (err) {
      // Errors handled via toast in logout method
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <Card className="rounded-2xl border-red-200 bg-red-50/40 shadow-2xs">
      <CardContent className="p-5 flex items-center justify-between">
        <div>
          <h4 className="font-bold text-sm text-red-900">Sign Out of CampusShare</h4>
          <p className="text-xs text-red-700 mt-0.5">End your current session on this browser.</p>
        </div>

        <Button
          variant="destructive"
          size="sm"
          onClick={handleLogout}
          disabled={isSigningOut}
          className="rounded-xl text-xs gap-1.5"
        >
          {isSigningOut ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Signing Out...
            </>
          ) : (
            <>
              <LogOut className="h-4 w-4" /> Sign Out
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
