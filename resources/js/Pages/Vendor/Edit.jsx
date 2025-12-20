import { Head, Link, useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';

// material-ui
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// project-imports
import AuthenticatedLayout from '@/layouts/Dashboard';
import MainCard from '@/components/MainCard';
import { Transition } from '@headlessui/react';

// ==============================|| USER PROFILE - PERSONAL ||============================== //

export default function Edit({ vendor }) {

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate());

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: vendor.name,
            email: vendor.email,
            phone: vendor.phone,
            description: vendor.description,
            status: vendor.status,
            join_date: new Date(vendor.join_date),
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        patch(route('vendors.update', { id: vendor.id }));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Vendor
                </h2>
            }>
            <Head title="Edit Vendor" />
            <MainCard content={false} title="Edit Vendor" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
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
                                    <InputLabel htmlFor="personal-email" required>Email</InputLabel>
                                    <TextField
                                        type="email"
                                        fullWidth
                                        value={data.email}
                                        name="email"
                                        onChange={(e) => setData('email', e.target.value)}
                                        id="personal-email"
                                        placeholder="Enter Email Address"
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
                                    <InputLabel htmlFor="personal-phone">Phone</InputLabel>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        id="personal-phone"
                                        value={data.phone}
                                        name="phone"
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="Enter Phone"
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
                                    <InputLabel htmlFor="status">Status</InputLabel>
                                    <Select
                                        fullWidth
                                        value={data.status}
                                        name="status"
                                        onChange={(e) => setData('status', e.target.value)}
                                    >
                                        <MenuItem value="active">Active</MenuItem>
                                        <MenuItem value="inactive">Inactive</MenuItem>
                                        <MenuItem value="banned">Banned</MenuItem>
                                        <MenuItem value="assesement">Assesement</MenuItem>
                                    </Select>
                                </Stack>
                                {errors.status && (
                                    <FormHelperText error id="personal-status-helper">
                                        {errors.status}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel htmlFor="description">Description</InputLabel>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={5}
                                    id="description"
                                    name="description"
                                    placeholder="Enter description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                {errors.description && (
                                    <FormHelperText error id="personal-description-helper">
                                        {errors.description}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel htmlFor="join_date" required>Join Date</InputLabel>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        // views={['year']}
                                        value={data.join_date}
                                        maxDate={maxDate}
                                        onChange={(e) => setData('join_date', e)}
                                        sx={{ width: 1 }}
                                    />
                                </LocalizationProvider>
                                {errors.join_date && (
                                    <FormHelperText error id="personal-join_date-helper">
                                        {errors.join_date}
                                    </FormHelperText>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2.5 }}>
                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                            <Link href="/vendors">
                                <Button variant="outlined" color="secondary">
                                    Back
                                </Button>
                            </Link>
                            <Button disabled={processing} type="submit" variant="contained">
                                Create
                            </Button>
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">
                                    Created.
                                </p>
                            </Transition>
                        </Stack>
                    </Box>
                </form>
            </MainCard>
        </AuthenticatedLayout>
    );
}
