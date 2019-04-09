const path = require('path')
const fs = require('fs')

const dirpath = path.join(__dirname)

var subtitleExt = 'srt';
var videoExt = 'mp4|mkv|avi';

const logBlue = (name) => console.log('\x1b[34m', name);
const logGreen = (name) => console.log('\x1b[32m', name);

fs.readdir(dirpath, function(err, files) {
    const videos = files.sort().filter(el => new RegExp(`.${videoExt}$`).test(el));
    const subtitles = files.sort().filter(el => new RegExp(`.${subtitleExt}$`).test(el));

    if (videos.length === subtitles.length) {
        for (let i = 0; i < videos.length; i++) {
            const videoFileNameWithoutExt = videos[i].split('.').slice(0, -1).join('.'); 

            const newSrtFileName = `${videoFileNameWithoutExt}.${subtitleExt}`;

            fs.rename(subtitles[i], newSrtFileName, () => {});
            logBlue(`renamed ${subtitles[i]} to `);
            logGreen(newSrtFileName);
            logMagenta(videos[i]);
        }
    } else {
        console.log('Not the same amount of videos as srts!')
    }
});