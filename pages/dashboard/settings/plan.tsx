import React from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';

function password() {
  return <div>password</div>;
}

export default password;

password.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
