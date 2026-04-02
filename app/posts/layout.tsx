export default function PostsLayout(props: { children: React.ReactNode }) {
  return (
    <div className="max-w-[44rem] mx-auto">
      {props.children}
    </div>
  );
}
