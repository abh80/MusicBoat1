const Command = require("../../Base/Command");
const moment = require("moment")


class Radio extends Command {
  constructor(client) {
    super(client, {
      name: "radio",
      aliases: ["rd"],
      usage: ["play <songname>", "play <songURL>", "play <song-id>"],
      description: "Plays a song."
    });
  }
  async execute(message,args,Discord){
     if(args[0]==='help'){
      let em = new Discord.MessageEmbed()
      .setTitle('Here is the current list of supported radios')
      .setDescription('Its Aqua-``aqua``\nKISS UK-``kiss``\n103.5 KISS FM Chicago-``kissfm_chicago``\n102.5 KIIS Los Angeles-``kiis``\n96.1 POWER Atlanta-``power``\n99.5 HOT-``hot``\nHeart London-``heart_london``\nNext Level Radio_``nlradio`` ' )
      .setColor('#00ffee')
      .setFooter(message.author.tag,message.author.displayAvatarURL({dynamic:true}))
      return message.channel.send(em)
    }
    let radio = this.client.radio.get(message.guild.id)
    let queue = this.client.queue.get(message.guild.id)
    if(queue)return message.channel.send("Something is already playing,please stop it and try again")
    let name = args[0]
    
    
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
        "❌ | Ahoy, looks like I can't speak on your voice channel!"
      );
    
     
      
    
        
    let radios = ['aqua',"kiss",'heart_london','kissfm_chicago','kiis','power','hot',"nlradio","tafina"]
    let s =radios.forEach(m=>{
      m+'\n'
    })
  if(!name)return message.channel.send("Pls enter a radio name")
      
    if(!radio){
      const radioContruct={
        name:false,
        thumbnail:false,
        requestedBy:message.author.tag,
        playing:false,
        connection:null,
        channel:message.channel,
        guild:message.guild,
        time:new Date().getTime(),
        url:false,
        home:false
      }
       this.client.radio.set(message.guild.id,radioContruct)
      }
    let e = this.client.radio.get(message.guild.id)
   
    if(args[0] === radios[0]){
      e.name = 'Its Aqua'
      e.thumbnail='https://itsaqua.net/lite/__assets/images/transparent.png?'
      e.url=false
e.home=false
      return this.client.player.rplay('https://live.itsaqua.net',message)
    }else if(args[0] === radios[1]){
      e.thumbnail="https://media.info/i/lf/900/1457347544/196.png"
      e.name= "kiss"
      e.url=false
e.home=false

      return this.client.player.rplay('https://stream-kiss.planetradio.co.uk/kissnational.mp3',message)
    }else if(args[0] ===radios[2]){
      e.thumbnail = 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/The_Heart_Network_logo.svg/200px-The_Heart_Network_logo.svg.png'
      e.name = 'Heart London'
    return this.client.player.rplay('https://media-ssl.musicradio.com/HeartLondon',message)
    }else if(args[0] === radios[3]){
      e.thumbnail = 'https://radiostationusa.fm/assets/image/radio/180/WKSCFMKISS%20FM.png'
      e.name='103.5 KISS FM Chicago'
      e.url="https://1035kissfm.iheart.com/music/"
      e.home="https://1035kissfm.iheart.com/"
      return this.client.player.rplay('https://n15b-e2.revma.ihrhls.com/zc849?rj-ttl=5&rj-tok=AAABcsDjY5oAk7nvGNlGFUl3IQ',message)
    }else if(args[0]===radios[4]){
      e.thumbnail = 'https://i.iheart.com/v3/re/assets.brands/5e66d16a487bc47c1a6d1669?ops=gravity(%22center%22),maxcontain(150,52),quality(80)'
      e.name = '102.7 KIIS FM'
      e.url='https://kiisfm.iheart.com/music/'
      e.home="https://kiisfm.iheart.com/"
      return this.client.player.rplay('https://n3eb-e2.revma.ihrhls.com/zc185?rj-ttl=5&rj-tok=AAABcsHTXgQAExQvnMKnJnijMA',message)
    }else if(args[0]===radios[5]){
      e.thumbnail='https://i.iheart.com/v3/re/assets.brands/5c68bf01e6a21be933894b59?ops=gravity(%22center%22),maxcontain(150,52),quality(100)'
      e.name='Power 96.1'
      e.url='https://power961.iheart.com/music/'
      e.home ="https://power961.iheart.com/"
      return this.client.player.rplay('https://n1db-e2.revma.ihrhls.com/zc741?rj-ttl=5&rj-tok=AAABcsH2u4cA_hvdYsNwZ9hvqQ',message)
    }else if(args[0]===radios[6]){
      e.thumbnail ='https://i.iheart.com/v3/re/assets.brands/5b3a2f8f0abf50ca9a24a060?ops=gravity(%22center%22),maxcontain(150,52),quality(80)'
      e.name = '99.5 HOT'
      e.url='https://hot995.iheart.com/music/'
      e.home="https://hot995.iheart.com/"
      return this.client.player.rplay('https://n35b-e2.revma.ihrhls.com/zc2509?rj-ttl=5&rj-tok=AAABcsH-DDYAh-GwEaENjn4IkA',message)
    }else if(args[0]===radios[7]||args[0]===radios[8]){
e.name = "Next Level Radio"
e.url=false
e.home = false
e.thumbnail = false
return this.client.player.rplay('http://nlradio.xyz:8010/nlr.mp3',message)
}
    else return message.channel.send('That radio is not available')
  
  }
}
module.exports = Radio
