/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { MemeGeneratorTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ModeleDetailComponent } from '../../../../../../main/webapp/app/entities/modele/modele-detail.component';
import { ModeleService } from '../../../../../../main/webapp/app/entities/modele/modele.service';
import { Modele } from '../../../../../../main/webapp/app/entities/modele/modele.model';

describe('Component Tests', () => {

    describe('Modele Management Detail Component', () => {
        let comp: ModeleDetailComponent;
        let fixture: ComponentFixture<ModeleDetailComponent>;
        let service: ModeleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MemeGeneratorTestModule],
                declarations: [ModeleDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ModeleService,
                    JhiEventManager
                ]
            }).overrideTemplate(ModeleDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ModeleDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModeleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Modele(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.modele).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
