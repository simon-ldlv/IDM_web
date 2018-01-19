import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Modele } from './modele.model';
import { ModelePopupService } from './modele-popup.service';
import { ModeleService } from './modele.service';

@Component({
    selector: 'jhi-modele-delete-dialog',
    templateUrl: './modele-delete-dialog.component.html'
})
export class ModeleDeleteDialogComponent {

    modele: Modele;

    constructor(
        private modeleService: ModeleService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.modeleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'modeleListModification',
                content: 'Deleted an modele'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-modele-delete-popup',
    template: ''
})
export class ModeleDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private modelePopupService: ModelePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modelePopupService
                .open(ModeleDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
