const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      {/* Logo */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl animate-pulse">
          <div className="absolute inset-[2px] bg-gray-900 rounded-xl flex items-center justify-center">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              ARD
            </span>
          </div>
        </div>
      </div>

       

      {/* Secondary dots animation */}
      <div className="flex justify-center space-x-1">
        <div className="w-2 h-2 rounded-full bg-blue-500/50 animate-pulse"></div>
        <div className="w-2 h-2 rounded-full bg-purple-500/50 animate-pulse [animation-delay:75ms]"></div>
        <div className="w-2 h-2 rounded-full bg-pink-500/50 animate-pulse [animation-delay:150ms]"></div>
        <div className="w-2 h-2 rounded-full bg-blue-500/50 animate-pulse [animation-delay:225ms]"></div>
        <div className="w-2 h-2 rounded-full bg-purple-500/50 animate-pulse [animation-delay:300ms]"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;