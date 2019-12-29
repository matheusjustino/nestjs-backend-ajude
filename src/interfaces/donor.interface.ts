import { IDonate } from './donate.interface';

export interface IDonor {
    readonly user: string,
    totalDonated: number,
    donates: IDonate[]
}