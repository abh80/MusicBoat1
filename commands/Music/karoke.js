const Command = require("../../Base/Command");

class Karoke extends Command {
    constructor(client) {
        super(client, {
            name: "karoke",
            description: "Creates karoke effect",
            aliases: ['ka'],
            usage: ["ka"]
        })
    }

    async execute(message, args, Discord) {
        let queue = this.client.queue.get(message.guild.id);
        if (!queue) return message.channel.send("No song is currently being played");
        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel!`);
        if (queue && message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send(`You're not in my voice channel!`);
        queue.karoke = !queue.karoke;
        handle(message.guild, this.client, queue);
	return message.channel.send(queue.karoke ? "Karoke effect enabled!" : "Karoke effect disabled!");
    }
}

function handle(guild, client, queue) {
  return client.player.play(guild,queue.songs[0], queue.dispatcher.streamTime)
}

module.exports = Karoke;