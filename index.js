const { Client, Collection } = require("discord.js");
const fs = require("fs");
const player = require("./modules/Music");
const app = require("express")();
const http = require("http");
const Discord = require('discord.js')
const server = http.createServer(app);


class ifTheWorldWasEnding extends Client {
  /**
   * @constructor
   * @param {options} options options
   */
 
  constructor(options) {
    super(options);
    this.commands = new Collection();
    this.aliases = new Collection();
    this.wait = require("util").promisify(setTimeout);
    this.config = require("./config");
    this.admin = this.config.admin;
    this.db = require("quick.db");
    this.radio= new Map()
    this.queue = new Map();
    this.player = new player(this);
  }

  /**
   * clean text
   * @param {String} text text
   */
  cleanText(text) {
    if (typeof text !== "string")
      text = require("util").inspect(text, { depth: 1 });

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(
        new RegExp(this.token, "g"),
        "TOK3N"
      );

    return text;
  }

  /**
   * getCommand
   * @param {String} name command name
   */
  getCommand(name) {
    return this.commands.get(name) || this.commands.get(this.aliases.get(name));
  }

  /**
   * awaitReply
   * @param {String} msg message
   * @param {string} question question
   * @param {Number} limit time limit
   */
  async awaitReply(msg, question, limit = 60000) {
    const filter = m => (m.author.id = msg.author.id);
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, {
        max: 1,
        time: limit,
        errors: ["time"]
      });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  }

  /**
   * parseNumber
   * @param {String} string string to parse
   */
  parseNumber(string) {
    const isNumber = string => isFinite(string) && +string === string;
    const isString = string => typeof string === "string";
    function parseNumberFromString(str) {
      const matches = str
        .replace(/,/g, "")
        .match(/(\+|-)?((\d+(\.\d+)?)|(\.\d+))/);
      return matches && matches[0] ? Number(matches[0]) : NaN;
    }
    if (isNumber(string)) {
      return Number(string);
    }
    if (isString(string)) {
      return parseNumberFromString(string);
    }
    return NaN;
  }

  /**
   * resolveCase
   * @param {String} channel channel id
   */
  async resolveCase(channel) {
    return await require("./modules/Case")(this, this.channels.get(channel));
  }
}

const client = new ifTheWorldWasEnding({ disableEveryone: true });

async function init() {
  // commands
  fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(dir => {
      fs.readdir(`./commands/${dir}/`, (err, cmd) => {
        cmd.forEach(file => {
          if (!file.endsWith(".js")) return;
          let Props = require(`./commands/${dir}/${file}`);
          let commandName = file.split(".")
          let props = new Props(client);
          props.help.category = dir;
          props.location = `./commands/${dir}/${file}`;
          client.commands.set(props.help.name, props);
          props.help.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
          });
        });
      });
    });
  });

  // events
  
  client.on('message', async(message) =>{
    
        this.client = client;
    
        
        
        const prefixes = ['%','fb.',`<@${this.client.user.id}>`];
    let prefix = false
     for (const thisPrefix of prefixes) {
       if(message.author.bot)return
       
       if (message.content.startsWith(thisPrefix)) prefix = thisPrefix;
       
        }if(!prefix)return
        const args = message.content.slice(prefix.length).trim().split(" ");
        const command = args.shift().toLowerCase();
        if (message.guild && !message.member) await message.guild.fetchMember(message.author);
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
        if (!cmd) return;
        if (cmd.help.category === "Developer" && !this.client.config.admin.includes(message.author.id)) return message.channel.send("Dont try to swindle me.i know you are not the bot owner");
        
  
        cmd.execute(message, args, Discord);
    })

  
  
  client.login(process.env.token);
  client.on("ready",()=>{
    client.user.setStatus('dnd')
    console.log('ready')
    
   
  })
}

init();

client
  .on("disconnect", () => client.logger.warn("websocket is disconnecting..."))
  
  .on("error", e => client.logger.error(e))
  .on("warn", info => client.logger.warn(info));

module.exports = client;

String.prototype.toProperCase = function() {
  return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.shuffle = function() {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]];
  }
  return this;
};

Array.prototype.insert = function(index, item) {
  this.splice(index, 0, item);
};

process.on("uncaughtException", err => {
  console.error("Uncaught Exception: ", err);
  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: ", err);
});
