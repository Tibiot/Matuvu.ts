
import {type Command, type SlashCommand} from './../types';
import {type Client, Collection, REST, Routes, type SlashCommandBuilder, Events} from 'discord.js';
import interation from '../Events/interation';

type ColorType = 'text' | 'variable' | 'error';

const themeColors = {
	text: '#ff8e4d',
	variable: '#ff624d',
	error: '#f5426c',
};

const color = (color: ColorType, message: string): string => {
	const c = themeColors[color];
	return message;
};

export default async (client: Client, token: string) => {
	const commands = [
		import('./Fun'),
		import('./Levels'),
		import('./Info'),
		import('./Moderation'),
	];

	const commandsList = new Collection();

	const load = async () => {
		const slashCommands: SlashCommandBuilder[] = [];
		for await (const comm of commands) {
			Object.values(comm).map((c: SlashCommand | Command) => {
				if ((c as SlashCommand).command) {
					slashCommands.push((c as SlashCommand).command);
					commandsList.set((c as SlashCommand).command.name, c);
				}

				return undefined;
			}).filter(a => Boolean(a));
		}

		const rest = new REST({version: '10'}).setToken(token);

		const data: any[] = await rest.put(Routes.applicationCommands(process.env.CLIENT_ID ?? ''), {
			body: slashCommands
				.map(c => c.toJSON()),
		}) as any[];

		console.log(color('text', `🔥 Successfully loaded ${color('variable', data.length.toString())} slash command(s)`));
		console.log(color('text', `🔥 Successfully loaded ${color('variable', commands.length.toString())} command(s)`));
	};

	load().catch(e => {
		console.log(e.message);
	});

	client.on(Events.InteractionCreate, async interaction => {
		if (!interaction.isChatInputCommand()) {
			return;
		}

		const command: SlashCommand = commandsList.get(interaction.commandName) as SlashCommand;

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({content: 'There was an error while executing this command!', ephemeral: true});
			} else {
				await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
			}
		}
	});
};
