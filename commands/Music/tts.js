const Command = require("../../Base/Command");
const moment = require("moment")


class Tts extends Command {
  constructor(client) {
    super(client, {
      name: "tts",
      aliases: ["tts"],
      usage: ["play <songname>", "play <songURL>", "play <song-id>"],
      description: "Plays a song."
    });
  }
  async execute(message,args,Discord){
  let radio = this.client.radio.get(message.guild.id)
    let queue = this.client.queue.get(message.guild.id)
    if(queue)return message.channel.send("Something is already playing,please stop it and try again")
    if(radio)return message.channel.send("Something is already playing,please stop it and try again")
    if (!message.member.voice.channel)
      return message.channel.send(
        "❌ | Can you try again by joining voice channel?"
      );
    if (
      !message.member.voice.channel
        .permissionsFor(this.client.user)
        .has("CONNECT")
    )
      return message.channel.send(
        "❌ | Ahoy, looks like I can't join your voice channel!"
      );
    if (
      !message.member.voice.channel
        .permissionsFor(this.client.user)
        .has("SPEAK")
    )
      return message.channel.send(
        "❌ | Ahoy, looks like I can't speak on your voice channel"
)
this.client.player.tts1(message,args)
  }
}
module.exports=Tts
