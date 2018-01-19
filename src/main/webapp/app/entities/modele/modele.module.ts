import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MemeGeneratorSharedModule } from '../../shared';
import {
    ModeleService,
    ModelePopupService,
    ModeleComponent,
    ModeleDetailComponent,
    ModeleDialogComponent,
    ModelePopupComponent,
    ModeleDeletePopupComponent,
    ModeleDeleteDialogComponent,
    modeleRoute,
    modelePopupRoute,
} from './';

const ENTITY_STATES = [
    ...modeleRoute,
    ...modelePopupRoute,
];

@NgModule({
    imports: [
        MemeGeneratorSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ModeleComponent,
        ModeleDetailComponent,
        ModeleDialogComponent,
        ModeleDeleteDialogComponent,
        ModelePopupComponent,
        ModeleDeletePopupComponent,
    ],
    entryComponents: [
        ModeleComponent,
        ModeleDialogComponent,
        ModelePopupComponent,
        ModeleDeleteDialogComponent,
        ModeleDeletePopupComponent,
    ],
    providers: [
        ModeleService,
        ModelePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MemeGeneratorModeleModule {}
