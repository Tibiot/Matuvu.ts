import {type SlashCommand} from '../../types';
import {SlashCommandBuilder, AttachmentBuilder, EmbedBuilder, type CommandInteraction, type Role, type SlashCommandUserOption} from 'discord.js';
import {profileImage} from 'discord-arts';


export const profil: SlashCommand = {
	command: new SlashCommandBuilder()
	.setName('profil')
	.setDescription('affiche les imformations d\'un profil discord !')
	.addUserOption((options: SlashCommandUserOption) => options.setName('utilisateur')
		.setDescription('Sélectionnez l\'utilisateur ')
		.setRequired(true)) as SlashCommandBuilder,

	async execute(interaction: CommandInteraction) {
		// Code
		const {client} = interaction;

		await interaction.deferReply();

		const target = interaction.options.getUser('utilisateur');

		if (!target) {
			return;
		}

		const member = interaction.guild?.members.cache.get(target.id);
		const {tag} = interaction.user;

		const maxDisplayRoles = (roles: Role[], maxFieldLength = 1024) => {
			let totallength = 0;
			const result = [];

			for (const role of roles) {
				const roleStrings = `<@${role.id}>`;

				if (roleStrings.length + totallength > maxFieldLength) {
					break;
				}

				totallength += roleStrings.length + 1;
				result.push(roleStrings);
			}

			return result.length;
		};

		const buffer = await profileImage(target?.id ?? '', {

			overwriteBadges: true,
			borderColor: ['#841821', '#015b58'],
			presenceStatus: 'dnd',
			squareAvatar: true,

		});
		if (member) {
			const embed2 = new EmbedBuilder()

				// eslint-disable-next-line @typescript-eslint/naming-convention
				.setAuthor({name: '‎', iconURL: target.displayAvatarURL()})
				.setColor('#660f0f')
				.setImage(target.bannerURL({forceStatic: false, size: 1024}) ?? '')
				.addFields(
					{name: '🪪 Pseudo ?', value: ` \`${tag}\` `, inline: false},
					{name: '🆔 ID', value: `\`${client.user.id}\``, inline: false},
					{name: '⏰ Profil discord crée', value: `<t:${parseInt(member.user.createdAt.toUTCString(), 10) / 1000}:R>`, inline: false},
					{name: ' 🚪 Rejoint le serveur ', value: `<t:${parseInt(member.joinedAt?.toUTCString() ?? '', 10) / 1000}:R>`, inline: false},
					{name: ' 📑 Rôles', value: `${member?.roles.cache.map(r => r).join('')}`, inline: false},

				);
			const attachment = new AttachmentBuilder(buffer, {name: 'profile.png'});
			interaction.followUp({files: [attachment], embeds: [embed2]}).catch((e: Error) => {
				console.log(e);
			});
		}
	},

};
