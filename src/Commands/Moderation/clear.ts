import {type Message, type TextChannel} from 'discord.js';
import {SlashCommandBuilder, type CommandInteraction, PermissionFlagsBits, EmbedBuilder, StageChannel} from 'discord.js';
import {type SlashCommand} from '../../types';

export const clear: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Effacer un nombre spécifique de messages d\'un utilisateur ou d\'un salon.')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)

		.addIntegerOption(option =>
			option.setName('montant')
				.setDescription('Nombre de messages à effacer.')
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(99),

		)
		.addUserOption(option =>
			option.setName('utilisateur')
				.setDescription('Sélectionnez l\'utilisateur pour effacer ses messages.')
				.setRequired(false),
		) as SlashCommandBuilder,

	async execute(interaction: CommandInteraction) {
		const {channel, options} = interaction;

		const amount = options.get('montant')?.value as number ?? 0;
		const target = options.getUser('utilisateur');

		const messages = await (channel as TextChannel)?.messages.fetch({
			limit: amount + 1,
		});

		const res = new EmbedBuilder()
			.setColor(0x5fb041);

		if (target) {
			let i = 0;
			const filtered: Message[] = [];

			messages.forEach((msg: Message) => {
				if (msg.author.id === target.id && amount > i) {
					filtered.push(msg);
					i++;
				}
			});

			if (amount > 99) {
				return;
			}

			await (channel as TextChannel)?.bulkDelete(filtered).then(messages => {
				res.setDescription(`${messages.size} messages de ${target?.username} ont été supprimés avec succès.`);
				interaction.reply({embeds: [res]}).catch((e: Error) => {
					console.log(e.message);
				}); // You can use ephemeral if you desire
			});
		} else {
			await (channel as TextChannel)?.bulkDelete(amount, true).then(messages => {
				res.setDescription(`${messages.size} messages du salon ont été supprimés avec succès.`);
				interaction.reply({embeds: [res]}).catch((e: Error) => {
					console.log(e.message);
				});
			});
		}
	},

};
