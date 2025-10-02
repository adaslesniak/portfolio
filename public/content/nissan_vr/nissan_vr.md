## Nissan JUKE VR for Paris Motor Show

I joined a small Unity team building a public VR experience. It was obvious we needed real GPU work and nobody had it. I didn’t either and there was no time to find someone... So I learned and implemented the special effects.

The job wasn’t to write “some effects.” It was to make the **experience** feel alive and controlled. I built Cg shaders that assembled the city around the player—first wireframe, then solid facades, then textures—coexisting in one pass so the world could “grow” by distance instead of popping. I added a repaint sweep that rolled new color across the car in‑scene. For the glass‑wall moment, I mixed an off‑screen camera into the material so you caught your own reflection before the façade dissolved to wireframe and let you through. To sell speed without nausea, I biased blur to the periphery and kept the center clean.

[https://www.youtube.com/watch?v=Hnz4eUUI4fQ]

We were in the early Oculus era (DK1→DK2), on a single high‑end PC, with heavy art assets from architects, not game artists. I cut transparency where it hurt (overdraw killer), simplified branches, and parameterized the cost of each pass so we could dial visuals during show prep. The chase logic stayed deterministic: the JUKE always “almost reachable,” speed tied to the treadmill feed, no stalls, no accidental catch.

We shipped, the booth ran clean, and people queued. When the stack had a hole, I filled it and made the thing work and I was damn proud, as it required stuff that couldn't be found on the stack overflow.



[[https://www.unit9.com/project/nissan-juke-chase-the-thrill](https://www.unit9.com/project/nissan-juke-chase-the-thrill)]