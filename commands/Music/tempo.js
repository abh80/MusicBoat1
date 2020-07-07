const Command = require("../../Base/Command");

class Tempo extends Command {
    constructor(client) {
        super(client, {
            name: "tempo",
            description: "Sets tempo according to user",
            aliases: ["tm"],
            usage: ["tempo"]
        })
    }

    async execute(message, args, Discord) {
        let queue = this.client.queue.get(message.guild.id);
        if (!queue) return message.channel.send("No song is currently being played");
        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel!`);
      if(!args[0])return
        let amt = args[0]
        if (queue && message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send(`You're not in my voice channel!`);
        if(args[0]=== "default")amt = 100
        
      queue.tempo = amt
      handle(message.guild, this.client, queue);
      message.channel.send(`Changed the tempo to ${amt}`)
	
    }
}

function handle(guild, client, queue) {
  return client.player.play(guild,queue.songs[0], queue.dispatcher.streamTime)
}

module.exports = Tempo;