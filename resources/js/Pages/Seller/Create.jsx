import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState, useRef } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { NumericFormat } from 'react-number-format';

// project-imports
import AuthenticatedLayout from '@/layouts/Dashboard';
import IconButton from '@/components/@extended/IconButton';
import MainCard from '@/components/MainCard';
import { Transition } from '@headlessui/react';
import { isNumber, isLowercaseChar, isUppercaseChar, isSpecialChar, minLength } from '@/utils/password-validation';

// assets
import { Add, Eye, EyeSlash } from 'iconsax-react';

// ==============================|| USER PROFILE - PERSONAL ||============================== //

export default function Create({ }) {

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: '',
            store: '',
            phone: '',
            address: '',
            is_active: true,
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('sellers.store'));
    };

    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Seller
                </h2>
            }>
            <Head title="Add Seller" />
            <MainCard content={false} title="Add Seller" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ p: 2.5 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="personal-store">Store</InputLabel>
                                    <TextField
                                        fullWidth
                                        id="personal-store"
                                        value={data.store}
                                        name="store"
                                        onChange={(e) => setData('store', e.target.value)}
                                        placeholder="Enter Store"
                                    />
                                </Stack>
                                {errors.store && (
                                    <FormHelperText error id="personal-store-helper">
                                        {errors.store}
                                    </FormHelperText>
                                )}
                            </Grid>
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
                                    <FormHelperText error id="is_active-helper">
                                        {errors.is_active}
                                    </FormHelperText>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2.5 }}>
                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                            <Link href="/sellers">
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
