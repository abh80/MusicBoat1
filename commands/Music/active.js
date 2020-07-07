const Command = require("../../Base/Command");

class Active extends Command {
  constructor(client) {
    super(client, {
      name: "active_fliters",
      description: "Displays active filters",
      aliases: ['af','active','filters','property'],
      usage: ["af"]
    });
  }
  async execute(message,args,Discord){
    let filters = ['loop','bassboost','vaporwave','nightcore','echo','surround']
     let queue = this.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("❌ | I'm not playing anything?");
    if (!message.member.voice.channel)
      return message.channel.send(`❌ | You're not in a voice channel!`);
    if (
      queue &&
      message.guild.me.voice.channel.id !== message.member.voice.channel.id
    )
      return message.channel.send(`❌ | You're not in my voice channel!`);
    let embed = new Discord.MessageEmbed()
    .setTitle('Active Filters')
    .setDescription((queue.nightcore?'✅|Nigthcore':"❌|Nightcore")+ '\n'+(queue.vaporwave?'✅|Vaporwave':'❌|Vaporwave')+"\n"+(queue.echo?'✅|Echo':'❌|Echo') +"\n"+(queue.sorround?'✅|Surround':'❌|Surround')+'\n'+(queue.loop?'✅|Loop':'❌|Loop')+"\n"+(queue.karoke?'✅|Karoke':'❌|Karoke')+"\n"+(queue.fade?'✅|Fade':'❌|Fade')+'\n'+"Bassboost:" +queue.bassboost+"\n"+"Tempo: "+queue.tempo)
    .setColor('#00ffee')
    message.channel.send(embed)
  }
}
module.exports = Active