import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const downloadFile = (url, destPath) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(destPath)) {
      console.log(`Already exists: ${destPath}`);
      return resolve();
    }
    const file = fs.createWriteStream(destPath);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Downloaded: ${destPath}`);
          resolve();
        });
      });
    }).on('error', (err) => {
      fs.unlinkSync(destPath);
      reject(err);
    });
  });
};

// Generate a valid WAV file with hip-hop/cinematic audio synthesis
function generateBeatsWav(filename, durationSec = 16, tempoBpm = 92, style = 'hiphop') {
  const sampleRate = 44100;
  const numChannels = 2;
  const bytesPerSample = 2; // 16-bit
  const totalSamples = Math.floor(sampleRate * durationSec);
  const dataSize = totalSamples * numChannels * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);

  // WAV header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // subchunk1size (16 for PCM)
  buffer.writeUInt16LE(1, 20); // PCM audio format
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * numChannels * bytesPerSample, 28); // byte rate
  buffer.writeUInt16LE(numChannels * bytesPerSample, 32); // block align
  buffer.writeUInt16LE(bytesPerSample * 8, 34); // bits per sample
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  const beatSec = 60 / tempoBpm;
  const sixteenth = beatSec / 4;

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const beatPos = (t % (beatSec * 4)) / beatSec; // 0 to 4 beats per bar
    const subPos = (t % sixteenth) / sixteenth;

    let sampleL = 0;
    let sampleR = 0;

    // Kick on beat 0 and 2.5
    const kickTime1 = t % (beatSec * 2);
    if (kickTime1 < 0.25) {
      const kickEnv = Math.exp(-kickTime1 * 25);
      const kickFreq = 120 * Math.exp(-kickTime1 * 30) + 48;
      const kick = Math.sin(2 * Math.PI * kickFreq * kickTime1) * kickEnv * 0.7;
      sampleL += kick;
      sampleR += kick;
    }

    // Snare / Rimshot on beat 1 and 3
    const snareTime = (t - beatSec) % (beatSec * 2);
    if (snareTime >= 0 && snareTime < 0.2) {
      const snareEnv = Math.exp(-snareTime * 20);
      const noise = (Math.random() * 2 - 1) * 0.4;
      const snareTone = Math.sin(2 * Math.PI * 185 * snareTime) * 0.3;
      const snare = (noise + snareTone) * snareEnv * 0.6;
      sampleL += snare * 0.95;
      sampleR += snare * 1.05;
    }

    // Closed Hi-hat every 1/8 or 1/16 note
    const hihatTime = t % (beatSec / 2);
    if (hihatTime < 0.06) {
      const hhEnv = Math.exp(-hihatTime * 80);
      const hh = (Math.random() * 2 - 1) * hhEnv * 0.18;
      sampleL += hh * 1.1;
      sampleR += hh * 0.9;
    }

    // 808 Sub-Bass Note progression
    const bar = Math.floor(t / (beatSec * 4)) % 4;
    const bassNotes = [43.65, 38.89, 41.20, 36.71]; // F1, Eb1, E1, D1
    const bassFreq = bassNotes[bar];
    const bassVal = Math.sin(2 * Math.PI * bassFreq * t) * 0.45;
    sampleL += bassVal;
    sampleR += bassVal;

    // Atmospheric cinematic pad chords
    const padNotes = [
      [174.61, 220.00, 261.63], // F minor
      [155.56, 196.00, 233.08], // Eb
      [164.81, 207.65, 246.94], // E dim
      [146.83, 174.61, 220.00]  // D min
    ];
    const currentChord = padNotes[bar];
    let pad = 0;
    for (let c = 0; c < currentChord.length; c++) {
      pad += Math.sin(2 * Math.PI * currentChord[c] * t) * 0.06;
    }
    // subtle stereo chorus
    sampleL += pad * Math.sin(t * 1.2);
    sampleR += pad * Math.cos(t * 1.2);

    // Hard clip limiter
    sampleL = Math.max(-0.95, Math.min(0.95, sampleL));
    sampleR = Math.max(-0.95, Math.min(0.95, sampleR));

    const offset = 44 + i * 4;
    buffer.writeInt16LE(Math.floor(sampleL * 32767), offset);
    buffer.writeInt16LE(Math.floor(sampleR * 32767), offset + 2);
  }

  fs.writeFileSync(filename, buffer);
  console.log(`Generated synthesized audio track: ${filename}`);
}

async function main() {
  console.log('Downloading cinematic curated images...');

  // Curated high quality cinematic / concert / director photography
  const images = [
    // Music covers
    {
      url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/music/song-02.jpg')
    },
    {
      url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/music/song-03.jpg')
    },
    {
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/music/song-04.jpg')
    },
    {
      url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/music/song-05.jpg')
    },
    {
      url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/music/song-06.jpg')
    },

    // Posters
    {
      url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/posters/poster-01.jpg')
    },
    {
      url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/posters/poster-02.jpg')
    },
    {
      url: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/posters/poster-03.jpg')
    },
    {
      url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/posters/poster-04.jpg')
    },
    {
      url: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/posters/poster-05.jpg')
    },
    {
      url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/posters/poster-06.jpg')
    },

    // Videos
    {
      url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/videos/video-01.jpg')
    },
    {
      url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/videos/video-02.jpg')
    },
    {
      url: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/videos/video-03.jpg')
    },
    {
      url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/videos/video-04.jpg')
    },
    {
      url: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/videos/video-05.jpg')
    },
    {
      url: 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/videos/video-06.jpg')
    },

    // Gallery
    {
      url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/images/gallery-01.jpg')
    },
    {
      url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/images/gallery-02.jpg')
    },
    {
      url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/images/gallery-03.jpg')
    },
    {
      url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/images/gallery-04.jpg')
    },
    {
      url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/images/gallery-05.jpg')
    },
    {
      url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/images/gallery-06.jpg')
    },
    {
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/images/gallery-07.jpg')
    },
    {
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/images/gallery-08.jpg')
    },
    {
      url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=1000&auto=format&fit=crop',
      dest: path.join(rootDir, 'public/images/gallery-09.jpg')
    }
  ];

  for (const item of images) {
    try {
      await downloadFile(item.url, item.dest);
    } catch (e) {
      console.warn(`Could not download ${item.url}: ${e.message}`);
    }
  }

  // Ensure song-01 has our flagship Middle Class Anthem cover
  const song01Cover = path.join(rootDir, 'public/music/song-01.jpg');
  const middleClassAnthemCover = path.join(rootDir, 'public/music/middle-class-anthem.jpg');
  if (fs.existsSync(middleClassAnthemCover) && !fs.existsSync(song01Cover)) {
    fs.copyFileSync(middleClassAnthemCover, song01Cover);
  }

  // Generate 6 real playable audio tracks for local testing
  const musicDir = path.join(rootDir, 'public/music');
  const tracks = [
    { name: 'song-01.mp3', bpm: 92, style: 'anthem' },
    { name: 'song-02.mp3', bpm: 88, style: 'cypher' },
    { name: 'song-03.mp3', bpm: 104, style: 'melody' },
    { name: 'song-04.mp3', bpm: 84, style: 'story' },
    { name: 'song-05.mp3', bpm: 95, style: 'boom-bap' },
    { name: 'song-06.mp3', bpm: 80, style: 'experimental' }
  ];

  for (const tr of tracks) {
    const audioPath = path.join(musicDir, tr.name);
    if (!fs.existsSync(audioPath)) {
      generateBeatsWav(audioPath, 15, tr.bpm, tr.style);
    }
  }

  console.log('All media assets prepared successfully!');
}

main().catch(console.error);
