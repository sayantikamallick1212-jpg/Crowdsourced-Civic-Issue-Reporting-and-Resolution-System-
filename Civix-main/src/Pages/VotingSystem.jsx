import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Vote, 
  BarChart3, 
  Users, 
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import VotingFeedbackModal from '../components/voting/VotingFeedbackModal';
import toast from 'react-hot-toast';

const VotingSystem = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [polls, setPolls] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newOptions, setNewOptions] = useState('');
  const [votedPolls, setVotedPolls] = useState(new Set());
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [currentPollForFeedback, setCurrentPollForFeedback] = useState(null);

  const handleVote = (pollId, optionIndex) => {
    if (votedPolls.has(pollId)) return;
    setPolls((prevPolls) =>
      prevPolls.map((poll) => {
        if (poll.id === pollId) {
          const updatedVotes = [...poll.votes];
          updatedVotes[optionIndex] = (updatedVotes[optionIndex] || 0) + 1;
          return { ...poll, votes: updatedVotes };
        }
        return poll;
      })
    );
    setVotedPolls(prev => new Set([...prev, pollId]));
    const poll = polls.find(p => p.id === pollId);
    setCurrentPollForFeedback(poll);
    setShowFeedbackModal(true);
  };

  const handleFeedbackSubmit = async (formData) => {
    try {
      toast.success('Thank you for your feedback!');
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again.');
    }
  };

  const handleCreatePoll = (e) => {
    e.preventDefault();
    const optionsArray = newOptions.split('\n').map(opt => opt.trim()).filter(opt => opt);
    if (!newTitle.trim() || optionsArray.length < 2) return;
    const newPoll = {
      id: Date.now(),
      title: newTitle.trim(),
      options: optionsArray,
      votes: Array(optionsArray.length).fill(0),
    };
    setPolls((prevPolls) => [...prevPolls, newPoll]);
    setNewTitle('');
    setNewOptions('');
    setActiveTab('browse');
  };

  const getTotalVotes = (poll) => poll.votes.reduce((a, v) => a + v, 0);
  const getVotePercentage = (votes, total) => total > 0 ? Math.round((votes / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white/90 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-emerald-400 to-teal-400 dark:from-green-500 dark:to-emerald-600 rounded-3xl mb-6 shadow-xl">
            <Vote className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-4 pb-2">
            Voting System
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Create polls, vote, and view results, all in a secure, beautiful platform.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {/* Stat Card */}
          {[
            {
              icon: <Vote className="w-7 h-7 text-emerald-600 dark:text-emerald-400"/>,
              label: "Active Polls",
              value: polls.length,
              bg: "from-emerald-100 to-teal-100 dark:from-green-900 dark:to-emerald-900"
            },
            {
              icon: <Users className="w-7 h-7 text-teal-600 dark:text-teal-400"/>,
              label: "Total Votes",
              value: polls.reduce((acc, poll) => acc + poll.votes.reduce((a, v) => a + v, 0), 0),
              bg: "from-teal-100 to-lime-100 dark:from-teal-900 dark:to-lime-900"
            },
            {
              icon: <TrendingUp className="w-7 h-7 text-lime-600 dark:text-lime-400"/>,
              label: "Engagement",
              value: polls.length > 0 ? Math.round(
                polls.reduce((acc, poll) => acc + getTotalVotes(poll), 0) / polls.length
              ) : 0,
              bg: "from-lime-100 to-emerald-100 dark:from-lime-900 dark:to-emerald-900"
            }
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-tl ${stat.bg} backdrop-blur-md border border-emerald-100 dark:border-gray-700 rounded-2xl p-6 shadow-md flex items-center gap-4`}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/70 dark:bg-black/25 flex items-center justify-center shadow">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">{stat.label}</p>
                <div className="text-3xl font-extrabold text-gray-900 dark:text-white">{stat.value}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-emerald-100 dark:border-gray-700 rounded-2xl shadow-xl mb-8 overflow-hidden"
        >
          <div className="flex">
            {[
              { id: 'browse', label: 'Browse Polls', icon: Vote },
              { id: 'create', label: 'Create Poll', icon: Plus },
              { id: 'results', label: 'Analytics', icon: BarChart3 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center px-8 py-6 text-base font-semibold transition-all duration-300 relative focus:outline-none capitalize ${
                  activeTab === tab.id
                    ? 'text-emerald-600 dark:text-emerald-400 bg-gradient-to-b from-emerald-50 dark:from-emerald-950'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-3" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabBar"
                    className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 dark:from-emerald-600 dark:to-teal-600 rounded"
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-2xl border border-emerald-100/60 dark:border-gray-700 rounded-2xl shadow-2xl p-8"
        >
          {/* Browse Polls */}
          {activeTab === 'browse' && (
            <div className="space-y-8">
              {polls.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow">
                    <Vote className="w-12 h-12 text-emerald-500 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No polls yet</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Create your first poll to get started!
                  </p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg"
                  >
                    Create Poll
                  </button>
                </div>
              ) : (
                polls.map((poll) => {
                  const totalVotes = getTotalVotes(poll);
                  const hasVoted = votedPolls.has(poll.id);
                  return (
                    <div key={poll.id} className="border border-emerald-200/70 dark:border-emerald-900 rounded-xl p-6 bg-gradient-to-br from-white via-emerald-50/80 to-white/80 dark:from-gray-900 dark:to-emerald-950 hover:shadow-xl transition-all duration-300">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{poll.title}</h3>
                      {!hasVoted ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {poll.options.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleVote(poll.id, idx)}
                              className="bg-white/90 dark:bg-emerald-950 border-2 border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900 text-gray-900 dark:text-gray-100 px-6 py-4 rounded-xl font-medium transition-all duration-300 hover:shadow-md text-left"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {poll.options.map((option, idx) => {
                            const votes = poll.votes[idx] || 0;
                            const percentage = getVotePercentage(votes, totalVotes);
                            return (
                              <div key={idx} className="bg-white/95 dark:bg-emerald-950 rounded-lg p-4 border border-emerald-200/80 dark:border-emerald-800">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-medium text-gray-900 dark:text-white">{option}</span>
                                  <span className="text-sm text-gray-600 dark:text-gray-300">{votes} votes ({percentage}%)</span>
                                </div>
                                <div className="w-full bg-emerald-100 dark:bg-emerald-900 rounded-full h-2">
                                  <motion.div
                                    className="bg-gradient-to-r from-emerald-400 to-teal-400 dark:from-emerald-600 dark:to-teal-600 h-2 rounded-full"
                                    animate={{ width: `${percentage}%` }}
                                    style={{ width: `${percentage}%` }}
                                    transition={{ duration: 0.8 }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mt-4">
                            <div className="flex items-center">
                              <CheckCircle2 className="w-5 h-5 mr-2" />
                              <span className="font-medium">You voted in this poll</span>
                            </div>
                            <button
                              onClick={() => {
                                setCurrentPollForFeedback(poll);
                                setShowFeedbackModal(true);
                              }}
                              className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline"
                            >
                              Share feedback
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Create Poll */}
          {activeTab === 'create' && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create New Poll</h2>
                <p className="text-gray-600 dark:text-gray-300">Design a poll to gather opinions</p>
              </div>
              <form className="space-y-6" onSubmit={handleCreatePoll}>
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Poll Question
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full rounded-xl border-2 border-emerald-200 dark:border-emerald-800 px-4 py-3 text-lg focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-100 dark:focus:ring-emerald-800 transition-all duration-300 bg-white dark:bg-emerald-950 text-gray-900 dark:text-white"
                    placeholder="What would you like to ask?"
                  />
                </div>
                <div>
                  <label htmlFor="options" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Answer Options
                  </label>
                  <textarea
                    id="options"
                    value={newOptions}
                    onChange={(e) => setNewOptions(e.target.value)}
                    rows={5}
                    className="w-full rounded-xl border-2 border-emerald-200 dark:border-emerald-800 px-4 py-3 text-lg focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-100 dark:focus:ring-emerald-800 transition-all duration-300 bg-white dark:bg-emerald-950 text-gray-900 dark:text-white resize-none"
                    placeholder="Each option on a new line"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Enter at least 2 options</p>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Poll
                </button>
              </form>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'results' && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Poll Analytics</h2>
                <p className="text-gray-600 dark:text-gray-300">Insights & voting patterns</p>
              </div>
              <div className="space-y-8">
                {polls.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-5">
                      <BarChart3 className="w-12 h-12 text-emerald-500 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No analytics available</h3>
                    <p className="text-gray-600 dark:text-gray-300">Create and vote on polls to see analytics.</p>
                  </div>
                ) : (
                  polls.map((poll) => {
                    const totalVotes = getTotalVotes(poll);
                    const topVotes = Math.max(...poll.votes);
                    return (
                      <div key={poll.id} className="border border-emerald-200 dark:border-emerald-900 rounded-xl p-6 bg-gradient-to-br from-white via-emerald-50/70 to-white/80 dark:from-emerald-950 dark:to-emerald-900">
                        <div className="flex flex-wrap justify-between items-start mb-6 gap-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{poll.title}</h3>
                            <span className="text-gray-600 dark:text-gray-300">Total responses: {totalVotes}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Engagement</span>
                            <div className="text-xl font-bold text-emerald-700 dark:text-emerald-400">{totalVotes > 0 ? '100%' : '0%'}</div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {poll.options.map((option, idx) => {
                            const votes = poll.votes[idx] || 0;
                            const percentage = getVotePercentage(votes, totalVotes);
                            const leading = votes === topVotes && totalVotes > 0;
                            return (
                              <div key={idx} className="bg-white/95 dark:bg-emerald-950 rounded-lg p-4 border border-emerald-200 dark:border-emerald-900">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-semibold text-gray-900 dark:text-white">{option} {leading && totalVotes > 0 &&
                                    <span className="ml-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-200 text-xs font-medium px-2 py-0.5 rounded-full animate-pulse">Leading</span>
                                  }</span>
                                  <span className="font-bold text-gray-900 dark:text-white">{votes}</span>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">{percentage}%</span>
                                </div>
                                <div className="w-full bg-emerald-100 dark:bg-emerald-900 rounded-full h-3">
                                  <div
                                    className={`h-3 rounded-full transition-all duration-700 ${leading ? 'bg-gradient-to-r from-emerald-500 to-teal-400 dark:from-emerald-600 dark:to-teal-600' : 'bg-gradient-to-r from-emerald-300 to-teal-300 dark:from-emerald-700 dark:to-teal-700'}`}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Feedback Modal */}
      <VotingFeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onSubmit={handleFeedbackSubmit}
        pollTitle={currentPollForFeedback?.title}
      />
    </div>
  );
};

export default VotingSystem;
