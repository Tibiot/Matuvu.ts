import {type SlashCommand} from './../../types';
import {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, type CommandInteraction} from 'discord.js';

export const matuvu: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName('matuvu')
		.setDescription('matuvu cette Description ! '),
	async execute(interaction: CommandInteraction) {
		const youtube = '<:youtube:1078677718364848230>';
		const twicth = '<:twitch:1078677741785854152>';
		const twitter = '<:twitter:1078677730666745876> ';
		const instagram = '<:instagram:1078678540809150564> ';
		const tikTok = '<:tiktok:1078677686177775757> ';

		const embedr = new EmbedBuilder()
			// eslint-disable-next-line @typescript-eslint/naming-convention
			.setAuthor({name: 'Matuvu', iconURL: 'https://cdn.discordapp.com/avatars/456899782800179211/b968a98ad9b755cacb4465020c972290.webp?size=4096'})
			.setThumbnail('https://cdn.discordapp.com/attachments/726877677293797416/1078675828830912623/1061703967857463477.gif')
			.setColor('Aqua')
			.setDescription(

				`

À propos de Matuvu:

Mathieu, Vidéaste et Streamer de 19 Ans, sous le pseudonyme de « Matuvu », à commencer les vidéos en 2018, sur sa chaîne YouTube : « Matuvu » à l’époque son pseudo était « SkyRoush »  c’est en 2019 que le pseudonyme est changé par « Matuvu » pseudonyme inspiré de MaxEstLa.

En Avril 2020, Matuvu se lance sur Twitch, peut après il fera une pause de 2 ans, puis 1,5 ans sur YouTube.
En 2022 Matuvu reprend les Streams, ainsi que les vidéos !

Les vidéos de Matuvu sont des vidéos humoristiques qui raconte un fait-divers, anecdotes, etc

	`,

			)
			.addFields(
				{name: `${youtube} Youtube`, value: '[Matuvu](https://www.youtube.com/channel/UC9kUMA1K_nXrbi_QTMHvbNw)', inline: true},
				{name: `${youtube} Youtube`, value: '[Matuvu ou pas ?](https://www.youtube.com/channel/UCgeYtxExXOw4_mwTGXpwAVA)', inline: true},
				{name: `${twicth} Twicth`, value: '[MatuvuLive](https://www.twitch.tv/matuvulive)', inline: true},
				{name: `${twitter} Twitter`, value: '[Matuvu](https://twitter.com/matuvuoupas)', inline: true},
				{name: `${instagram} Instagram`, value: '[matuvuoupas](https://www.instagram.com/matuvuoupas/)\n‎ ', inline: true},
				{name: `${tikTok} TikTok`, value: '[matuvuoupas](https://www.tiktok.com/@matuvuoupas)', inline: true},

			)

		const actionRow = new ActionRowBuilder();
		const button = new ButtonBuilder()
			.setLabel('Dernière vidéo Youtube').setStyle(ButtonStyle.Link)
			.setURL('https://www.youtube.com/watch?v=v9lhHpTuOjM')
			.setEmoji(youtube);

		actionRow.addComponents(button);

		const buttonReponse = await interaction.reply({
			embeds: [
				embedr,
			],
			components: [
				actionRow as any,
			],
		});

	},
};
