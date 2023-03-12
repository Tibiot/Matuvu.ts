import { type Client, GuildMember, Message, TextChannel, AttachmentBuilder } from 'discord.js';
import { Canvas } from "discord-canvas";


export default (client: Client) => {
	client.on('guildMemberAdd', async (member: GuildMember) => {


	    const { user, guild } = member;
		const channel = member.guild.channels.cache.get("1084218400072532119")

		if (!channel) {
			console.log(channel)
			return
		}


		const image = await new Canvas.Welcome()
		.setUsername(`${ user }`)
		.setDiscriminator(`${user.tag}`)
		.setMemberCount("140")
		.setGuildName("Server DEV")
		.setAvatar(user.displayAvatarURL())
		.setColor("border", "#8015EA")
		.setColor("username-box", "#8015EA")
		.setColor("discriminator-box", "#8015EA")
		.setColor("message-box", "#8015EA")
		.setColor("title", "#8015EA")
		.setColor("avatar", "#8015EA")
		.toAttachment();
		const channelText = channel as TextChannel


		const attachment = new AttachmentBuilder(image.toBuffer(), "goodbyeimage.png");

		channelText.send({ files: [image] });



		


	});
};
