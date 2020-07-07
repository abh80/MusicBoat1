const Command = require("../../Base/Command");
let moment = require("moment");
require("moment-duration-format");
let nc = 1.6;
let vw = 0.8;
const cherr = require("cheerio")
const req = require("request")



class Nowplaying extends Command {
  constructor(client) {
    super(client, {
      name: "nowplaying",
      description: "Shows now playing song.",
      aliases: ["np"],
      usage: ["nowplaying"]
    });
  }

  async execute(message, args, Discord) {
    let queue = this.client.queue.get(message.guild.id);
    let radio = this.client.radio.get(message.guild.id)
    let m = await message.channel.send('<a:load:718426626320367718> Fetching Info')
    if(radio&&radio.url){
    
      req(radio.url,function(error,response,html){
        let $ = cherr.load(html)
        let curr= $("ul a.track-title").html()
         let songname1 = $('ul a.track-title').attr('href')
         let artistlink = $('ul a.track-artist').attr('href')
         let artist1 = $('ul a.track-artist').html()
         let albumname = $('ul a.track-album').html()
         let albumlink1 = $('ul a.track-album').attr('href')
         let startedtime = $('ul li figure time').html()
      req(radio.home,function(error1,response1,html1){
        let eg= cherr.load(html1)
        let onair= eg("h5").html()
        let img2 = eg('main section div div div figure div img').attr('data-src')
  let back = 'ops=gravity(%22north%22),fit(64,64),quality(65)'
  let toslice = img2.length-back.length
  let img1 = img2.slice(0,toslice)
  
                  
         
        
      let embed1 = new Discord.MessageEmbed()
      .setTitle('Now Playing')
      .setAuthor('Radio',radio.thumbnail)
      .setThumbnail(img1)
      .addField('Radio',radio.name,)
      .addField("Current Song",`**[${curr}](${songname1})** by **[${artist1}](${artistlink})** on **[${albumname}](${albumlink1})** started playing at **${startedtime}**`)
    .addField('On air now',onair)
      .addField('Requested by',radio.requestedBy)
      .addField('Current Time',moment(Date.now()).format('hh:mm a'))
      .setColor('#00ffee')
      .setFooter((moment(Date.now()-radio.time).format("mm:ss"))+" (elasped)",message.author.displayAvatarURL({dynamic:true}))
      return message.channel.send(embed1)
      })
      })
      if(radio&&!radio.url){
        let embed1 = new Discord.MessageEmbed()
      .setTitle('Now Playing')
      .setThumbnail(radio.thumbnail)
      .addField('Radio',radio.name)
      .addField('Requested by',radio.requestedBy)
      .setColor('#00ffee')
      .setFooter((moment(Date.now()-radio.time).format("mm:ss"))+" (elasped)",message.author.displayAvatarURL({dynamic:true}))
      return message.channel.send(embed1)
      }
      await m.delete()
      if(radio)return
    }
    if (!queue) return message.channel.send("❌ | I'm not playing anything?");
    if (!message.member.voice.channel)
      return message.channel.send(`❌ | You're not in a voice channel!`);
    if (
      queue &&
      message.guild.me.voice.channel.id !== message.member.voice.channel.id
    )
      return message.channel.send(`❌ | You are not in my voice channel!`);

    let stream = queue.connection.dispatcher.streamTime;
    let total = queue.songs[0].duration2;
    if (queue.nightcore && !queue.pitchdown) stream = stream * nc;
    if (!queue.nightcore && queue.pitchdown) stream = stream / vw;
    if (queue.nightcore && queue.pitchdown) stream = stream * nc;
    if(queue.tempo !== 1)stream = stream*queue.tempo
    
    let now = `${moment.duration(stream).format("HH[:]mm[:]ss[:]")}`;
    let full = `${moment.duration(total).format("HH[:]mm[:]ss[:]")}`;
    let q = queue.playing ? "🔊" : "🔈";
    const embed = new Discord.MessageEmbed()
      .setDescription("<a:eq:721320670406901802>|Now Playing!")
      .addField(
        `Track`,
        `**[${Discord.Util.escapeMarkdown(queue.songs[0].title)}](${
          queue.songs[0].url
        })**`
      )
    .setFooter(
        `${q} | ${
          now.length < 3 ? `00:${now}` : now
        } ${this.client.player.createBar(stream, total)} ${full}`
      )
      .setThumbnail(
        `https://img.youtube.com/vi/${queue.songs[0].id}/maxresdefault.jpg`
      )
      .setColor("#00ffee")
      .setAuthor(
        `Music player Boat`,
          message.guild.iconURL({dynamic:true})
      )
    message.channel.send(embed);
  }
}

module.exports = Nowplaying;
