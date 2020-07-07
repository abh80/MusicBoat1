const Command = require("../../Base/Command");
const req = require("request")


class Surround extends Command {
  constructor(client) {
    super(client, {
      name: "surround",
      description: "Creates surround sound effect",
      aliases: ["sr","srd"],
      usage: ["surround"]
    });
  }

  async execute(message, args, Discord) {
    const DBL = require("dblapi.js"); 
    const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwMjkwNTY3MzUyNDA1MTk4OCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTkyMjg1OTI1fQ.jyvST4A5Ts82jGPTaw4opUj1IHFfBjtFdo2Khpoo9aY', this.client); 
   let voted = await dbl.hasVoted(message.author.id)
      if(!voted){
        let noembed = new Discord.MessageEmbed()
        .setDescription("The command is **VOTELOCKED** please vote the bot on [top.gg](https://top.gg/bot/702905673524051988/vote) to continue")
        .setColor("#00ffee")
      return  message.channel.send(noembed)
      }
        


    let queue = this.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("❌ | I'm not playing anything?");
    if (!message.member.voice.channel)
      return message.channel.send(`❌ | You're not in a voice channel!`);
    if (
      queue &&
      message.guild.me.voice.channel.id !== message.member.voice.channel.id
    )
      return message.channel.send(`❌ | You're not in my voice channel!`);
    queue.sorround = !queue.sorround;
    handle(message.guild, this.client, queue);
    return message.channel.send(
      queue.sorround
        ? "Sorround effect enabled!"
        : "Sorround effect disabled!"
    );
  }
}

function handle(guild, client, queue) {
  return client.player.play(
    guild,
    queue.songs[0],
    queue.dispatcher.streamTime / 1.6
  );
}

module.exports = Surround;
