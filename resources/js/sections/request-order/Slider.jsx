// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

// project-imports
import Avatar from '@/components/@extended/Avatar';

// third-party
import Slider from 'react-slick';

// assets
import Avatar1 from '@/assets/images/users/avatar-1.png';
import Avatar2 from '@/assets/images/users/avatar-2.png';
import Avatar3 from '@/assets/images/users/avatar-3.png';
import Avatar4 from '@/assets/images/users/avatar-4.png';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

export default function AuthBackground() {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const usercomment = [
        {
            image: Avatar1,
            name: 'Rudeus Greyrat',
            designation: '@rudeusgreyrat',
            rating: 4,
            comment:
                'Sed ut perspiciatis unde omnis 👌 iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni 😍'
        },
        {
            image: Avatar2,
            name: 'Perugius Dola',
            designation: '@perugiusdola',
            rating: 3,
            comment:
                'dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis'
        },
        {
            image: Avatar3,
            name: 'Roxy Migurdia',
            designation: '@roxymigurdia',
            rating: 5,
            comment:
                'suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur Quis autem vel eum iure reprehenderit qui in ea voluptate vel illum qui dolorem eum fugiat'
        },
        {
            image: Avatar4,
            name: 'Orsted Frey',
            designation: '@orstedfrey',
            rating: 4,
            comment:
                'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum'
        }
    ];
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                '&:before': {
                    content: `" "`,
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: 'linear-gradient(338deg, rgba(0, 0, 0, 0.3), transparent)'
                }
            }}
        >
            <Box
                sx={{
                    width: 500,
                    m: '0 auto',
                    color: 'common.white',
                    '& .slick-dots': {
                        bottom: '-45px',
                        '& li': {
                            width: 'auto',
                            margin: 0,
                            '& button': {
                                width: 'auto',
                                '&:before': {
                                    position: 'relative',
                                    display: 'inline-block',
                                    content: '""',
                                    width: 6,
                                    height: 6,
                                    borderRadius: 1,
                                    bgcolor: 'common.white'
                                }
                            },
                            '&.slick-active button:before': { width: 30 }
                        }
                    }
                }}
            >
                <Slider {...settings}>
                    {usercomment.map((item, index) => (
                        <Box key={index} sx={{ width: '100%', textAlign: 'center' }}>
                            <Grid container spacing={3} direction="column">
                                <Grid item>
                                    <Avatar alt="User 1" src={item.image} variant="circular" size="lg" sx={{ m: '0 auto' }} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5">{item.name}</Typography>
                                    <Typography variant="body2">{item.designation}</Typography>
                                </Grid>
                                <Grid item>
                                    <Rating name="disabled" value={item.rating} readOnly />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">{item.comment}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                </Slider>
            </Box>
        </Box>
    );
}
