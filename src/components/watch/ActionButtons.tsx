import { FC, useState } from 'react';
import { formatNumber } from '@/utils/format';

interface ActionButtonsProps {
  likes: number;
  onLike: () => void;
  onShare: () => void;
  onDownload: () => void;
  isLiked?: boolean;
  isDisliked?: boolean;
}

const ActionButtons: FC<ActionButtonsProps> = ({
  likes,
  onLike,
  onShare,
  onDownload,
  isLiked = false,
  isDisliked = false,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      //await onDownload();
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    onShare();
    setShowShareTooltip(true);
    setTimeout(() => setShowShareTooltip(false), 2000);
  };

  return (
    <div className="flex justify-around py-2 border-t border-b border-gray-800">
      <button 
        onClick={onLike}
        className="flex flex-col items-center gap-1 group relative"
      >
        <div className={`p-2 rounded-full transition-colors ${isLiked ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'}`}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
          </svg>
        </div>
        <span className={`text-[12px] ${isLiked ? 'text-blue-400' : ''}`}>
          {formatNumber(likes)}
        </span>
      </button>

      <button 
        className="flex flex-col items-center gap-1 group relative"
      >
        <div className={`p-2 rounded-full transition-colors ${isDisliked ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'}`}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill={isDisliked ? "currentColor" : "none"} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h-2m5 0v2a2 2 0 01-2 2h-2.5"/>
          </svg>
        </div>
        <span className={`text-[12px] ${isDisliked ? 'text-gray-400' : ''}`}>
          Dislike
        </span>
      </button>

      <button 
        onClick={handleShare} 
        className="flex flex-col items-center gap-1 group relative"
      >
        <div className="p-2 hover:bg-gray-800 rounded-full transition-colors">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
          </svg>
        </div>
        <span className="text-[12px]">Share</span>
        {showShareTooltip && (
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
            Copied to clipboard!
          </span>
        )}
      </button>

      <button 
        onClick={handleDownload} 
        disabled={isDownloading}
        className="flex flex-col items-center gap-1 group relative"
      >
        <div className={`p-2 rounded-full transition-colors ${isDownloading ? 'bg-gray-700' : 'hover:bg-gray-800'}`}>
          {isDownloading ? (
            <svg className="w-6 h-6 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          ) : (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
          )}
        </div>
        <span className="text-[12px]">
          {isDownloading ? 'Downloading...' : 'Download'}
        </span>
      </button>
    </div>
  );
};

export default ActionButtons;
