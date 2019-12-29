import { ExecutionContext, Injectable, CanActivate, Logger, UnauthorizedException } from '@nestjs/common';
import { IRequest } from '../../interfaces/irequest.interface';
import { CampaingService } from '../../campaing/campaing.service';

@Injectable()
export class IsCommentOwner implements CanActivate {
    constructor(
        private readonly campaingService: CampaingService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const req: IRequest = context.switchToHttp().getRequest();

            Logger.log("Buscando comentários da campanha", "IsCommentOwner");

            const { comments } = await this.campaingService.getCampaingByUrl(req.params.url);

            const { idComment } = req.body;

            Logger.log("Filtrando comentários", "IsCommenOwner");

            const comment = comments.filter(comment => comment._id == idComment)[0];

            if (comment.owner != req.user.id) {
                
                throw new UnauthorizedException("Você não tem permissão");
            }
        
            return true;
        } catch (error) {
            Logger.error("Usuário sem permissão para esta ação", "IsCommentOwner");

            throw new UnauthorizedException(error.response.message);
        }
    }
}