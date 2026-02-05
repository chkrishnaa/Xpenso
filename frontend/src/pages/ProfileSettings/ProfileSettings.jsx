import React from 'react'
import ProfilePage from './ProfilePage'
import SettingsPage from './SettingsPage'
import DashboardLayout from '../../components/layouts/DashboardLayout'

const ProfileSettingsPage = () => {
  return (
<DashboardLayout activeMenu="dashboard">
      <div className="mb-0 mt-5 mob:mb-5 mx-auto">
    <ProfilePage />
      <SettingsPage />
    </div>
    </DashboardLayout>
  )
}

export default ProfileSettingsPage;
