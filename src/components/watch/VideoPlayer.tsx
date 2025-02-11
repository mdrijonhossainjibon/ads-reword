import { RootState } from '@/modules/app';
import { message } from 'antd';
import { FC, useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import YouTube from 'react-youtube';

interface Milestone {
  time: number;
  points: number;
  message: string;
  claimed: boolean;
  multiplier?: number;
  isSpecial?: boolean;
}

interface VideoPlayerProps {
  videoId: string;
  onStart: () => void;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ onStart }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [points, setPoints] = useState(0);
  const [showMilestone, setShowMilestone] = useState(false);
  const [milestoneText, setMilestoneText] = useState('');
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPiP, setIsPiP] = useState(false);
  const [combo, setCombo] = useState(1);
  const [lastMilestoneTime, setLastMilestoneTime] = useState(0);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);

  const playerRef = useRef<any>(null);
  const milestoneTimeoutRef = useRef<NodeJS.Timeout>();
  const comboTimeoutRef = useRef<NodeJS.Timeout>();
  const videoId = useSelector((state: RootState) => state.private.watch.video);
  
  if (!videoId) {
    return null;
  }

  const MAX_POINTS : any  = videoId.points || 200;
  const COMBO_TIMEOUT = 5000; // 5 seconds to maintain combo

  const generateRandomMilestones = (videoDuration: number) => {
    // Calculate number of milestones based on video duration
    // Minimum 10, maximum 20 milestones
    const baseCount = Math.floor(videoDuration / 60); // Every minute adds to base count
    const minMilestones = Math.max(10, Math.min(baseCount + 8, 20));
    const maxMilestones = Math.max(minMilestones, Math.min(baseCount + 12, 20));
    const numberOfMilestones = Math.floor(Math.random() * (maxMilestones - minMilestones + 1)) + minMilestones;

    const emojis = ['🎯', '🔥', '⭐', '🌟', '💫', '🎮', '🎪', '🎨', '💎', '🏆', '🎁', '🌈'];
    const messages = [
      'Epic Bonus!',
      'Legendary Points!',
      'Super Streak!',
      'Mega Bonus!',
      'Power Up!',
      'Ultimate Score!',
      'Fantastic Catch!',
      'Incredible Timing!',
    ];

    const times = new Set<number>();
    while (times.size < numberOfMilestones) {
      // Distribute milestones more evenly across the video duration
      const segment = videoDuration / numberOfMilestones;
      const index = times.size;
      const minTime = segment * index * 0.8; // 80% of segment start
      const maxTime = segment * (index + 1) * 0.9; // 90% of segment end
      const randomTime = Math.floor(minTime + Math.random() * (maxTime - minTime));
      times.add(randomTime);
    }

    const sortedTimes = Array.from(times).sort((a, b) => a - b);
    const pointsPerMilestone = Math.floor(MAX_POINTS / sortedTimes.length);
    const remainingPoints = MAX_POINTS % sortedTimes.length;

    return sortedTimes.map((time, index): Milestone => {
      const extraPoint = index < remainingPoints ? 1 : 0;
      const basePoints = pointsPerMilestone + extraPoint;
      
      // Enhanced reward system
      const isSpecialMilestone = Math.random() < 0.2; // 20% chance for special milestone
      const multiplier = isSpecialMilestone ? (Math.random() < 0.3 ? 3 : 2) : 1; // 30% chance for 3x, 70% chance for 2x on special milestones
      const milestonePoints = basePoints * multiplier;

      const emoji = isSpecialMilestone ? 
        emojis[Math.floor(Math.random() * 4)] : // Special emojis for special milestones
        emojis[Math.floor(Math.random() * emojis.length)];

      const message = isSpecialMilestone ?
        `${emoji} SUPER +${milestonePoints} Points! ${messages[Math.floor(Math.random() * messages.length)]}` :
        `${emoji} +${milestonePoints} Points! ${messages[Math.floor(Math.random() * messages.length)]}`;

      return {
        time,
        points: milestonePoints,
        message,
        claimed: false,
        multiplier,
        isSpecial: isSpecialMilestone
      };
    });
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        handleVolumeChange(volume || 100);
      } else {
        handleVolumeChange(0);
      }
    }
  };

  const togglePiP = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPiP(false);
      } else if (playerRef.current?.getIframe()) {
        await playerRef.current.getIframe().requestPictureInPicture();
        setIsPiP(true);
      }
    } catch (err) {
      console.error('PiP failed:', err);
    }
  };

  const videoOptions = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
      playsinline: 1,
      controls: 0,
      enablejsapi: 1,
      fs: 1,
      mute: 1,
    }
  };

  const handleReady = (event: any) => {
    playerRef.current = event.target;
    const videoDuration = event.target.getDuration();
    setDuration(videoDuration);
    setMilestones(generateRandomMilestones(videoDuration));
    setIsLoading(false);
    setTimeout(() => {
      event.target.unMute();
      handleVolumeChange(volume);
    }, 1000);
  };

  const handleError = (error: any) => {
    setIsLoading(false);
    setError('Failed to load video. Please try again later.');
    console.error('YouTube player error:', error);
  };

  const handleStateChange = (event: any) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      onStart();
    } else if (event.data === YouTube.PlayerState.ENDED) {
      setShowReward(true);
    }
  };

  const showMilestoneMessage = (text: string) => {
    setMilestoneText(text);
    setShowMilestone(true);
    if (milestoneTimeoutRef.current) {
      clearTimeout(milestoneTimeoutRef.current);
    }
    milestoneTimeoutRef.current = setTimeout(() => {
      setShowMilestone(false);
    }, 2000);
  };

  const updateCombo = (currentMilestoneTime: number) => {
    const timeDiff = currentMilestoneTime - lastMilestoneTime;
    if (timeDiff < COMBO_TIMEOUT / 1000) {
      setCombo(prev => Math.min(prev + 1, 5)); // Max combo of 5x
    } else {
      setCombo(1);
    }
    setLastMilestoneTime(currentMilestoneTime);

    if (comboTimeoutRef.current) {
      clearTimeout(comboTimeoutRef.current);
    }
    comboTimeoutRef.current = setTimeout(() => {
      setCombo(1);
    }, COMBO_TIMEOUT);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!playerRef.current) return;

      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          const state = playerRef.current.getPlayerState();
          if (state === YouTube.PlayerState.PLAYING) {
            playerRef.current.pauseVideo();
          } else {
            playerRef.current.playVideo();
          }
          break;
        case 'm':
          toggleMute();
          break;
        case 'p':
          togglePiP();
          break;
        case 'arrowleft':
          playerRef.current.seekTo(currentTime - 5, true);
          break;
        case 'arrowright':
          playerRef.current.seekTo(currentTime + 5, true);
          break;
        case 'arrowup':
          handleVolumeChange(Math.min(volume + 5, 100));
          break;
        case 'arrowdown':
          handleVolumeChange(Math.max(volume - 5, 0));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentTime, volume]);

  // Progress tracking and milestone checking
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const time = playerRef.current.getCurrentTime();
        setCurrentTime(time);
        
        milestones.forEach((milestone, index) => {
          if (!milestone.claimed && time >= milestone.time && Math.floor(currentTime) < milestone.time) {
            const basePoints = milestone.points * (milestone.multiplier || 1);
            const comboPoints = basePoints * combo;
            const newPoints = Math.min(points + comboPoints, MAX_POINTS);
            setPoints(newPoints);
            updateCombo(time);
            showMilestoneMessage(`${milestone.message} (${combo}x Combo!)`);
            message.success(`Claimed milestone: ${milestone.message}`);
            // Mark milestone as claimed
            const updatedMilestones = [...milestones];
            updatedMilestones[index] = { ...milestone, claimed: true };
            setMilestones(updatedMilestones);
          }
        });

        if (time >= duration && duration > 0) {
          setShowReward(true);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTime, duration, milestones, points, combo]);

  // Styles injection
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeUp {
        from {
          opacity: 0;
          transform: translate(-50%, 20px);
        }
        to {
          opacity: 1;
          transform: translate(-50%, 0);
        }
      }
      .animate-fade-up {
        animation: fadeUp 0.3s ease-out forwards;
      }
      
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      .animate-pulse-custom {
        animation: pulse 2s infinite;
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  if (error) {
    return (
      <div className="relative w-full aspect-video bg-zinc-950 flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-xl mb-4">😕 {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-2 rounded-full"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-zinc-950">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <YouTube
        videoId={videoId.youtubeId}
        opts={videoOptions}
        onReady={handleReady}
        onError={handleError}
        onStateChange={handleStateChange}
        className="w-full h-full"
      />

      {/* Points and Combo Display */}
      <div className="absolute top-2 right-2 flex items-center gap-2">
        <div className={`bg-gradient-to-br from-purple-900 via-purple-800 to-fuchsia-900 px-4 py-1 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-500/30 ${combo > 1 ? 'animate-pulse-custom' : ''}`}>
          <span className="text-white text-sm font-bold">{combo}x</span>
        </div>
        <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-fuchsia-900 px-4 py-1 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-500/30">
          <span className="text-white text-sm">⭐</span>
          <span className="text-white text-sm font-bold">{points}</span>
        </div>
      </div>

      {/* Volume Control */}
      <div 
        className="absolute bottom-12 left-2 flex items-center gap-2"
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        <button
          onClick={toggleMute}
          className="bg-zinc-900/80 p-2 rounded-full backdrop-blur-sm hover:bg-zinc-800/80 transition-colors"
        >
          <span className="text-white text-lg">
            {isMuted ? '🔇' : volume > 50 ? '🔊' : volume > 0 ? '🔉' : '🔈'}
          </span>
        </button>
        {showVolumeSlider && (
          <div className="h-8 w-24 bg-zinc-900/80 rounded-full backdrop-blur-sm flex items-center px-2">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>
        )}
      </div>

      {/* PiP Button */}
      <button
        onClick={togglePiP}
        className="absolute bottom-12 right-2 bg-zinc-900/80 p-2 rounded-full backdrop-blur-sm hover:bg-zinc-800/80 transition-colors"
      >
        <span className="text-white text-lg">{isPiP ? '📺' : '🖼️'}</span>
      </button>

      {/* Progress Bar with Hover Preview */}
      <div 
        className="absolute bottom-0 left-0 right-0"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const percent = (e.clientX - rect.left) / rect.width;
          setHoverTime(percent * duration);
        }}
        onMouseLeave={() => setHoverTime(null)}
      >
        {hoverTime !== null && (
          <div 
            className="absolute bottom-full mb-2 px-2 py-1 bg-zinc-900/90 rounded text-white text-sm transform -translate-x-1/2"
            style={{ left: `${(hoverTime / duration) * 100}%` }}
          >
            {Math.floor(hoverTime / 60)}:{Math.floor(hoverTime % 60).toString().padStart(2, '0')}
          </div>
        )}
        <div className="w-full h-2 bg-zinc-900/80 relative backdrop-blur-sm">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full transform scale-100 transition-all duration-300 ${
                milestone.claimed
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 opacity-50'
                  : milestone.isSpecial
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 shadow-[0_0_8px_rgba(255,165,0,0.6)]'
                    : 'bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]'
              }`}
              style={{ 
                left: `${(milestone.time / duration) * 100}%`,
              }}
            />
          ))}
          <div 
            className="h-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 transition-all duration-1000 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
      </div>

      {/* Milestone Toast */}
      {showMilestone && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-fade-up">
          <div className="bg-gradient-to-br from-zinc-900/95 to-black/95 text-white px-6 py-3 rounded-2xl text-center shadow-[0_0_20px_rgba(0,0,0,0.4)] border border-zinc-800/50 backdrop-blur-sm min-w-[200px]">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 animate-pulse" />
              <p className="text-base font-medium bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">{milestoneText}</p>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {/* Final Reward Popup */}
      {showReward && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-zinc-900 via-zinc-900 to-black rounded-2xl p-8 max-w-sm mx-4 text-center transform shadow-[0_0_30px_rgba(168,85,247,0.3)] border border-purple-500/20">
            <div className="text-6xl mb-4">👑</div>
            <h2 className="text-3xl font-bold text-white mb-4">Incredible!</h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-fuchsia-900 rounded-xl p-4 border border-purple-500/30">
                <p className="text-white text-lg mb-2">Total Points Earned:</p>
                <div className="text-4xl font-bold text-white flex items-center justify-center gap-2">
                  <span>⭐</span>
                  <span>{points}/{MAX_POINTS}</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-xl p-4 border border-blue-500/30">
                <p className="text-white text-lg mb-2">Bonus Reward:</p>
                <p className="text-3xl font-bold text-white">$100</p>
              </div>
            </div>
            <button
              onClick={() => setShowReward(false)}
              className="mt-6 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-purple-500 hover:to-fuchsia-500 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-500/30"
            >
              Claim All Rewards
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
