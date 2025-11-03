import { Routes } from '@angular/router';
import { CardPage } from './cards/pages/card-page/card-page';
import { PaymentPage } from './payments/pages/payment-page/payment-page';

export const routes: Routes = [
    {
        path: '',
        component: CardPage
    },
    {
        path: 'cards',
        component: CardPage
    },
    {
        path: 'payments',
        component: PaymentPage
    },
    {
        path: '**',
        redirectTo: ''
    }
];
