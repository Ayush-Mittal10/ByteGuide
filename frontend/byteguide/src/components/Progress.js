export const Progress = ({ value, className }) => (
    <div className={`relative ${className} bg-gray-200 rounded-full overflow-hidden`}>
      <div className="absolute top-0 left-0 h-full bg-blue-500" style={{ width: `${value}%` }}></div>
    </div>
  );
  