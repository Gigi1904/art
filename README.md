# Static Artist Website

A clean static portfolio website for showing artwork.

## Structure

- `index.html` — home page with artwork grid
- `about.html` — artist/about page
- `contact.html` — contact page
- `css/styles.css` — active CSS file
- `scss/styles.scss` — editable SCSS version
- `js/images.js` — artwork list, image paths, years, and categories
- `js/main.js` — menu, filtering, and lightbox
- `assets/images/` — place your artwork images here

## How to add artwork

1. Add your image file into `assets/images/`
2. Open `js/images.js`
3. Add a new item:

```js
{
  title: "Artwork Title",
  year: "2026",
  type: "painting",
  medium: "Acrylic on canvas",
  image: "assets/images/your-image.jpg"
}
```

Types currently used:
- `painting`
- `print`
- `drawing`
- `mixed-media`

## GitHub Pages

Upload all files to a GitHub repository, then enable GitHub Pages from:
`Settings → Pages → Deploy from branch → main → /root`
