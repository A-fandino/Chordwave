## Error on installing *mysqlclient*?

Install the wheel file [here](https://www.lfd.uci.edu/~gohlke/pythonlibs/#mysqlclient) and use
> pip install mysqlclient[...].whl

If you see something like **cp36** means that you need Python 3.6 so choose the one that works for you.

## Problems with librosa reading mp3?

You must install ffmpeg from [this page](https://pypi.org/project/librosa/) on *audioread and MP3 support*.

If you are using Windows you must add the executable folder to your System Path.