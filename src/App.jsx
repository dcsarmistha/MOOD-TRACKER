import React, { useState, useEffect } from 'react'

const App = () => {
  const [mood, setMood] = useState(null)
  const [thoughts, setThoughts] = useState('')
  const [quote, setQuote] = useState(null)
  const [quotes, setQuotes] = useState([])
  const [isDark, setIsDark] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const moodQuotes = {
    Sad: [
      { content: "Tears are words that need to be written.", author: "Paulo Coelho" },
      { content: "Every storm runs out of rain, just like every dark night turns into day.", author: "Gary Allan" },
      { content: "The soul would have no rainbow if the eyes had no tears.", author: "Native American Proverb" }
    ],
    Happy: [
      { content: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
      { content: "The happiest people don't have the best of everything, they make the best of everything.", author: "Unknown" },
      { content: "Joy is the simplest form of gratitude.", author: "Karl Barth" }
    ],
    Excited: [
      { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
      { content: "Every great dream begins with a dreamer. Always remember, you have within you the strength, the patience, and the passion to reach for the stars to change the world.", author: "Harriet Tubman" },
      { content: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" }
    ],
    Calm: [
      { content: "Peace is the result of retraining your mind to process life as it is, rather than as you think it should be.", author: "Wayne Dyer" },
      { content: "Calm mind brings inner strength and self-confidence, so that's very important for good health.", author: "Dalai Lama" },
      { content: "In the midst of movement and chaos, keep stillness inside of you.", author: "Deepak Chopra" }
    ],
    Angry: [
      { content: "For every minute you remain angry, you give up sixty seconds of peace of mind.", author: "Ralph Waldo Emerson" },
      { content: "Anger is an acid that can do more harm to the vessel in which it is stored than to anything on which it is poured.", author: "Mark Twain" },
      { content: "When anger rises, think of the consequences.", author: "Confucius" }
    ],
    Tired: [
      { content: "Rest when you're weary. Refresh and renew yourself, your body, your mind, your spirit. Then get back to work.", author: "Ralph Marston" },
      { content: "Sometimes the most productive thing you can do is relax.", author: "Mark Black" },
      { content: "Your body is a temple, but only if you treat it as one.", author: "Astrid Alauda" }
    ]
  }

  const moods = [
    { emoji: '😢', label: 'Sad', color: 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700' },
    { emoji: '😊', label: 'Happy', color: 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-700' },
    { emoji: '😄', label: 'Excited', color: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-700' },
    { emoji: '😌', label: 'Calm', color: 'bg-indigo-100 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700' },
    { emoji: '😡', label: 'Angry', color: 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-700' },
    { emoji: '😴', label: 'Tired', color: 'bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700' }
  ]

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(prefersDark)
      document.documentElement.classList.toggle('dark', prefersDark)
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', !isDark ? 'dark' : 'light')
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  const getMoodBasedQuote = (selectedMood) => {
    const quotes = moodQuotes[selectedMood.label] || moodQuotes.Happy
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    return {
      id: Date.now(),
      content: randomQuote.content,
      author: randomQuote.author,
      mood: selectedMood,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  }

  const fetchQuote = async () => {
    setIsLoading(true)
    try {
      // Use mood-based quotes instead of API
      const newQuote = getMoodBasedQuote(mood)
      setQuote(newQuote)
      setQuotes(prev => [newQuote, ...prev.slice(0, 19)]) // Keep only last 20 quotes
    } catch (error) {
      console.error('Error fetching quote:', error)
      const fallbackQuote = {
        id: Date.now(),
        content: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        mood: mood,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setQuote(fallbackQuote)
      setQuotes(prev => [fallbackQuote, ...prev.slice(0, 19)])
    } finally {
      setIsLoading(false)
    }
  }

  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood)
    fetchQuote()
  }

  const handleThoughtSubmit = (e) => {
    e.preventDefault()
    if (thoughts.trim() || mood) {
      fetchQuote()
      setThoughts('')
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-800'
    }`}>
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-10 left-10 w-20 h-20 rounded-full opacity-40 animate-float ${
          isDark ? 'bg-blue-900/20' : 'bg-blue-200'
        }`}></div>
        <div className={`absolute top-40 right-20 w-16 h-16 rounded-full opacity-30 animate-float ${
          isDark ? 'bg-green-900/20' : 'bg-green-200'
        }`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute bottom-20 left-20 w-24 h-24 rounded-full opacity-25 animate-float ${
          isDark ? 'bg-indigo-900/20' : 'bg-indigo-200'
        }`} style={{ animationDelay: '2s' }}></div>
      </div>

    
      <header className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 ${
          isDark ? 'opacity-20' : 'opacity-10'
        }`}></div>
        <div className="relative max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 animate-fade-in-up">
            <div>
              <h1 className="text-4xl font-bold">
                {getGreeting()}
              </h1>
              <p className={`text-lg mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                How are you feeling today?
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className={`px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm border shadow-sm hover:shadow-md ${
                isDark 
                  ? 'bg-gray-800/80 border-gray-700 hover:bg-gray-700 text-gray-300' 
                  : 'bg-white/80 border-gray-200 hover:bg-white text-gray-700'
              }`}
            >
              {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 py-8">
     
        <section className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-semibold mb-6 text-center">Select Your Mood</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {moods.map((moodItem, index) => (
              <button
                key={moodItem.label}
                onClick={() => handleMoodSelect(moodItem)}
                className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 border-2 backdrop-blur-sm shadow-sm animate-bounce-in ${
                  mood?.label === moodItem.label
                    ? 'border-blue-500 scale-105 shadow-lg animate-pulse-glow'
                    : `hover:border-blue-300 dark:hover:border-blue-600 ${moodItem.color}`
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-2">{moodItem.emoji}</div>
                <div className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  {moodItem.label}
                </div>
              </button>
            ))}
          </div>
        </section>

   
        <section className="mb-12 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <form onSubmit={handleThoughtSubmit} className="space-y-4">
            <label className="block text-xl font-semibold text-center">
              Share Your Thoughts
            </label>
            <div className="relative">
              <textarea
                value={thoughts}
                onChange={(e) => setThoughts(e.target.value)}
                placeholder="What's on your mind today?"
                className={`w-full h-32 p-4 rounded-2xl border backdrop-blur-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-sm focus:shadow-md placeholder-gray-500 ${
                  isDark 
                    ? 'bg-gray-800/80 border-gray-600 text-gray-100 placeholder-gray-400' 
                    : 'bg-white/80 border-gray-300 text-gray-800'
                }`}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Loading...
                </span>
              ) : (
                'Save Entry & Get Inspired'
              )}
            </button>
          </form>
        </section>

        {quote && (
          <section className="mb-12 max-w-4xl mx-auto animate-scale-in">
            <h2 className="text-2xl font-semibold mb-6 text-center">Your Inspiration</h2>
            <div className={`backdrop-blur-sm rounded-3xl p-8 shadow-lg border transform transition-all duration-500 hover:shadow-xl ${
              isDark 
                ? 'bg-gray-800/80 border-gray-700' 
                : 'bg-white/80 border-gray-200'
            }`}>
              <div className="text-6xl mb-4 text-center animate-float">✨</div>
              <p className={`text-xl text-center italic mb-4 leading-relaxed ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}>
                "{quote.content}"
              </p>
              <p className={`text-right text-lg font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                — {quote.author}
              </p>
              {mood && (
                <div className={`flex items-center justify-center mt-4 gap-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <span className="text-2xl">{mood.emoji}</span>
                  <span className="text-sm">{mood.label} • {quote.timestamp}</span>
                </div>
              )}
            </div>
          </section>
        )}

    
        {quotes.length > 0 && (
          <section className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-2xl font-semibold mb-6 text-center">Your Mood Journey</h2>
            <div className="pinterest-grid">
              {quotes.map((quoteItem, index) => (
                <div
                  key={quoteItem.id}
                  className={`quote-card backdrop-blur-sm rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in ${
                    isDark 
                      ? 'bg-gray-800/80 border-gray-700' 
                      : 'bg-white/80 border-gray-200'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <p className={`text-lg italic mb-4 leading-relaxed ${
                    isDark ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    "{quoteItem.content}"
                  </p>
                  <p className={`text-right font-medium mb-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    — {quoteItem.author}
                  </p>
                  {quoteItem.mood && (
                    <div className={`flex items-center justify-between text-sm ${
                      isDark ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      <span className="flex items-center gap-2">
                        <span className="text-2xl">{quoteItem.mood.emoji}</span>
                        {quoteItem.mood.label}
                      </span>
                      <span>{quoteItem.timestamp}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>


      <footer className={`relative text-center py-8 text-sm ${
        isDark ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <p>Made with ❤️ for tracking your daily moods and thoughts</p>
      </footer>
    </div>
  )
}

export default App