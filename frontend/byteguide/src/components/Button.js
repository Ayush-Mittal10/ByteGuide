export const Button = ({ children, asChild, variant, ...props }) => (
    <button className={`px-4 py-2 rounded ${variant === 'outline' ? 'border' : 'bg-blue-500 text-white'}`} {...props}>
      {children}
    </button>
  );
  