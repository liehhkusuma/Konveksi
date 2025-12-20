
import { Head } from '@inertiajs/react';
import { useRef } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project-imports
import AuthenticatedLayout from '@/layouts/Dashboard';
import ProfileCard from '@/sections/apps/profiles/user/ProfileCard';
import ProfileTabs from '@/sections/apps/profiles/user/ProfileTabs';

// ==============================|| PROFILE - USER ||============================== //

export default function UserProfile({ header, children }) {
    const inputRef = useRef(null);

    const focusInput = () => {
        inputRef.current?.focus();
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <Grid container spacing={3}>
                {/* <Grid item xs={12}>
                    <ProfileCard focusInput={focusInput} />
                </Grid> */}
                <Grid item xs={12} md={3}>
                    <ProfileTabs focusInput={focusInput} />
                </Grid>
                <Grid item xs={12} md={9}>
                    <main>{children}</main>
                </Grid>
            </Grid>
        </AuthenticatedLayout>
    );
}
