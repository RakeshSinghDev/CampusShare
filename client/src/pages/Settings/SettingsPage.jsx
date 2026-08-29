import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AccountSettings } from './components/AccountSettings';
import { MarketplaceSettings } from './components/MarketplaceSettings';
import { PrivacySettings } from './components/PrivacySettings';
import { SupportSettings } from './components/SupportSettings';
import { AccountActions } from './components/AccountActions';
import { studentProfile } from '@/data/profileData';

export default function SettingsPage() {
  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto">
        <SectionHeader
          title="Account & Marketplace Settings"
          subtitle="Manage your profile security, campus notifications, privacy, and support options"
        />

        <AccountSettings profile={studentProfile} />
        <MarketplaceSettings />
        <PrivacySettings />
        <SupportSettings />
        <AccountActions />
      </div>
    </PageContainer>
  );
}
