import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ModeleComponent } from './modele.component';
import { ModeleDetailComponent } from './modele-detail.component';
import { ModelePopupComponent } from './modele-dialog.component';
import { ModeleDeletePopupComponent } from './modele-delete-dialog.component';

export const modeleRoute: Routes = [
    {
        path: 'modele',
        component: ModeleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'memeGeneratorApp.modele.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'modele/:id',
        component: ModeleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'memeGeneratorApp.modele.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const modelePopupRoute: Routes = [
    {
        path: 'modele-new',
        component: ModelePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'memeGeneratorApp.modele.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'modele/:id/edit',
        component: ModelePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'memeGeneratorApp.modele.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'modele/:id/delete',
        component: ModeleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'memeGeneratorApp.modele.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
