// third-party
// import { FormattedMessage } from 'react-intl';

// assets
import { I24Support, MessageProgramming } from 'iconsax-react';

// type

// icons
// icons
const icons = {
    maintenance: MessageProgramming,
    contactus: I24Support
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages = {
    id: 'group-pages',
    title: 'pages',
    type: 'group',
    children: [
        {
            id: 'maintenance',
            title: 'maintenance',
            type: 'collapse',
            icon: icons.maintenance,
            children: [
                {
                    id: 'error-404',
                    title: 'error-404',
                    type: 'item',
                    url: '/maintenance/404',
                    target: true
                },
                {
                    id: 'error-500',
                    title: 'error-500',
                    type: 'item',
                    url: '/maintenance/500',
                    target: true
                },
                {
                    id: 'coming-soon',
                    title: 'coming-soon',
                    type: 'item',
                    url: '/maintenance/coming-soon',
                    target: true
                },
                {
                    id: 'under-construction',
                    title: 'under-construction',
                    type: 'item',
                    url: '/maintenance/under-construction',
                    target: true
                }
            ]
        },
        {
            id: 'contact-us',
            title: 'contact-us',
            type: 'item',
            url: '/contact-us',
            icon: icons.contactus,
            target: true
        }
    ]
};

export default pages;
