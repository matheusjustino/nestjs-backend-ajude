import { ExecutionContext, Injectable, CanActivate, Logger, UnauthorizedException } from '@nestjs/common';
import { IRequest } from '../../interfaces/irequest.interface';
import { CampaingService } from '../../campaing/campaing.service';

@Injectable()
export class IsCampaingOwner implements CanActivate {
    constructor(private readonly campaingService: CampaingService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const req: IRequest = context.switchToHttp().getRequest();

            Logger.log("Buscando dono da campanha", "IsCampaingOwner");

            const { owner } = await this.campaingService.getCampaingByUrl(req.params.url);

            if (owner != req.user.id) {

                throw new UnauthorizedException("Você não tem permissão");
            }

            return true;
        } catch (error) {
            Logger.error("Usuário sem permissão para esta ação", "IsCampaingOwner");

            throw new UnauthorizedException("Você não tem permissão");
        }
    }
}