import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Modele } from './modele.model';
import { ModeleService } from './modele.service';

@Component({
    selector: 'jhi-modele-detail',
    templateUrl: './modele-detail.component.html'
})
export class ModeleDetailComponent implements OnInit, OnDestroy {

    modele: Modele;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private modeleService: ModeleService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInModeles();
    }

    load(id) {
        this.modeleService.find(id).subscribe((modele) => {
            this.modele = modele;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInModeles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'modeleListModification',
            (response) => this.load(this.modele.id)
        );
    }
}
