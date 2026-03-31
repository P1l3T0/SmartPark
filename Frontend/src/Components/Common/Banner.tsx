interface BannerProps {
  title: string;
  description: string;
}

const Banner = ({ title, description }: BannerProps) => (
  <div className="border-b border-border bg-card px-4 py-3 shadow-sm">
    <div className="mx-auto max-w-7xl flex items-center gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="h-7 w-7 fill-primary"
        >
          <path d="M57.6 24.4 53 12.2A4 4 0 0 0 49.2 10H14.8a4 4 0 0 0-3.8 2.2L6.4 24.4A6 6 0 0 0 2 30v12a2 2 0 0 0 2 2h4a6 6 0 0 0 12 0h24a6 6 0 0 0 12 0h4a2 2 0 0 0 2-2V30a6 6 0 0 0-4.4-5.6zM14.8 14h34.4l3.6 10H11.2l3.6-10zM14 48a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm36 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
        </svg>
      </div>
      <div>
        <h1 className="text-xl font-bold text-text-primary leading-tight">
          {title}
        </h1>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
    </div>
  </div>
);

export default Banner;
