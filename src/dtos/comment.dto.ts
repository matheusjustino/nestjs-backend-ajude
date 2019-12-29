import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CommentDto {
    @IsString()
    @IsNotEmpty()
    readonly owner: string;

    @IsString()
    @IsNotEmpty()
    readonly text: string

    @IsArray()
    responses: []
}