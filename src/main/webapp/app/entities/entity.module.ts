import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MemeGeneratorVideoModule } from './video/video.module';
import { MemeGeneratorModeleModule } from './modele/modele.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        MemeGeneratorVideoModule,
        MemeGeneratorModeleModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MemeGeneratorEntityModule {}
