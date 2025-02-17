import { AlertMessage, Sponsor } from '@/types';

export const alerts: AlertMessage[] = [
    {
        id: 'twitter-connect',
        type: 'warning',
        message: 'Connect your X account to unlock all features',
        isCloseable: false,
    },
    {
        id: 'new-feature',
        type: 'info',
        message: 'New: Advanced analytics now available!',
        isCloseable: true,
    },
];

export const currentSponsor: Sponsor = {
    id: 'binance',
    name: 'Binance',
    logo: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?q=80&w=100&auto=format',
    message: 'Trade with confidence on the world\'s largest crypto exchange',
    link: 'https://binance.com',
};