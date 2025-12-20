import { Head, Link, useForm, usePage } from '@inertiajs/react';

// material-ui
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

// project-imports
import AuthenticatedLayout from '@/layouts/Dashboard';
import MainCard from '@/components/MainCard';
import { Transition } from '@headlessui/react';

// ==============================|| USER PROFILE - PERSONAL ||============================== //

export default function Create({ customer }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            customer_id: customer.customer_id,
            type: customer.type,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            is_active: customer.is_active ? true : false,
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        patch(route('customers.update', { id: customer.id }));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Business Partner
                </h2>
            }>
            <Head title="Edit Business Partner" />
            <MainCard content={false} title="Edit Business Partner" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
                <form onSubmit={handleSubmit}>

                    <Box sx={{ p: 2.5 }}>

                        <Grid container spacing={3}>

                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="personal-first-name" required>Name</InputLabel>
                                    <TextField
                                        fullWidth
                                        id="personal-first-name"
                                        value={data.name}
                                        name="name"
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter Name"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.name && (
                                    <FormHelperText error id="personal-first-name-helper">
                                        {errors.name}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="customer-gender">Type</InputLabel>
                                    <RadioGroup row aria-label="payment-card">
                                        <FormControlLabel control={<Radio checked={data.type === 'consumer'} value={'consumer'} onChange={(e) => setData('type', e.target.value)} />} label={'Customer'} />
                                        <FormControlLabel control={<Radio checked={data.type === 'vendor'} value={'vendor'} onChange={(e) => setData('type', e.target.value)} />} label={'Vendor'} />
                                    </RadioGroup>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="personal-email">Email</InputLabel>
                                    <TextField
                                        fullWidth
                                        id="personal-email"
                                        value={data.email}
                                        name="email"
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Enter Email"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.email && (
                                    <FormHelperText error id="personal-email-helper">
                                        {errors.email}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="personal-phone" required>Phone</InputLabel>
                                    <TextField
                                        fullWidth
                                        id="personal-phone"
                                        value={data.phone}
                                        name="phone"
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="Enter Phone"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.phone && (
                                    <FormHelperText error id="personal-phone-helper">
                                        {errors.phone}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="personal-website">Website</InputLabel>
                                    <TextField
                                        fullWidth
                                        id="personal-website"
                                        value={data.website}
                                        name="website"
                                        onChange={(e) => setData('website', e.target.value)}
                                        placeholder="Enter Website"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.website && (
                                    <FormHelperText error id="personal-website-helper">
                                        {errors.website}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel htmlFor="is_active">Status</InputLabel>
                                <Switch
                                    edge="end"
                                    id="is_active"
                                    name="is_active"
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    checked={data.is_active ? true : false}
                                    inputProps={{
                                        'aria-labelledby': 'switch-list-label-is_active-2'
                                    }}
                                />
                                {errors.is_active && (
                                    <FormHelperText error id="personal-is_active-helper">
                                        {errors.is_active}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel htmlFor="address">Address</InputLabel>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={5}
                                    id="address"
                                    name="address"
                                    placeholder="Enter address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                />
                                {errors.address && (
                                    <FormHelperText error id="personal-address-helper">
                                        {errors.address}
                                    </FormHelperText>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2.5 }}>
                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                            <Link href={route('customers.index')}>
                                <Button variant="outlined" color="secondary">
                                    Back
                                </Button>
                            </Link>
                            <Button disabled={processing} type="submit" variant="contained">
                                Update
                            </Button>
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">
                                    Updated.
                                </p>
                            </Transition>
                        </Stack>
                    </Box>
                </form>
            </MainCard>
        </AuthenticatedLayout>
    );
}
