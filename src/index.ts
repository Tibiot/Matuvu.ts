import {Client, GatewayIntentBits} from 'discord.js';
import * as dotenv from 'dotenv';
import {User} from './Models';
import commands from './Commands';

import {events} from './Events';

console.log('Bot is stating...');
dotenv.config();

const token = process.env.TOKEN;

if (!token) {
	throw new Error('please give me a valid token');
}

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
	],
});


Object.entries(events).forEach(event_args => {
	const [name, func] = event_args;
	func(client);

	console.log(`${name} is loaded`);
});

commands(client, token).catch((e: Error) => {
	console.log(e.message);
});

client.login(token).catch((e: Error) => {
	console.log(e.message);
});

