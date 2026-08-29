import React, { useRef, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Card, CardContent } from '@/components/ui/card';
import { FormField } from '@/components/forms/FormField';
import { Input } from '@/components/ui/input';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { ShieldCheck, UploadCloud, CheckCircle2, UserCheck, Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function VerifyPage() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
      toast.success(`Selected document: ${file.name}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Verification document submitted! Campus moderators will review within 24 hours.');
    }, 800);
  };

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto space-y-6">
        <SectionHeader
          title="Student Identity Verification"
          subtitle="Verify your student status to list resources, rent items, and build campus trust"
        />

        {/* Why Verification Matters Card */}
        <Card className="rounded-2xl border-blue-100 bg-blue-50/50 shadow-2xs">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm">Why Student Verification Matters</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
              <div className="p-3 rounded-xl bg-white/80 border border-blue-100/80">
                <span className="font-bold block text-slate-900 mb-0.5">Safer Transactions</span>
                <span className="text-[11px] text-slate-500">Exchanges occur exclusively between verified campus peers.</span>
              </div>

              <div className="p-3 rounded-xl bg-white/80 border border-blue-100/80">
                <span className="font-bold block text-slate-900 mb-0.5">Trust & Reputation</span>
                <span className="text-[11px] text-slate-500">Earn a Verified Student badge on your profile and listings.</span>
              </div>

              <div className="p-3 rounded-xl bg-white/80 border border-blue-100/80">
                <span className="font-bold block text-slate-900 mb-0.5">Deposit Refunds</span>
                <span className="text-[11px] text-slate-500">Verified status enables short-term rental security deposits.</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Upload Form */}
        <Card className="rounded-2xl border-slate-200 bg-white shadow-subtle">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField label="College / University" required>
                <Input defaultValue="State University" />
              </FormField>

              <FormField label="Campus Email (.edu)" required helperText="Must be your official university email">
                <Input defaultValue="student@university.edu" disabled className="bg-slate-100" />
              </FormField>

              <FormField label="Student ID Card or Course Schedule" required>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-center hover:bg-slate-100/50 cursor-pointer transition-colors"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <UploadCloud className="h-8 w-8 text-blue-600 mb-2" />
                  <span className="text-xs font-bold text-slate-700">
                    {selectedFile ? `Selected: ${selectedFile}` : 'Upload Student ID or Current Semester Schedule'}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5">PNG, JPG, or PDF up to 10MB</span>
                </div>
              </FormField>

              <PrimaryButton
                type="submit"
                isLoading={isSubmitting}
                className="w-full h-11 text-base rounded-xl mt-2 font-bold"
                leftIcon={ShieldCheck}
              >
                Submit Verification Request
              </PrimaryButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
