import "./MainContainer.scss";

export default function MainContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="main-layout">
      <div className="main-container">{children}</div>
    </div>
  );
}
