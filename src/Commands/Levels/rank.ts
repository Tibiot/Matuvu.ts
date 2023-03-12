import {type SlashCommand} from './../../types';

import {SlashCommandBuilder, type CommandInteraction, ButtonBuilder, ButtonStyle, EmbedBuilder, ActionRowBuilder} from 'discord.js';
import {Canvas} from 'canvacord';

export const rank: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName('rank')
		.setDescription('rank')
		.addUserOption(option =>
			option.setName('utilisateur')
				.setDescription('Sélectionnez l\'utilisateur')
				.setRequired(false),
		) as SlashCommandBuilder,

	async execute(interaction: CommandInteraction) {

		// Code
	},
};

