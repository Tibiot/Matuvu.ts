import {type SlashCommand} from './../../types';
import {SlashCommandBuilder, EmbedBuilder, type CommandInteraction} from 'discord.js';
import {User as UserModel, Guild as GuildModel} from '../../Models';

export const leaderboard: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Obtenez le classement des 10 utilisateurs ayant le plus Xp'),
	async execute(interaction: CommandInteraction) {
		const {guild, member} = interaction;
		const userDb = new UserModel();
		const guildDb = new GuildModel();
		let text = '';

		const guildIn = await guildDb.getByGuildId(guild?.id ?? '');
		const data = guildIn?.users.sort((a, b) => {
			if (a.xp > b.xp && a.levels > b.levels) {
				return 1;
			}

			if (a.xp === b.xp && a.levels === b.levels) {
				return 0;
			}

			return -1;
		}).slice(0, 10);

		if (!data) {
			return interaction.reply('Personnes sur le leaderboard !');
		}

		await interaction.deferReply();

		for (let counter = 0; counter < data.length; ++counter) {
			const {clientId, xp, levels = 0} = data[counter];

			const member = guild?.members.cache.get(clientId);

			let memberTag;

			if (member) {
				memberTag = member.user.tag;
			} else {
				memberTag = '...';
			}

			const shortxp = shorten(xp);

			text += `${counter + 1}. ${memberTag} | XP: ${shortxp} | Level: ${levels}\n `;
		}

		interaction.editReply({
			embeds: [
				new EmbedBuilder()
					.setColor('Aqua')
					.setDescription(`\`\`\` ${text} \`\`\``),
			],
		}).catch((e: Error) => {
			console.log(e.message);
		});
	}, // The level table in the database is automatically created
};

function shorten(count: number) {
	const abbrs = ['', 'k', 'M', 'T'];

	const i = count === 0 ? count : Math.floor(Math.log(count) / Math.log(1000));

	const result = `${parseFloat(((count / 1000) ** i).toFixed(2)).toString()}${abbrs[i]}`;

	return result;
}
