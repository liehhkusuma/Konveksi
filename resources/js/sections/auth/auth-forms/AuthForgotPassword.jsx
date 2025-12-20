// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

// third-party

// project-imports
import { useForm } from '@inertiajs/react';
import AnimateButton from '@/components/@extended/AnimateButton';

// ============================|| FIREBASE - FORGOT PASSWORD ||============================ //

export default function AuthForgotPassword({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        post(route('password.email'), {
            onFinish: () => reset('email'),
        });
    };

    return (
        <>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            {status && (
                                <div className="mb-4 text-sm font-medium text-green-600">
                                    {status}
                                </div>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="email-forgot">Email Address</InputLabel>
                            <OutlinedInput
                                fullWidth
                                error={Boolean(errors.email)}
                                id="email-forgot"
                                type="email"
                                value={data.email}
                                name="email"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Enter email address"
                                inputProps={{}}
                            />
                        </Stack>
                        {errors.email && (
                            <FormHelperText error id="helper-text-email-forgot">
                                {errors.email}
                            </FormHelperText>
                        )}
                    </Grid>
                    {errors.submit && (
                        <Grid item xs={12}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Grid>
                    )}
                    <Grid item xs={12} sx={{ mb: -2 }}>
                        <Typography variant="caption">Do not forgot to check SPAM box.</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <AnimateButton>
                            <Button disableElevation disabled={processing} fullWidth size="large" type="submit" variant="contained" color="primary">
                                Send Password Reset Email
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}
