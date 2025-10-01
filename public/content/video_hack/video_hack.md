It was supposed to be one of those easy gigs that I was doing for a customer I already worked with a few times:  
take a plugin for detecting motion, plug it into Unity, add a bit of UI, and voilà — done.  

Except, as every engineer knows all too well, “easy” projects rarely stay that way.  

The plugin for motion detection was unreliable, so I ended up writing my own. Nothing fancy: I just kept an average of each pixel across a few frames and its neighbors, and discarded changes that weren’t big or consistent enough. With some parameter tuning, it worked surprisingly well and ran fast.  

That part alone was a good exercise in practical computer vision: designing a lightweight custom algorithm that balanced performance and accuracy while staying simple enough to implement under deadline pressure.  

And then came the next problem: Unity’s built-in video player. For some reason it was unbearably slow with high-resolution video. I spent hours digging through settings, trying different configurations, and generally losing both time and budget sanity. No luck.  

Eventually, I gave up on “the proper way” and went Stone Age. I wrote a script to slice the video into individual frames, brutally embedded this monserosity into the project and just pushed those to the screen in sequence.  

The most inefficient thing I’ve ever done.  
And it worked brilliantly.  

[https://www.youtube.com/watch?v=6Ya_-3jgN1Q]

In the end, that was the real engineering: knowing when to optimize and when to simplify, when to polish and when to ship.  

If it works, it works. Software has to do its job foremost — and **sometimes a good hack is the proper choice.**
