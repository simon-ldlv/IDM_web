import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Modele } from './modele.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ModeleService {

    private resourceUrl = SERVER_API_URL + 'api/modeles';

    constructor(private http: Http) { }

    create(modele: Modele): Observable<Modele> {
        const copy = this.convert(modele);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(modele: Modele): Observable<Modele> {
        const copy = this.convert(modele);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Modele> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Modele.
     */
    private convertItemFromServer(json: any): Modele {
        const entity: Modele = Object.assign(new Modele(), json);
        return entity;
    }

    /**
     * Convert a Modele to a JSON which can be sent to the server.
     */
    private convert(modele: Modele): Modele {
        const copy: Modele = Object.assign({}, modele);
        return copy;
    }
}
