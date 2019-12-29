import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';

import { systemCredentials } from '../config/configs';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    private readonly systemEmail = systemCredentials.email;

    welcomeEmail(emailUser: string, firstNameUser: string, lastNameUser: string): void {
        Logger.log("Enviando email de boas-vidas", "EmailService");

        this.mailerService.sendMail({
            to: emailUser,
            from: this.systemEmail,
            subject: 'Welcome Email',
            text: `Hello ${firstNameUser} ${lastNameUser}! Thank you for your registration ✔.`
        })
        .then(res => {
            console.log(res);
            Logger.log("Email de boas-vindas enviado", "EmailService");
        })
        .catch(error => {
            console.log(error);
            Logger.error("Erro ao tentar enviar o email de boas-vindas", "EmailService");
        });
    }
}
