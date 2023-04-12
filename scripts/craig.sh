#! /bin/bash
# Downmixes all .flac files in the current directory into an 128 kbps .mp3 file normalized to -16 LUFS (TP -1.5, LRA 11)

ffmpeg $(find . -maxdepth 1 -type f -iname "*.flac" -exec echo -n "-i {} " \;) -filter_complex "amix=inputs=$(ls *.flac | wc -l):duration=longest:dropout_transition=2, loudnorm=I=-16:TP=-1.5:LRA=11:print_format=summary" -c:a libmp3lame -b:a 128k $(date +%F).mp3
