import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { editProfileSchema } from '@/schemas/profileSchema';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { FormField } from '@/components/forms/FormField';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { UserAvatar } from '@/components/common/UserAvatar';
import { Camera, Save } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Edit Student Profile Modal Dialog.
 */
export function EditProfileModal({ isOpen, onClose, profile, onSave }) {
  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(profile?.avatarUrl);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: profile?.name || '',
      email: profile?.email || '',
      university: profile?.university || '',
      department: profile?.department || '',
      major: profile?.major || '',
      academicYear: profile?.academicYear || '',
      campus: profile?.campus || '',
      avatarUrl: profile?.avatarUrl || '',
    },
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
      setValue('avatarUrl', url);
      toast.success('Avatar preview updated!');
    }
  };

  const onSubmit = (data) => {
    onSave({ ...data, avatarUrl: avatarPreview });
    toast.success('Profile updated successfully!');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Edit Student Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center justify-center space-y-2 py-2">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <UserAvatar name={profile?.name} src={avatarPreview} size="xl" />
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-slate-900/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="h-6 w-6" />
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <span className="text-xs font-semibold text-blue-600 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              Change Profile Photo
            </span>
          </div>

          <FormField label="Full Name" required error={errors.name?.message}>
            <Input {...register('name')} placeholder="Jordan Lee" />
          </FormField>

          <FormField label="Campus Email (.edu)" required error={errors.email?.message}>
            <Input {...register('email')} placeholder="student@university.edu" />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="University" required error={errors.university?.message}>
              <Input {...register('university')} placeholder="e.g. UIET Kurukshetra" />
            </FormField>

            <FormField label="Academic Year" required error={errors.academicYear?.message}>
              <select
                {...register('academicYear')}
                className="flex h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year / Senior">4th Year / Senior</option>
                <option value="Graduate / PG">Graduate / PG</option>
              </select>
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Department / Faculty" required error={errors.department?.message}>
              <Input {...register('department')} placeholder="e.g. ECE Department" />
            </FormField>

            <FormField label="Branch / Major Code" required error={errors.major?.message}>
              <Input {...register('major')} placeholder="e.g. ECE '26" />
            </FormField>
          </div>

          <FormField label="Campus Location" required error={errors.campus?.message}>
            <Input {...register('campus')} placeholder="e.g. Main Campus" />
          </FormField>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">
              Cancel
            </Button>
            <PrimaryButton type="submit" className="rounded-xl" leftIcon={Save}>
              Save Profile
            </PrimaryButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
