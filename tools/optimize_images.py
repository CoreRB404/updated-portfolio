"""Generate small web images; preserve original source pictures."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'assets' / 'images'

def optimize(source, width=960):
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image)
        image.thumbnail((width, width))
        destination = OUTPUT / (source.stem + '.webp')
        image.save(destination, 'WEBP', quality=82, method=6)
        return destination.stat().st_size

if __name__ == '__main__':
    OUTPUT.mkdir(parents=True, exist_ok=True)
    sources = list((ROOT / 'files (1)').glob('*.png'))
    sources += [ROOT / name for name in (
        'ai_workload_mockup_1767843863063.png',
        'fraud_detection_mockup_1767843889682.png', 'pos.png', 'calc.png',
        'attend_iq_mockup_1767843840015.png',
        'ww-pica (2) (2)-Photoroom.png', 'Photoroom.png')]
    before = sum(source.stat().st_size for source in sources)
    after = sum(optimize(source) for source in sources)
    print(f'Images: {before:,} -> {after:,} bytes ({1 - after / before:.1%} smaller)')
