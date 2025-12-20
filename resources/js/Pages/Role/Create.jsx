import { Head, Link, useForm, usePage } from '@inertiajs/react';

// material-ui
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project-imports
import AuthenticatedLayout from '@/layouts/Dashboard';
import MainCard from '@/components/MainCard';
import { Transition } from '@headlessui/react';

// ==============================|| USER PROFILE - PERSONAL ||============================== //

export default function Create({ categories }) {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            title: '',
            is_active: true,
            permissions: [],
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('roles.store'));
    };

    function snakeToTitleCase(str) {
        return str
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Account Authorization
                </h2>
            }>
            <Head title="Account Authorization" />
            <MainCard content={false} title="Account Authorization" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ p: 2.5 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="personal-title" required>Title</InputLabel>
                                    <TextField
                                        fullWidth
                                        id="personal-title"
                                        value={data.title}
                                        name="title"
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Enter Title"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.title && (
                                    <FormHelperText error id="personal-title-helper">
                                        {errors.title}
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
                        </Grid>
                    </Box>
                    <Box sx={{ p: 2.5 }}>
                        <Grid container spacing={3}>
                            {categories.map(category => (
                                <Grid item xs={12} sm={6} key={category.id}>
                                    <Stack spacing={1}>
                                        <MainCard title={snakeToTitleCase(category.title)}>
                                            <Stack spacing={2.5}>
                                                <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
                                                    {(category?.permission || []).map(permission => (
                                                        <ListItem key={permission.id}>
                                                            {/* <ListItemText primary={<Typography color="secondary">News about PCT-themes products and feature updates</Typography>} /> */}
                                                            <FormControlLabel
                                                                key={permission.id}
                                                                control={<Checkbox onChange={e => {
                                                                    const newPermissions = e.target.checked
                                                                        ? [...data.permissions, permission.id]
                                                                        : data.permissions.filter(p => p !== permission.id);
                                                                    setData("permissions", newPermissions);
                                                                }} />}
                                                                label={<Typography variant="h6">{snakeToTitleCase(permission.title)}</Typography>}
                                                            />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </Stack>
                                        </MainCard>

                                    </Stack>
                                </Grid>
                            ))}
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    {errors.permissions && (
                                        <FormHelperText error id="personal-title-helper">
                                            {errors.permissions}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2.5 }}>
                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                            <Link href="/roles">
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
