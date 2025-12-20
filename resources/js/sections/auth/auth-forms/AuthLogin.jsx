import PropTypes from 'prop-types';
import { useState } from 'react';
import { Head, Link as RouterLink, useForm, usePage } from '@inertiajs/react';

// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';

// project-imports
// import IconButton from '@/components/@extended/IconButton';
import IconButton from '@mui/material/IconButton';
import AnimateButton from '@/components/@extended/AnimateButton';

// assets
import { Eye, EyeSlash } from 'iconsax-react';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin({ forgot }) {
    const [checked, setChecked] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <TextField
                                id="email-login"
                                type="text"
                                value={data.email}
                                name="email"
                                variant="outlined"
                                placeholder="Enter email address"
                                onChange={(e) => setData('email', e.target.value)}
                                fullWidth
                                error={Boolean(errors.email)}
                            />
                        </Stack>
                        {errors.email && (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                {errors.email}
                            </FormHelperText>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <OutlinedInput
                                fullWidth
                                error={Boolean(errors.password)}
                                id="-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                name="password"
                                onChange={(e) => setData('password', e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            color="secondary"
                                        >
                                            {showPassword ? <Eye /> : <EyeSlash />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                placeholder="Enter password"
                            />
                        </Stack>
                        {errors.password && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                {errors.password}
                            </FormHelperText>
                        )}
                    </Grid>

                    <Grid item xs={12} sx={{ mt: -1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                        size="small"
                                    />
                                }
                                label={<Typography variant="h6">Keep me sign in</Typography>}
                            />

                            <Link variant="h6" component={RouterLink} href={route('password.request')} color="text.primary">
                                Forgot Password?
                            </Link>
                        </Stack>
                    </Grid>
                    {errors.submit && (
                        <Grid item xs={12}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <AnimateButton>
                            <Button disableElevation disabled={processing} fullWidth size="large" type="submit" variant="contained" color="primary">
                                Login
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

AuthLogin.propTypes = { forgot: PropTypes.string };
