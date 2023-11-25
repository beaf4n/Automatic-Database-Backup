const fs = require('fs');
const path = require('path');
const mysqldump = require('mysqldump');
const config = require('./config.json');
const { Webhook, MessageBuilder } = require('discord-webhook-node');

const root = path.join(__dirname, 'sql');
const maxBackupFiles = 2;
let num = 0;

console.log("Auto Backup Active");

setInterval(async () => {
    num = num + 1;
    const timestamp = Date.now();
    const filename = path.join(root, `${config.database_info.database}-${num}-${timestamp}.sql`);
    console.log(`Creating backup: ${filename}`);

    mysqldump({
        connection: {
            host: config.database_info.host,
            user: config.database_info.user,
            password: config.database_info.password,
            database: config.database_info.database,
        },
        dumpToFile: filename,
    });

    await Delay(3500);

    if (config.discord.savetodiscord) {
        const webhook = config.discord.webhook;
        if (!webhook) return;

        const hook = new Webhook(webhook);
        const embed = new MessageBuilder()
            .setAuthor('Database backup')
            .setTimestamp()
            .setColor(config.discord.color)
            .addField(`File Path`, `\`${filename}\``)
            .addField(`Database`, config.database_info.database)
            .addField(`Date`, `${new Date()}`)
            .setFooter(config.discord.footer);

        hook.send(embed);
        hook.sendFile(filename);
        console.log(`Sent backup file to Discord: ${filename}`);
    }

    const files = fs.readdirSync(root).map(file => path.join(root, file));
    if (files.length >= maxBackupFiles) {
        files.sort((a, b) => fs.statSync(a).mtime.getTime() - fs.statSync(b).mtime.getTime());
        const filesToDelete = files.slice(0, files.length - maxBackupFiles + 1);
        filesToDelete.forEach(file => {
            fs.unlinkSync(file);
            console.log(`Deleted old backup file: ${file}`);
        });
    }

    console.log("Database dumped and saved successfully.");
    console.log("=======================================");

}, config.interval.time * 1000 * 60);

function Delay(ms) {
    return new Promise((res) => {
        setTimeout(res, ms);
    });
}
