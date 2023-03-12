import {User, type Guild as GuildModel} from '../types';
import {PrismaClient} from '@prisma/client';


export class Guild extends PrismaClient {
	async getByGuildId(guildId: string) {
		return await this.guild.findFirst({
			where: {
				guildId,
			},
			include: {
				users: true,
			},
		}) as GuildModel | undefined;
	}
}
