import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove Livestream section
content = re.sub(r'\s*<!-- ═══════════════ WATCH LIVE — PREMIUM INVITATION CARD ═══════════════ -->.*?</section>', '', content, flags=re.DOTALL)

# Remove RSVP section
content = re.sub(r'\s*<!-- ═══════════════ RSVP ═══════════════ -->.*?</section>', '', content, flags=re.DOTALL)

# Remove nav links
content = re.sub(r'\s*<li><a href="#livestream"[^>]*>Live</a></li>', '', content)
content = re.sub(r'\s*<li><a href="#rsvp"[^>]*>RSVP</a></li>', '', content)
content = re.sub(r'\s*<a href="#rsvp">RSVP</a>', '', content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Successfully removed Livestream and RSVP sections.')
