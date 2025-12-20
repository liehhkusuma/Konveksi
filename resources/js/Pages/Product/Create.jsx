import { Head, Link, useForm, usePage } from '@inertiajs/react';

// material-ui
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

import { NumericFormat } from 'react-number-format';

// project-imports
import AuthenticatedLayout from '@/layouts/Dashboard';
import MainCard from '@/components/MainCard';
import { Transition } from '@headlessui/react';

// ==============================|| USER PROFILE - PERSONAL ||============================== //

export default function Create() {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: '',
            type: 'item',
            purchase_price: 0,
            exterior_production_price: 0,
            interior_production_price: 0,
            price: 0,
            img: '',
            desc: '',
            is_active: true,
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('products.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Product
                </h2>
            }>
            <Head title="Add Product" />
            <MainCard content={false} title="Add Product" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ p: 2.5 }}>
                        <Grid container spacing={3}>

                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="personal-name" required>Name</InputLabel>
                                    <TextField
                                        fullWidth
                                        id="personal-name"
                                        value={data.name}
                                        name="name"
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter Name"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.name && (
                                    <FormHelperText error id="personal-name-helper">
                                        {errors.name}
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
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="purchase_price" required>Purchase Price</InputLabel>
                                    <NumericFormat
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        customInput={TextField}
                                        id="purchase_price"
                                        value={data.purchase_price}
                                        name="purchase_price"
                                        min={0}
                                        max={100}
                                        InputProps={{
                                            startAdornment: 'Rp'
                                        }}
                                        onValueChange={(values) => {
                                            setData('purchase_price', values.floatValue);
                                        }}
                                        placeholder="Enter Purchase_price"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.purchase_price && (
                                    <FormHelperText error id="purchase_price-helper">
                                        {errors.purchase_price}
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
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="exterior_production_price" required>Exterior Production Price</InputLabel>
                                    <NumericFormat
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        customInput={TextField}
                                        id="exterior_production_price"
                                        value={data.exterior_production_price}
                                        name="exterior_production_price"
                                        min={0}
                                        max={100}
                                        InputProps={{
                                            startAdornment: 'Rp'
                                        }}
                                        onValueChange={(values) => {
                                            setData('exterior_production_price', values.floatValue);
                                        }}
                                        placeholder="Enter Exterior_production_price"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.exterior_production_price && (
                                    <FormHelperText error id="exterior_production_price-helper">
                                        {errors.exterior_production_price}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="interior_production_price" required>Interior Production Price</InputLabel>
                                    <NumericFormat
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        customInput={TextField}
                                        id="interior_production_price"
                                        value={data.interior_production_price}
                                        name="interior_production_price"
                                        min={0}
                                        max={100}
                                        InputProps={{
                                            startAdornment: 'Rp'
                                        }}
                                        onValueChange={(values) => {
                                            setData('interior_production_price', values.floatValue);
                                        }}
                                        placeholder="Enter Interior_production_price"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.interior_production_price && (
                                    <FormHelperText error id="interior_production_price-helper">
                                        {errors.interior_production_price}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel htmlFor="desc">Desc</InputLabel>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={5}
                                    id="desc"
                                    name="desc"
                                    placeholder="Enter desc"
                                    value={data.desc}
                                    onChange={(e) => setData('desc', e.target.value)}
                                />
                                {errors.desc && (
                                    <FormHelperText error id="personal-desc-helper">
                                        {errors.desc}
                                    </FormHelperText>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2.5 }}>
                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                            <Link href={route('products.index')}>
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
