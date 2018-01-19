import { BaseEntity } from './../../shared';

export const enum TypeGen {
    'Longest',
    'Random'
}

export class Video implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public url?: string,
        public typeGen?: TypeGen,
        public modele?: BaseEntity,
    ) {
    }
}
