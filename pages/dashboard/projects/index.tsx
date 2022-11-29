import React from 'react'
import DashboardLayout from '@/components/Layout/DashboardLayout';

function index() {
    return (
        <div>Projects</div>
    )
}

export default index

index.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;