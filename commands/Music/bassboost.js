const Command = require("../../Base/Command");

class Bassboost extends Command {
    constructor(client) {
        super(client, {
            name: "bassboost",
            description: "Bassboost the player.",
            aliases: ["bb"],
            usage: ["bassboost off", "bassboost low", "bassboost medium", "bassboost high", "bassboost hard"]
        })
    }

    async execute(message, args, Discord) {
        let queue = this.client.queue.get(message.guild.id);
        if (!queue) return message.channel.send("No song is currently playing");
        if (!message.member.voice.channel) return message.channel.send('No voice channel detected,Please try again.');
        if (queue && message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send(`We are not in the same voice channel`);
        let amt = args[0];
        if (!amt) return message.channel.send(`❌ | Valid options: \`off\`, \`low\`, \`medium\`, \`high\` & \`hard\`.`);
        amt = amt.toLowerCase();
        switch (amt) {
            case "off":
                amt = 0;
                queue.bassboost = amt;
                handle(this.client,queue,message.guild);
                return message.channel.send("🔈 | Bassboost is now `off`.");
                break;
            case "low":
                amt = 5;
                queue.bassboost = amt;
                handle(this.client,queue,message.guild);
                return message.channel.send("🔈 | Bassboost is now `low`.");
                break;
            case "medium":
                amt = 10;
                queue.bassboost = amt;
                handle(this.client,queue,message.guild);
                return message.channel.send("🔈 | Bassboost is now `medium`.");
                break;
            case "high":
                amt = 15;
                queue.bassboost = amt;
                handle(this.client, queue, message.guild);
                return message.channel.send("🔈 | Bassboost is now `high`.");
                break;
            case "hard":
                amt = 20;
                queue.bassboost = amt;
                handle(this.client,queue, message.guild);
                return message.channel.send("🔈 | Bassboost is now `hard`.");
                break;
            default:
                return message.channel.send(` Please choose something between low,medium,high and hard`);
        }
    }
}

function handle (client, queue, server) {
  return client.player.play(server, queue.songs[0], queue.dispatcher.streamTime);
}
module.exports = Bassboost;