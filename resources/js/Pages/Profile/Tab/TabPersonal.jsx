import { Link, useForm, usePage } from '@inertiajs/react';

// material-ui
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';
import FormHelperText from '@mui/material/FormHelperText';

// third-party

// project-imports
import UserProfile from '@/Pages/Profile/Edit';
import MainCard from '@/components/MainCard';
import countries from '@/data/countries';
import { openSnackbar } from '@/api/snackbar';

// assets
import { Add } from 'iconsax-react';

// styles & constant
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = { PaperProps: { style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP } } };

const skills = [
    'Adobe XD',
    'After Effect',
    'Angular',
    'Animation',
    'ASP.Net',
    'Bootstrap',
    'C#',
    'CC',
    'Corel Draw',
    'CSS',
    'DIV',
    'Dreamweaver',
    'Figma',
    'Graphics',
    'HTML',
    'Illustrator',
    'J2Ee',
    'Java',
    'Javascript',
    'JQuery',
    'Logo Design',
    'Material UI',
    'Motion',
    'MVC',
    'MySQL',
    'NodeJS',
    'npm',
    'Photoshop',
    'PHP',
    'React',
    'Redux',
    'Reduxjs & tooltit',
    'SASS',
    'SCSS',
    'SQL Server',
    'SVG',
    'UI/UX',
    'User Interface Designing',
    'Wordpress'
];

// ==============================|| USER PROFILE - PERSONAL ||============================== //

export default function TabPersonal() {
    const handleChangeDay = (event, date, setFieldValue) => {
        setFieldValue('dob', new Date(date.setDate(parseInt(event.target.value, 10))));
    };

    const handleChangeMonth = (event, date, setFieldValue) => {
        setFieldValue('dob', new Date(date.setMonth(parseInt(event.target.value, 10))));
    };

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);


    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <UserProfile>
            <MainCard content={false} title="Personal Information" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ p: 2.5 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="personal-first-name">Name</InputLabel>
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
                                    <InputLabel htmlFor="personal-email">Email Address</InputLabel>
                                    <TextField
                                        type="email"
                                        fullWidth
                                        value={data.email}
                                        name="email"
                                        onChange={(e) => setData('email', e.target.value)}
                                        id="personal-email"
                                        placeholder="Email Address"
                                    />
                                </Stack>
                                {errors.email && (
                                    <FormHelperText error id="personal-email-helper">
                                        {errors.email}
                                    </FormHelperText>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2.5 }}>
                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                            <Button variant="outlined" color="secondary">
                                Cancel
                            </Button>
                            <Button disabled={processing} type="submit" variant="contained">
                                Save
                            </Button>
                        </Stack>
                    </Box>
                </form>
            </MainCard>
        </UserProfile>
    );
}
