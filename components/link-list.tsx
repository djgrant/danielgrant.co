type LinkListItem = {
  href: string;
  label: string;
  description: string;
};

export function LinkList({ items }: { items: LinkListItem[] }) {
  return (
    <ul className="list-none pl-0 [&>li]:ps-0">
      {items.map(({ href, label, description }) => (
        <li key={href}>
          <a href={href}>{label}</a>
          <div className="text-base opacity-70">{description}</div>
        </li>
      ))}
    </ul>
  );
}
