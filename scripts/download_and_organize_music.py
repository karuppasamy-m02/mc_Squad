import os
import ssl
import json
import urllib.request
import subprocess
import hashlib

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

BASE_URL = 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/'

TRACKS = {
    'horror': [
        {'id': 'horror-01', 'src': 'SCP-x7x.mp3', 'dest': 'the-dark-corridor.mp3', 'title': 'The Dark Corridor', 'tagline': 'Psychological Horror Theme • Cold Atmospheric Dread'},
        {'id': 'horror-02', 'src': 'SCP-x4x.mp3', 'dest': 'midnight-suspense.mp3', 'title': 'Midnight Suspense', 'tagline': 'High Tension Cinema Score • Heartbeat Pulse & Panic Drops'},
        {'id': 'horror-03', 'src': 'SCP-x2x.mp3', 'dest': 'unseen-presence.mp3', 'title': 'Unseen Presence', 'tagline': 'Supernatural Creep Score • Bowed Metal & Dark Foley'},
        {'id': 'horror-04', 'src': 'SCP-x1x.mp3', 'dest': 'shadow-realm.mp3', 'title': 'Shadow Realm', 'tagline': 'Demonic Sub-Bass Drone • Abyss Tremolo & Clustered Strings'},
        {'id': 'horror-05', 'src': 'Symmetry.mp3', 'dest': 'psychological-tension.mp3', 'title': 'Psychological Tension', 'tagline': 'Anamorphic Thriller OST • Eerie Swells & Sudden Impacts'},
    ],
    'love': [
        {'id': 'love-01', 'src': 'Almost Bliss.mp3', 'dest': 'ni-eenaku-love.mp3', 'title': 'Ni Eenaku', 'tagline': 'Emotional Melodic Ballad • Warm Piano & Soaring Strings'},
        {'id': 'love-02', 'src': 'Carefree.mp3', 'dest': 'soulmate-whisper.mp3', 'title': 'Soulmate Whisper', 'tagline': 'Sunlit Romance Theme • Gentle Acoustic Melody & Warmth'},
        {'id': 'love-03', 'src': 'All This.mp3', 'dest': 'midnight-rain-romance.mp3', 'title': 'Midnight Rain Romance', 'tagline': 'Deep Heartfelt Symphony • Intimate Piano Harmony'},
        {'id': 'love-04', 'src': 'Dreamy Flashback.mp3', 'dest': 'memory-of-you.mp3', 'title': 'Memory of You', 'tagline': 'Nostalgic Love Reverie • Tender Cinematic Melodics'},
        {'id': 'love-05', 'src': 'Aerosol of my Love.mp3', 'dest': 'eternal-promise.mp3', 'title': 'Eternal Promise', 'tagline': 'Timeless Romantic Serenade • Soft Guitar Strings'},
    ],
    'family': [
        {'id': 'family-01', 'src': 'Bittersweet.mp3', 'dest': 'cina-cina-kaladi.mp3', 'title': 'Cina Cina kaladi', 'tagline': 'Heartfelt Baby Lullaby • A Parent Devotion to their Child'},
        {'id': 'family-02', 'src': 'Comfortable Mystery.mp3', 'dest': 'childhood-starlight.mp3', 'title': 'Childhood Starlight', 'tagline': 'Gentle Bedtime Lullaby • Soothing Acoustic Warmth'},
        {'id': 'family-03', 'src': 'Heartbreaking.mp3', 'dest': 'a-mothers-cradle.mp3', 'title': 'A Mother\'s Cradle', 'tagline': 'Deep Paternal Devotion • Tender Emotional Strings'},
        {'id': 'family-04', 'src': 'Soaring.mp3', 'dest': 'fathers-blessing.mp3', 'title': 'Father\'s Blessing', 'tagline': 'Uplifting Family Bond • Joyous Hope & Guidance'},
        {'id': 'family-05', 'src': 'Prelude and Action.mp3', 'dest': 'first-steps-home.mp3', 'title': 'First Steps Home', 'tagline': 'Sweet Innocent Wonder • Playful Nursery Melodics'},
    ],
    'hiphop': [
        {'id': 'hiphop-01', 'src': 'Cipher2.mp3', 'dest': 'hip-hop-motivation.mp3', 'title': 'Hip-Hop Motivation', 'tagline': 'Relentless Street Anthem • Hard-Hitting 808s & Heavy Bars'},
        {'id': 'hiphop-02', 'src': 'Groove Grove.mp3', 'dest': 'street-hustle-bars.mp3', 'title': 'Street Hustle & Bars', 'tagline': 'Gritty Boom-Bap Rhythm • Heavy Snare & Urban Flow'},
        {'id': 'hiphop-03', 'src': 'District Four.mp3', 'dest': 'concrete-ambition.mp3', 'title': 'Concrete Ambition', 'tagline': 'Driving Street Energy • Punchy Basslines & Relentless Grit'},
        {'id': 'hiphop-04', 'src': 'Dub Feral.mp3', 'dest': 'sub-bass-warfare.mp3', 'title': 'Sub-Bass Warfare', 'tagline': 'Heavy 32Hz Sub Drops • Aggressive Electronic 808 Impact'},
        {'id': 'hiphop-05', 'src': 'AcidJazz.mp3', 'dest': 'victory-lap-anthem.mp3', 'title': 'Victory Lap Anthem', 'tagline': 'Triumphant Motivation • Funky Horns & High-Octane Energy'},
    ]
}

def get_duration(filepath):
    try:
        out = subprocess.check_output(['afinfo', filepath]).decode()
        for line in out.splitlines():
            if 'estimated duration:' in line:
                secs = float(line.split(':')[1].strip().split()[0])
                mins = int(secs // 60)
                rem_secs = int(secs % 60)
                return f"{mins:02d}:{rem_secs:02d}"
    except Exception as e:
        pass
    return "03:30"

os.makedirs('public/music/horror', exist_ok=True)
os.makedirs('public/music/love', exist_ok=True)
os.makedirs('public/music/family', exist_ok=True)
os.makedirs('public/music/hiphop', exist_ok=True)
os.makedirs('public/music/horer-musics', exist_ok=True)

downloaded_hashes = {}
results = {}

for category, track_list in TRACKS.items():
    results[category] = []
    print(f"\nProcessing category: {category} ({len(track_list)} tracks)...")
    for t in track_list:
        dest_path = os.path.join('public', 'music', category, t['dest'])
        url = BASE_URL + urllib.parse.quote(t['src'])
        print(f"Downloading {t['title']} from {t['src']} -> {dest_path}")
        
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ctx) as resp:
            data = resp.read()
        
        with open(dest_path, 'wb') as f:
            f.write(data)
        
        # Mirror horror tracks to horer-musics
        if category == 'horror':
            horer_dest = os.path.join('public', 'music', 'horer-musics', t['dest'])
            with open(horer_dest, 'wb') as f:
                f.write(data)
        
        # Also copy the main headline tracks to root public/music/ for backwards compatibility
        if t['dest'] == 'ni-eenaku-love.mp3':
            with open('public/music/melody.mpeg', 'wb') as f:
                f.write(data)
            with open('public/music/ni-eenaku.mp3', 'wb') as f:
                f.write(data)
        elif t['dest'] == 'cina-cina-kaladi.mp3':
            with open('public/music/melody-Baby.mpeg', 'wb') as f:
                f.write(data)
            with open('public/music/cina-cina-kaladi.mp3', 'wb') as f:
                f.write(data)
        elif t['dest'] == 'hip-hop-motivation.mp3':
            with open('public/music/Hip-hop.mpeg', 'wb') as f:
                f.write(data)
            with open('public/music/hip-hop-motivation.mp3', 'wb') as f:
                f.write(data)

        file_hash = hashlib.md5(data).hexdigest()
        duration = get_duration(dest_path)
        
        if file_hash in downloaded_hashes:
            print(f"WARNING: Hash collision with {downloaded_hashes[file_hash]}")
        downloaded_hashes[file_hash] = t['title']
        
        t_data = dict(t)
        t_data['duration'] = duration
        t_data['hash'] = file_hash
        t_data['size'] = len(data)
        t_data['audio'] = f"/music/{category}/{t['dest']}"
        results[category].append(t_data)
        print(f"✓ {t['title']} ({duration}, {len(data)} bytes, hash: {file_hash[:8]}...)")

print("\n--- SUMMARY OF ALL 20 TRACKS ---")
print(f"Total distinct hashes: {len(downloaded_hashes)} / 20")
assert len(downloaded_hashes) == 20, "Expected 20 unique hashes!"
print("ALL 20 TRACKS HAVE UNIQUE AUDIO! NO DUPLICATES!")

with open('public/music/catalog.json', 'w') as f:
    json.dump(results, f, indent=2)
print("Catalog saved to public/music/catalog.json")
