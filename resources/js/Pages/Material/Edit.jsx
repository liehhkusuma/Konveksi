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
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

import { NumericFormat } from 'react-number-format';

// project-imports
import AuthenticatedLayout from '@/layouts/Dashboard';
import MainCard from '@/components/MainCard';
import { Transition } from '@headlessui/react';

// ==============================|| USER PROFILE - PERSONAL ||============================== //

export default function PageEdit({ categories, distributors, measurements, material }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            distributor_id: material.distributor_id,
            measurement_id: material.measurement_id,
            category: material.category,
            name: material.name,
            price: material.price,
            is_active: material.is_active ? true : false,
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        patch(route('materials.update', { id: material.id }));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Material
                </h2>
            }>
            <Head title="Edit Material" />
            <MainCard content={false} title="Edit Material" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ p: 2.5 }}>

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="distributor_id" required>Distributor</InputLabel>
                                    <Select
                                        fullWidth
                                        value={data.distributor_id}
                                        name="distributor_id"
                                        onChange={(e) => setData('distributor_id', e.target.value)}
                                    >
                                        {distributors.map((distributor, index) => (
                                            <MenuItem key={index} value={distributor.id} selected={data.distributor_id == distributor.id}>
                                                {distributor.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Stack>
                                {errors.distributor_id && (
                                    <FormHelperText error id="distributor_id-helper">
                                        {errors.distributor_id}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="material-category">Category</InputLabel>
                                    <RadioGroup row aria-label="material-category">
                                        <FormControlLabel control={<Radio checked={data.category === 'default'} value={'default'} onChange={(e) => setData('category', e.target.value)} />} label={'Default'} />
                                        <FormControlLabel control={<Radio checked={data.category === 'accessory'} value={'accessory'} onChange={(e) => setData('category', e.target.value)} />} label={'Accessory'} />
                                    </RadioGroup>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="measurement_id" required>Measurement</InputLabel>
                                    <Select
                                        fullWidth
                                        value={data.measurement_id}
                                        name="measurement_id"
                                        onChange={(e) => setData('measurement_id', e.target.value)}
                                    >
                                        {measurements.map((measurement, index) => (
                                            <MenuItem key={index} value={measurement.id} selected={data.measurement_id == measurement.id}>
                                                {measurement.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Stack>
                                {errors.measurement_id && (
                                    <FormHelperText error id="measurement_id-helper">
                                        {errors.measurement_id}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="name" required>Name</InputLabel>
                                    <TextField
                                        fullWidth
                                        id="name"
                                        value={data.name}
                                        name="name"
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter Name"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.name && (
                                    <FormHelperText error id="name-helper">
                                        {errors.name}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="price" required>Price</InputLabel>
                                    <NumericFormat
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        customInput={TextField}
                                        id="price"
                                        value={data.price}
                                        name="price"
                                        min={0}
                                        max={100}
                                        InputProps={{
                                            startAdornment: 'Rp'
                                        }}
                                        onValueChange={(values) => {
                                            setData('price', values.floatValue);
                                        }}
                                        placeholder="Enter Price"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.price && (
                                    <FormHelperText error id="price-helper">
                                        {errors.price}
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
                            <Link href={route('materials.index')}>
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
