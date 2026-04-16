type LinkListItem = {
  href: string;
  label: string;
  description: string;
};

export function LinkList({ items }: { items: LinkListItem[] }) {
  return (
    <div className="space-y-6">
      {items.map(({ href, label, description }) => (
        <div key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg"
          >
            {label}
          </a>
          <div className="text-base dark:text-slate-400">{description}</div>
        </div>
      ))}
    </div>
  );
}
