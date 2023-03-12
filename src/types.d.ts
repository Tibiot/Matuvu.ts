import {type AutocompleteInteraction, type CommandInteraction, type SlashCommandBuilder, type Collection, type Message, type PermissionResolvable} from 'discord.js';
import {type Client} from 'discord.js';

export type SlashCommand = {
	command: SlashCommandBuilder;
	execute: (interaction: CommandInteraction) => void;
	autocomplete?: (interaction: AutocompleteInteraction) => void;
	cooldown?: number; // In seconds
};

export type Command = {
	name: string;
	execute: (message: Message, args: string[]) => void;
	permissions: PermissionResolvable[];
	aliases: string[];
	cooldown?: number;
};

export type User = {
	id?: number;
	clientId: string;
	guildId: number;
	guild: Guild;
	levels: number;
	xp: number;
	roles: UserRoles[];

};

export type Guild = {
	id?: number;
	guildId: string;
	users: User[];
};

export type Role = {
	id?: number;
	name: string;
	user: UserRoles[];
};

export type UserRoles = {
	user: User;
	userId: number;
	role: Role;
	roleId: number;
};
