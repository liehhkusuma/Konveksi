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

export default function Create({ employee, positions }) {
    const minDate = new Date();
    minDate.setDate(minDate.getDate());

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            category: employee.category,
            type: employee.type,
            name: employee.name,
            phone: employee.phone,
            cashbon: employee.cashbon,
            address: employee.address,
            salary: employee.salary,
            is_active: employee.is_active ? true : false,
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        patch(route('employees.update', { id: employee.id }));
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Employee
                </h2>
            }>
            <Head title="Edit Employee" />
            <MainCard content={false} title="Edit Employee" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ p: 2.5 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="employee-category">Category</InputLabel>
                                    <RadioGroup row aria-label="employee-category">
                                        <FormControlLabel control={<Radio checked={data.category === 'daily'} value={'daily'} onChange={(e) => setData('category', e.target.value)} />} label={'Harian'} />
                                        <FormControlLabel control={<Radio checked={data.category === 'project'} value={'project'} onChange={(e) => setData('category', e.target.value)} />} label={'Borongan'} />
                                    </RadioGroup>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="material-type">Type</InputLabel>
                                    <RadioGroup row aria-label="material-type">
                                        <FormControlLabel control={<Radio checked={data.type === 'default'} value={'default'} onChange={(e) => setData('type', e.target.value)} />} label={'Tidak Jahit'} />
                                        <FormControlLabel control={<Radio checked={data.type === 'external'} value={'external'} onChange={(e) => setData('type', e.target.value)} />} label={'Jahit Luar'} />
                                        <FormControlLabel control={<Radio checked={data.type === 'internal'} value={'internal'} onChange={(e) => setData('type', e.target.value)} />} label={'Jahit Dalam'} />
                                    </RadioGroup>
                                </Stack>
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
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="cashbon">Cashbon</InputLabel>
                                    <NumericFormat
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        customInput={TextField}
                                        id="cashbon"
                                        value={data.cashbon}
                                        name="cashbon"
                                        min={0}
                                        max={100}
                                        InputProps={{
                                            startAdornment: 'Rp'
                                        }}
                                        onValueChange={(values) => {
                                            setData('cashbon', values.floatValue);
                                        }}
                                        placeholder="Enter Cashbon"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.cashbon && (
                                    <FormHelperText error id="cashbon-helper">
                                        {errors.cashbon}
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
                            {data.category === 'daily' ? (
                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="salary" required>Salary</InputLabel>
                                        <NumericFormat
                                            thousandSeparator="."
                                            decimalSeparator=","
                                            customInput={TextField}
                                            id="salary"
                                            value={data.salary}
                                            name="salary"
                                            min={0}
                                            max={100}
                                            InputProps={{
                                                startAdornment: 'Rp'
                                            }}
                                            onValueChange={(values) => {
                                                setData('salary', values.floatValue);
                                            }}
                                            placeholder="Enter Salary"
                                            autoFocus
                                        />
                                    </Stack>
                                    {errors.salary && (
                                        <FormHelperText error id="salary-helper">
                                            {errors.salary}
                                        </FormHelperText>
                                    )}
                                </Grid>
                            ) : null}
                        </Grid>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2.5 }}>
                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                            <Link href="/employees">
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
