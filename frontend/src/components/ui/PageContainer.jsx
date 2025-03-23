// src/components/ui/PageContainer.jsx
export default function PageContainer({ children }) {
  return (
    <div className="flex flex-col items-center justify-center flex-grow px-4 py-10 min-h-[calc(100vh-64px-64px)]">
      {children}
    </div>
  );
}
