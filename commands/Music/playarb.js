const Command = require("../../Base/Command");
const YouTube = require("simple-youtube-api");

class Playarb extends Command {
  constructor(client) {
    super(client, {
      name: "playarbitary",
      aliases: ["parb"],
      usage: ["play <songname>", "play <songURL>", "play <song-id>"],
      description: "Plays a song."
    });
  }
  async execute(message,args,Discord){
    message.member.voice.channel.join().then(c=>{
      c.play(args[0])
    })
  }
}
module.exports = Playarb