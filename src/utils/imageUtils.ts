interface ImageMetadata {
  src: string;
  alt: string;
  caption?: string;
}

export function getImageAlt(image: ImageMetadata | string, fallback: string): string {
  if (typeof image === 'string') {
    return fallback;
  }
  return image.alt || fallback;
}

export function validateImageMetadata(images: ImageMetadata[]): void {
  images.forEach((image, index) => {
    if (!image.alt) {
      console.warn(`Warning: Image at index ${index} (${image.src}) is missing alt text`);
    }
    if (image.alt === image.src) {
      console.warn(`Warning: Image at index ${index} (${image.src}) has filename as alt text`);
    }
    if (image.alt.toLowerCase().includes('image of') || image.alt.toLowerCase().includes('picture of')) {
      console.warn(`Warning: Image at index ${index} (${image.src}) has redundant alt text prefixes`);
    }
  });
}

export const defaultAltText = {
  teamMember: 'Lab member headshot',
  labPhoto: 'Sheehan Lab research activity',
  publication: 'Publication cover or figure',
  research: 'Research visualization or experiment',
  logo: 'Sheehan Lab logo'
}; 