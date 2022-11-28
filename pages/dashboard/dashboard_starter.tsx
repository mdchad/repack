import React from 'react'
import DashboardLayout from '@/components/Layout/DashboardLayout';

function settings() {
    return (
        <div>settings</div>
    )
}

export default settings

settings.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;