import { FC, useRef } from 'react';

interface Comment {
  id: string;
  content: string;
  username: string;
  avatar: string;
  likes: number;
  createdAt: string;
}

interface CommentsSectionProps {
  comments: Comment[];
  showComments: boolean;
  setShowComments: (show: boolean) => void;
  newComment: string;
  setNewComment: (comment: string) => void;
}

const CommentsSection: FC<CommentsSectionProps> = ({
  comments,
  showComments,
  setShowComments,
  newComment,
  setNewComment,
}) => {
  const commentsRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Comments Preview */}
      <div className="py-4 px-4 border-t border-gray-800">
        <button 
          onClick={() => setShowComments(true)} 
          className="w-full text-left hover:bg-gray-800/50 rounded-lg transition-colors duration-200 p-3"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <span className="text-[16px] font-semibold">Comments</span>
              <span className="text-[14px] text-gray-400 font-medium">{comments.length}</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
          {comments[0] && (
            <div className="flex items-start gap-3">
              <img
                src={comments[0].avatar}
                alt={comments[0].username}
                className="w-7 h-7 rounded-full flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[13px] font-medium text-gray-300">{comments[0].username}</span>
                <p className="text-[14px] text-gray-400 line-clamp-1 mt-0.5">{comments[0].content}</p>
              </div>
            </div>
          )}
        </button>
      </div>

      {/* Comments Modal */}
      {showComments && (
        <div className="fixed inset-0 bg-black/60 z-50">
          <div
            ref={commentsRef}
            className="absolute bottom-0 left-0 right-0 bg-zinc-900 rounded-t-xl max-h-[85vh] overflow-hidden transform transition-transform duration-300 ease-out"
            style={{
              transform: showComments ? 'translateY(0)' : 'translateY(100%)',
            }}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-zinc-900 border-b border-gray-800 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-medium">Comments</span>
                  <span className="text-[14px] text-gray-400">{comments.length}</span>
                </div>
                <button
                  onClick={() => setShowComments(false)}
                  className="p-2 hover:bg-gray-800 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              {/* Comment Input */}
              <div className="flex items-start gap-3 mt-4 pb-3">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                  alt="Your avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <div className="relative">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      rows={1}
                      className="w-full bg-gray-800/50 rounded-lg px-4 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      style={{
                        minHeight: '40px',
                        height: 'auto',
                      }}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = target.scrollHeight + 'px';
                      }}
                    />
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => {
                        if (newComment.trim()) {
                          // Handle post comment logic here
                          setNewComment('');
                        }
                      }}
                      disabled={!newComment.trim()}
                      className="px-4 py-1.5 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="p-4 overflow-y-auto max-h-[calc(85vh-140px)]">
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 animate-fadeIn group">
                    <img
                      src={comment.avatar}
                      alt={comment.username}
                      className="w-8 h-8 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[13px] hover:underline cursor-pointer">
                          {comment.username}
                        </span>
                        <span className="text-[12px] text-gray-400">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-[14px] mt-1 break-words text-gray-100">{comment.content}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
                          </svg>
                          <span className="text-[12px]">{comment.likes}</span>
                        </button>
                        <button className="text-[12px] hover:text-blue-400 transition-colors">Reply</button>
                      </div>
                    </div>
                    <button className="p-1.5 text-gray-400 rounded-full hover:bg-gray-800 opacity-0 group-hover:opacity-100 transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentsSection;
