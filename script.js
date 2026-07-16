// image preview helper
function readAndPreview(file, target) {
    const reader = new FileReader();
    reader.onload = e => { target.style.backgroundImage = `url('${e.target.result}')`; target.textContent = ''; };
    reader.readAsDataURL(file);
}

// avatar
const avatarInput = document.querySelector('.avatar-input');
if (avatarInput) {
    avatarInput.addEventListener('change', e => { const f = e.target.files[0]; if (f) readAndPreview(f, document.querySelector('.avatar-preview')); });
    // drag/drop
    const avatarLabel = document.querySelector('.avatar');
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evt => avatarLabel.addEventListener(evt, e => { e.preventDefault(); e.stopPropagation(); }));
    ['dragenter', 'dragover'].forEach(evt => avatarLabel.addEventListener(evt, () => avatarLabel.classList.add('dragover')));
    ['dragleave', 'drop'].forEach(evt => avatarLabel.addEventListener(evt, () => avatarLabel.classList.remove('dragover')));
    avatarLabel.addEventListener('drop', e => { const f = e.dataTransfer.files[0]; if (f && f.type.startsWith('image/')) { try { const dt = new DataTransfer(); dt.items.add(f); avatarInput.files = dt.files; } catch (_) { } readAndPreview(f, document.querySelector('.avatar-preview')); } });
}

// gallery slots
document.querySelectorAll('.pic-slot').forEach(slot => {
    const input = slot.querySelector('.pic-input'); const preview = slot.querySelector('.pic-preview');
    input.addEventListener('change', e => { const f = e.target.files[0]; if (f) readAndPreview(f, preview); });
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evt => slot.addEventListener(evt, e => { e.preventDefault(); e.stopPropagation(); }));
    ['dragenter', 'dragover'].forEach(evt => slot.addEventListener(evt, () => slot.classList.add('dragover')));
    ['dragleave', 'drop'].forEach(evt => slot.addEventListener(evt, () => slot.classList.remove('dragover')));
    slot.addEventListener('drop', e => { const f = e.dataTransfer.files[0]; if (f && f.type.startsWith('image/')) { try { const dt = new DataTransfer(); dt.items.add(f); input.files = dt.files; } catch (_) { } readAndPreview(f, preview); } });
});

// image size slider helper
const imageSizeSlider = document.getElementById('imageSizeSlider');
const sizeValue = document.getElementById('sizeValue');
if (imageSizeSlider && sizeValue) {
    const root = document.documentElement;
    function updateImageSize() {
        const value = imageSizeSlider.value;
        root.style.setProperty('--image-height', `${value}px`);
        root.style.setProperty('--avatar-size', `${Math.round(value * 0.7)}px`);
        sizeValue.textContent = `${value}px`;
    }
    updateImageSize();
    imageSizeSlider.addEventListener('input', updateImageSize);
}

// Spotify embed helper
const embedBtn = document.getElementById('embedBtn');
if (embedBtn) {
    embedBtn.addEventListener('click', () => {
        const url = document.getElementById('spotifyUrl').value.trim();
        const holder = document.getElementById('spotifyEmbed');
        if (!url) { holder.innerHTML = '<div class="muted">Paste a Spotify embed URL above</div>'; return; }
        // accept raw spotify embed URL or full track link - try to convert
        let src = url;
        if (url.includes('open.spotify.com') && !url.includes('/embed/')) {
            src = url.replace('open.spotify.com', 'open.spotify.com/embed');
        }
        // simple iframe
        holder.innerHTML = `<iframe src="${src}" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
    });
}
