import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class UserDto {
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly creditCard: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsArray()
    @IsNotEmpty()
    campaingsThatHelped: Array<any>;
}