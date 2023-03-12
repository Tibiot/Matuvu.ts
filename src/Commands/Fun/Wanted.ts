
import { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder, ComponentAssertions, CommandInteraction, Attachment, GuildMember } from 'discord.js';
import { SlashCommand } from '../../types';

export const wanted: SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Affiche de recherche ")
    .addUserOption(option =>
        option.setName('utilisateur')
        .setDescription('Sélectionnez l\'utilisateur')
        .setRequired(false)
        ) as SlashCommandBuilder,

    async execute(interaction: CommandInteraction) {

        
        const target: GuildMember = (interaction.options.getUser("utilisateur") || interaction.member) as GuildMember

        const avatar = target.displayAvatarURL()

        const embed = new EmbedBuilder()
			.setColor('Aqua')
            .setTitle("Avatar")
            .setImage(avatar)
            .setColor("Random")

        if (!avatar) {
            interaction.reply("...")
            return 
        }

await interaction.reply({ embeds : [embed] })



    // code
    }
};

