const Command = require("../../Base/Command");
const req = require("request")


class threeD extends Command {
  constructor(client) {
    super(client, {
      name: "3D",
      description: "Creates 3D effect",
      aliases: ["3d"],
      usage: ["3d"]
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
    if (!queue) return message.channel.send("❌ | I'm not playing anything KEK");
    if (!message.member.voice.channel)
      return message.channel.send(`❌ | You're not in a voice channel!`);
    if (
      queue &&
      message.guild.me.voice.channel.id !== message.member.voice.channel.id
    )
      return message.channel.send(`❌ | You're not in my voice channel!`);
    queue.threed= !queue.threed;
    handle(message.guild, this.client, queue);
    return message.channel.send(
      queue.sorround
        ? "3D effect enabled!"
        : "3D effect disabled!"
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

module.exports = threeD;