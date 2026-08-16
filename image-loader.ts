// Static-export loader: next/image does not prefix basePath on unoptimized
// srcs, so subpath hosting (GitHub Pages) 404s every image without this.
export default function loader({ src }: { src: string }) {
  return (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + src;
}
