import React from 'react'
import DashboardLayout from '@/components/Layout/DashboardLayout';

function index() {
    return (
        <div>Team</div>
    )
}

export default index

index.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;