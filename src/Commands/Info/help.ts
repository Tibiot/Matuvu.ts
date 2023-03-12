import {type SlashCommand} from './../../types';
import {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, type CommandInteraction, GatewayIntentBits, type GuildMember} from 'discord.js';

export const help: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Information sur le bot !'),
	async execute(interaction: CommandInteraction) {
		const {channel, options, member} = interaction;
		const cible = interaction.member as GuildMember;
		const userImage = cible?.displayAvatarURL({size: 4096, forceStatic: false});

		const gamemoji = "<a:3201discordblobhold:1081916786951331891> "
		const adminemoji = "<a:8223blobragequit:1081914911157915669>"
		const bientotemoji = "<a:1679ablobsweating:1081920386511421560>"
		const classiqueemoji = "<a:9333winkingblob1:1081921750071259187>"
		const funemoji = "<a:3898bloblewoble:1081928153037033514>"
  

		const embed = new EmbedBuilder()
		.setColor("Aqua")
		.setAuthor({name: `Voici les commandes   ${cible.user.username} ! \n ` })
		.setDescription(`Comment ça marche ? \nToute les commandes sont en slash commande avec description pour savoir sa fonction. Par exemple: /Matuvu\n‎`)
		.setImage("https://cdn.discordapp.com/attachments/726877677293797416/1081925689785188422/Capture_decran_20230305_140606.png")
		.setThumbnail("https://cdn.discordapp.com/attachments/726877677293797416/1081922799171551373/1062413657381818398.webp")
		.addFields(
		  { name:  `${classiqueemoji} ** Info **`, value:  ` \`Matuvu\`  \`Profil\` `  , inline: true },
		  { name:  ` ${gamemoji} **Admin**`, value: `\`Clear\`  \`Counting système\`  \`Update\` `, inline: false },
		  { name:  ` ${funemoji} **Fun**`, value: ` \`Rip\`  \`Shit\` \`Slap\` \`Trigger\` \`Wanted\` `, inline: false },
		  { name:  `${adminemoji} ** Mini jeux **`, value: ` \`Morpion\`  \`Slot\`  \`Démineur\`  \`Pokémon\`  \`Counting\` `, inline: false },
		  { name: ` ${bientotemoji} **Bientôt**`, value: ` \`Rank\`  \`Leaderboard\`\n` , inline: false },
		)
		await interaction.reply({embeds: [embed]});

		// Code
	},
};

