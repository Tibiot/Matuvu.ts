import {type Client, Interaction, MessageReaction} from 'discord.js';

export default (client: Client) => {
	client.on('interactionCreate', async interaction => {
		console.log(interaction);
	});
};
