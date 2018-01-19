import { BaseEntity } from './../../shared';

export class Modele implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public path?: string,
    ) {
    }
}
