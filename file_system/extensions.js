const ext= {
    image: ["jpeg", "jpg", "png"],
    video: ["mp4", "mov", "wmv", "avi", "avchd", "mkv", "webm", "mpg", "mp2", "mpeg", "mpv", "ogg", "m4p", "m4v", "flv", "f4v","swf"],
    audio: ["m4a", "flac", "mp3", "wav", "wma", "aac"],
    archive: ["zip", "rar", "iso", "7z", "tar", "gz", "ar", "xz"],
    document: ["docx", "doc", "pdf", "xlsx", "xls", "odt", "ods", "odp", "odg", "odf", "txt", "ps", "tex"],
    application: ["exe", "dmg", "pkg", "deb"],
    program: ["c", "cpp", "java", "js", "html", "css", "php", "py", "hbs", "ejs"],
    config: ["json", "gitignore"]
}

module.exports= ext;