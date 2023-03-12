'use strict';

import {type Client, type Message, type TextChannel} from 'discord.js';
import {User, Guild} from '../Models';
import {type User as UserModel} from '../types';

export default (client: Client) => {
	const userDb = new User();
	const guildDb = new Guild();

	client.on('messageCreate', async (message: Message) => {
		const {author, guild} = message;

		if (!guild || author.bot) {
			return;
		}

		const actualGuild = await guildDb.getByGuildId(guild.id);
		if (!actualGuild) {
			return;
		}

		const actualUser: UserModel | undefined = await userDb.getOne(actualGuild.id ?? -1, author.id) ?? await userDb.create({
			clientId: author.id,
			guildId: actualGuild.id ?? -1,
			levels: 0,
			xp: 0,
			roles: [],
			guild: {
				guildId: actualGuild.guildId,
				users: actualGuild.users,
			},
		}) as unknown as UserModel | undefined;

		if (!actualUser) {
			return;
		}

		const give = Math.floor(Math.random() * 29) + 1;

		const requiredXp = (actualUser.levels * actualUser.levels * 100) + 100;

		if (actualUser.xp + give >= requiredXp) {
			actualUser.levels += 1 as number;

			(message.channel as TextChannel).send({
				content: `INCROYABLE tu passe au niveau supérieur ${actualUser.levels}!`,
			}).catch((e: Error) => {
				console.log(e);
			});
		}

		actualUser.xp += give;

		userDb.update(actualUser, actualUser.id!).catch((e: Error) => {
			console.log(e);
		});
	});
};
