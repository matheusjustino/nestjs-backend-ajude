import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CampaingDto {
    @IsString()
    @IsNotEmpty()
    readonly shortName: string;

    @IsString()
    @IsNotEmpty()
    url: string

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string

    @IsString()
    @IsNotEmpty()
    deadline: string

    @IsNumber()
    @IsNotEmpty()
    goal: number

    @IsNumber()
    @IsNotEmpty()
    amountCollected: number

    @IsArray()
    @IsNotEmpty()
    donors: Array<any>

    @IsString()
    @IsNotEmpty()
    owner: string

    @IsArray()
    @IsNotEmpty()
    comments: Array<any>

    @IsNumber()
    @IsNotEmpty()
    totalLikes: number

    @IsNumber()
    @IsNotEmpty()
    totalDislikes: number

    @IsArray()
    @IsNotEmpty()
    likesAndDislikes: Array<any>
}