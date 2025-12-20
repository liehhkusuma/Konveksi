import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from '@/components/MainCard';
import IconButton from '@/components/@extended/IconButton';
import SimpleBar from '@/components/third-party/SimpleBar';
import MessageCard from '@/components/cards/statistics/MessageCard';
import { ThemeMode } from '@/config';

// assets
import { Add, NotificationStatus } from 'iconsax-react';

import message1 from '@/assets/images/widget/message/message1.svg';

// ==============================|| HEADER CONTENT - CUSTOMIZATION ||============================== //

export default function Customization() {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };

    const iconBackColorOpen = theme.palette.mode === ThemeMode.DARK ? 'background.paper' : 'secondary.200';
    const iconBackColor = theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'secondary.100';

    return (
        <>
            <Box sx={{ flexShrink: 0, ml: 0.75 }}>
                <IconButton
                    color="secondary"
                    variant="light"
                    onClick={handleToggle}
                    aria-label="settings toggler"
                    size="large"
                    sx={{ color: 'secondary.main', bgcolor: open ? iconBackColorOpen : iconBackColor, p: 1 }}
                >
                    <NotificationStatus variant="Bulk" />
                </IconButton>
            </Box>
            <Drawer sx={{ zIndex: 2001 }} anchor="right" onClose={handleToggle} open={open} PaperProps={{ sx: { width: { xs: 350, sm: 474 } } }}>
                {open && (
                    <MainCard content={false} sx={{ border: 'none', borderRadius: 0, height: '100vh' }}>
                        <SimpleBar
                            sx={{
                                '& .simplebar-content': {
                                    display: 'flex',
                                    flexDirection: 'column'
                                }
                            }}
                        >
                            <Box sx={{ p: 2.5 }}>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1.5}>
                                    <Typography variant="h5">What’s new announcement?</Typography>
                                    <IconButton color="secondary" sx={{ p: 0 }} onClick={handleToggle}>
                                        <Add size={28} style={{ transform: 'rotate(45deg)' }} />
                                    </IconButton>
                                </Stack>
                                <Grid container spacing={1.5} sx={{ mt: 2 }}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">Today</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MessageCard
                                            status={{ label: 'New Feature', color: 'success' }}
                                            time="just now"
                                            title="Select Business Unit"
                                            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
                                            src={message1}
                                            actions={[
                                                {
                                                    label: 'Skip Intro',
                                                    button: { variant: 'outlined', color: 'secondary', fullWidth: true }
                                                },
                                                {
                                                    label: 'Next',
                                                    button: { variant: 'contained', fullWidth: true }
                                                }
                                            ]}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MessageCard
                                            status={{ label: 'Meeting', color: 'warning' }}
                                            time="2 min ago"
                                            title="General Meeting"
                                            message="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque"
                                            src={message1}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ my: 1.25 }}>
                                        <Typography variant="h6">Yesterday</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MessageCard
                                            status={{ label: 'Improvement', color: 'primary' }}
                                            time="2 hours ago"
                                            title="Asset Movement"
                                            message="quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo"
                                            src={message1}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MessageCard
                                            status={{ label: 'Improvement', color: 'primary' }}
                                            time="1 day ago"
                                            title="Vendor Update"
                                            message="laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure"
                                            src={message1}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </SimpleBar>
                    </MainCard>
                )}
            </Drawer>
        </>
    );
}
