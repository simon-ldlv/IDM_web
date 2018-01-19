import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Modele } from './modele.model';
import { ModelePopupService } from './modele-popup.service';
import { ModeleService } from './modele.service';

@Component({
    selector: 'jhi-modele-dialog',
    templateUrl: './modele-dialog.component.html'
})
export class ModeleDialogComponent implements OnInit {

    modele: Modele;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private modeleService: ModeleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.modele.id !== undefined) {
            this.subscribeToSaveResponse(
                this.modeleService.update(this.modele));
        } else {
            this.subscribeToSaveResponse(
                this.modeleService.create(this.modele));
        }
    }

    private subscribeToSaveResponse(result: Observable<Modele>) {
        result.subscribe((res: Modele) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Modele) {
        this.eventManager.broadcast({ name: 'modeleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-modele-popup',
    template: ''
})
export class ModelePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private modelePopupService: ModelePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modelePopupService
                    .open(ModeleDialogComponent as Component, params['id']);
            } else {
                this.modelePopupService
                    .open(ModeleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
