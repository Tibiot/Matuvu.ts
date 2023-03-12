import {type ChatInputCommandInteraction, Client} from 'discord.js';

import {SlashCommandBuilder, type CommandInteraction, ButtonBuilder, ButtonStyle, EmbedBuilder, ActionRowBuilder} from 'discord.js';
import TicTacToe from 'discord-tictactoe';
import {type SlashCommand} from '../../types';
const game = new TicTacToe({language: 'fr'});

export const morpions: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName('morpion')
		.setDescription('Affiche l\'image de ton profile discord.')
		.addUserOption(option =>
			option.setName('opponent')
				.setDescription('Sélectionnez l\'utilisateur')
				.setRequired(false),
		) as SlashCommandBuilder,

	async execute(interaction: CommandInteraction) {
		if (interaction.isChatInputCommand()) {
			game.handleInteraction(interaction);
		}
	},
};
