import { IsString, IsNotEmpty } from 'class-validator';

export class ResponseDto {
    @IsString()
    @IsNotEmpty()
    readonly owner: string;

    @IsString()
    @IsNotEmpty()
    readonly text: string
}