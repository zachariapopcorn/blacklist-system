const db = require('../db.js');

exports.run = async (client, message, args) => {
    if(message.author.id != "465362236693807115") {
        return message.channel.send("I'm sorry, but you don't have the correct permissions to execute this command!");
    }
    let data
    try {
        data = await db.get("blacklisted");
    } catch (err) {
        console.log('There was an error: ' + err);
    }
    if(data == null) {
        data = [];
    }
    if(!args[0]) {
        return message.channel.send("Pleae mention a user to blacklist!");
    }
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    data.push(user.id);
    try {
        await db.set("blacklisted", data);
    } catch (err) {
        console.log('There was an error while adding this user to the blacklist: '  + err);
        return message.channel.send("There was an error while adding this user to the blacklist!");
    }
    return message.channel.send("Successfully added user to blacklist database!");
}

exports.help = (client, message, args) => {
    message.channel.send({embed: {
        color: 7948427,
        description: `**Blacklist**\n`
        + `\`${client.config.prefix}blacklist <user>\` - Blacklists a user from using the bot, sadly only the owner of the bot can use this.`,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        }
    }});
}