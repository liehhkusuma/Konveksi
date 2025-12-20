// import '../css/app.css';
import './bootstrap';

// fonts
import '@/assets/fonts/inter/inter.css';
import '@/assets/fonts/helvetica/helvetica.css';

// scroll bar
import 'simplebar/dist/simplebar.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// google-fonts
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/700.css';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/500.css';
import '@fontsource/public-sans/600.css';
import '@fontsource/public-sans/700.css';


import { ConfigProvider } from '@/contexts/ConfigContext';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import ThemeCustomization from '@/themes';
import Notistack from '@/components/third-party/Notistack';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const page = (await resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        )).default;

        page.layout = page.layout || ((page) => <ThemeCustomization>{page}</ThemeCustomization>);

        return page;
    },
    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            hydrateRoot(el, <ThemeCustomization>
                <App {...props} />
            </ThemeCustomization>);
            return;
        }

        createRoot(el).render(
            <ThemeCustomization>
                <App {...props} />
            </ThemeCustomization>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
