import React from 'react';
import { User, Mail, Lock, KeyRound } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FormField } from '@/components/forms/FormField';
import { Input } from '@/components/ui/input';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { toast } from 'sonner';

export function AccountSettings({ profile }) {
  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Account settings saved!');
  };

  return (
    <Card className="rounded-2xl border-slate-200 bg-white shadow-subtle mb-6">
      <CardContent className="p-6 space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <User className="h-4 w-4 text-blue-600" /> Account & Login Security
        </h3>

        <form onSubmit={handleSave} className="space-y-4">
          <FormField label="Full Name">
            <Input defaultValue={profile?.name || 'Rakesh Singh'} />
          </FormField>

          <FormField label="Campus Email (.edu)" helperText="University verified email">
            <Input defaultValue={profile?.email || 'rakesh.s@university.edu'} disabled className="bg-slate-100" />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="New Password">
              <Input type="password" placeholder="••••••••" />
            </FormField>

            <FormField label="Confirm New Password">
              <Input type="password" placeholder="••••••••" />
            </FormField>
          </div>

          <PrimaryButton type="submit" size="sm" className="rounded-xl">
            Update Security Settings
          </PrimaryButton>
        </form>
      </CardContent>
    </Card>
  );
}
