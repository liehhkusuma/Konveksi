import AuthenticatedLayout from '@/layouts/Dashboard';
import { Head } from '@inertiajs/react';

import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// project-imports
import MainCard from '@/components/MainCard';

import EcommerceDataCard from '@/components/cards/statistics/EcommerceDataCard';
import EcommerceDataChart from '@/sections/widget/chart/EcommerceDataChart';

import WelcomeBanner from '@/sections/dashboard/default/WelcomeBanner';

// assets
import { ArrowDown, ArrowUp, Book, Calendar, CloudChange, Wallet3 } from 'iconsax-react';

export default function Dashboard({ sales, purchases, productions, payrolls }) {
    const theme = useTheme();

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            {/* <MainCard title="Dashboard"> </MainCard> */}


        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                <Grid item xs={12}>
                    <WelcomeBanner />
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <EcommerceDataCard
                title="Purchase"
                count={formatter.format(purchases)}
                iconPrimary={<Wallet3 />}
                percentage={
                    <Typography color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> 90.6%
                    </Typography>
                }
                >
                    <EcommerceDataChart color={theme.palette.primary.main} />
                </EcommerceDataCard>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <EcommerceDataCard
                title="Sales"
                count={formatter.format(sales)}
                color="success"
                iconPrimary={<Book color={theme.palette.success.dark} />}
                percentage={
                    <Typography color="success.dark" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <ArrowDown size={16} style={{ transform: 'rotate(-45deg)' }} /> 70.6%
                    </Typography>
                }
                >
                <EcommerceDataChart color={theme.palette.success.dark} />
                </EcommerceDataCard>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <EcommerceDataCard
                title="Production"
                count={productions}
                color="warning"
                iconPrimary={<Calendar color={theme.palette.warning.darker} />}
                percentage={
                    <Typography color="warning.darker" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> 84.6%
                    </Typography>
                }
                >
                <EcommerceDataChart color={theme.palette.warning.darker} />
                </EcommerceDataCard>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <EcommerceDataCard
                title="Payroll"
                count={formatter.format(payrolls)}
                color="error"
                iconPrimary={<CloudChange color={theme.palette.error.dark} />}
                percentage={
                    <Typography color="error.dark" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <ArrowDown size={16} style={{ transform: 'rotate(45deg)' }} /> 20.6%
                    </Typography>
                }
                >
                <EcommerceDataChart color={theme.palette.error.dark} />
                </EcommerceDataCard>
            </Grid>
        </Grid>
        </AuthenticatedLayout>
    );
}
