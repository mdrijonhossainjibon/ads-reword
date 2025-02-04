import React, { FC, useState } from 'react';
import { formatNumber } from '@/utils/format';

interface VideoInfoProps {
  title: string;
  views: number;
  uploadDate: string;
  channelName: string;
  channelAvatar: string;
  subscribers: string;
  isSubscribed: boolean;
  onSubscribe: () => void;
  description?: string;
  descriptionDetails?: {
    text: string;
    uploadDate: string;
    category: string;
    tags: string[];
  };
}

// Add this helper function at the top of the file
const convertUrlsToLinks = (text: string) => {
  // Clean up the text first
  const cleanText = text
    .replace(/►/g, '') // Remove arrow symbols
    .replace(/▶/g, '') // Remove alternative arrow symbols
    .replace(/:-/g, ': ') // Fix colon formatting
    .replace(/\s*-\s*/g, ' - ') // Standardize dash spacing
    .replace(/\s*\|\s*/g, ' | ') // Standardize pipe spacing
    .replace(/\s*\.\.\.\s*/g, '... ') // Standardize ellipsis
    .replace(/\s+/g, ' ') // Remove extra spaces
    .replace(/\n\s*\n/g, '\n') // Remove multiple empty lines
    .replace(/([^.!?])\n/g, '$1\n\n') // Add proper paragraph spacing
    .replace(/\b(https?:\/\/[^\s]+)\b/g, '\n$1\n') // Put links on their own line
    .trim();

  // Split text into sections (metadata and description)
  const sections = cleanText.split(/(?=Song:|Album:|Music:|Director:|Label:)/i);
  
  // Process each section
  return sections.map((section, sectionIndex) => {
    // Regex that handles URLs and hashtags while preserving special characters
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const hashtagRegex = /#(\w+)/g;
    
    // First split by URLs
    const urlParts = section.split(urlRegex);
    
    const processedParts = urlParts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={`link-${sectionIndex}-${index}`}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline break-words block my-1"
          >
            {part}
          </a>
        );
      }
      
      // Split by newlines and process hashtags
      return part.split('\n').map((line, lineIndex) => {
        const cleanLine = line.trim();
        if (!cleanLine) return null;
        
        // Check if line is a metadata field
        const isMetadata = /^(Song|Album|Music|Director|Label):/i.test(cleanLine);
        
        // Process hashtags in the line
        const hashtagParts = cleanLine.split(hashtagRegex);
        const processedLine = hashtagParts.map((hashPart, hashIndex) => {
          if (cleanLine.match(hashtagRegex)?.[Math.floor(hashIndex / 2)]?.startsWith('#' + hashPart)) {
            return (
              <span key={`hashtag-${hashIndex}`} className="text-blue-400">
                #{hashPart}
              </span>
            );
          }
          return hashPart;
        });
        
        return (
          <React.Fragment key={`line-${sectionIndex}-${index}-${lineIndex}`}>
            {lineIndex > 0 && <br />}
            <span className={isMetadata ? 'text-gray-400' : ''}>
              {processedLine}
            </span>
          </React.Fragment>
        );
      });
    });
    
    return (
      <div key={`section-${sectionIndex}`} className="mb-2">
        {processedParts}
      </div>
    );
  });
};

const VideoInfo: FC<VideoInfoProps> = ({
  title,
  views,
  uploadDate,
  channelName,
  channelAvatar,
  subscribers,
  isSubscribed,
  onSubscribe,
  descriptionDetails,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
 
  return (
    <div className="px-4 py-3">
      {/* Title and Views Section */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left"
      >
        <h1 className={`text-[17px] font-medium leading-[22px] ${isExpanded ? '' : 'line-clamp-2'}`}>
          {title}
        </h1>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1 text-[14px] text-gray-400">
            <span>{formatNumber(views)} views</span>
            <span className="mx-1">•</span>
            <span>{uploadDate}</span>
          </div>
          <svg 
            className={`w-5 h-5 text-gray-400 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </button>

      {/* Description (shown when expanded) */}
      {isExpanded && (
        <div className="mt-3 space-y-3">
           
          
          {descriptionDetails && (
            <>
             {descriptionDetails.text && (
               <div className="text-[14px] text-gray-200 space-y-2">
                 {convertUrlsToLinks(descriptionDetails.text)}
               </div>
             )}
              
              {descriptionDetails.category && (
                <div className="text-[13px] text-gray-400 mt-3">
                  Category: {descriptionDetails.category}
                </div>
              )}
              
              {descriptionDetails.tags && descriptionDetails.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {descriptionDetails.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-[12px] bg-zinc-800 rounded-full text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Channel Info */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <img
            src={channelAvatar}
            alt={channelName}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="text-[15px] font-medium">{channelName}</h3>
            <p className="text-[13px] text-gray-400">{subscribers} subscribers</p>
          </div>
        </div>
        <button
          onClick={onSubscribe}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            isSubscribed
              ? 'bg-zinc-800 text-white hover:bg-zinc-700'
              : 'bg-white text-black hover:bg-gray-100'
          }`}
        >
          {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>
    </div>
  );
};

export default VideoInfo;
