export const Card = ({ children, className }) => (
    <div className={`p-4 bg-white shadow-md rounded-lg ${className}`}>
      {children}
    </div>
  );
  export const CardContent = ({ children }) => <div className="p-2">{children}</div>;
  export const CardHeader = ({ children }) => <div className="p-2 border-b">{children}</div>;
  export const CardTitle = ({ children }) => <h2 className="text-lg font-bold">{children}</h2>;
  