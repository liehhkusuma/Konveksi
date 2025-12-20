import AuthenticatedLayout from '@/layouts/Dashboard';
import { Head } from '@inertiajs/react';

import Typography from '@mui/material/Typography';

// project-imports
import MainCard from '@/components/MainCard';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <MainCard title="Dashboard">
                <Typography variant="body1">
                    Welcome to convection system
                </Typography>
            </MainCard>
        </AuthenticatedLayout>
    );
}
