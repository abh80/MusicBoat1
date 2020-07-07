const Command = require("../../Base/Command");

class Loop extends Command {
  constructor(client) {
    super(client, {
      name: "loop",
      description: "Loop the player.",
      aliases: [],
      usage: ["loop"]
    });
  }

  async execute(message, args, Discord) {
    let queue = this.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("No song is bieng played");
    if (!message.member.voice.channel)
      return message.channel.send(` You're not in a voice channel!`);
    if (
      queue &&
      message.guild.me.voice.channel.id !== message.member.voice.channel.id
    )return message.channel.send(`You're not in my voice channel!`);
  queue.loop = !queue.loop
      handle(message.guild, this.client, queue);
    message.channel.send(
      queue.loop
      ?'Loop Enabled'
      :'Loop Disabled'    )
    
      }
    
  }
function handle(guild, client, queue) {
  return client.player.play(
    guild,
    queue.songs[0],
    queue.dispatcher.streamTime / 1.6
  );
}

module.exports = Loop;

