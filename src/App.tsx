import React, { useState, useEffect } from 'react';
import { Bot, Music, Shield, Gamepad2, Sparkles, Command, ExternalLink, ChevronLeft, ChevronRight, User, Info, FileText, Star } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CommandSection = ({ title, commands, currentPage, totalPages, onPageChange }: { 
  title: string; 
  commands: Array<{name: string, description: string, usage: string}>;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const COMMANDS_PER_PAGE = 6;
  const startIndex = (currentPage - 1) * COMMANDS_PER_PAGE;
  const endIndex = startIndex + COMMANDS_PER_PAGE;
  const currentCommands = commands.slice(startIndex, endIndex);

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-neutral-800">{title}</h3>
        {totalPages > 1 && (
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-neutral-200 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-neutral-600">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-neutral-200 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      <div className="space-y-4">
        {currentCommands.map((cmd) => (
          <div key={cmd.name} className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-neutral-900 mb-2">{cmd.name}</h4>
            <p className="text-neutral-600 mb-3">{cmd.description}</p>
            <SyntaxHighlighter language="bash" style={atomDark} className="rounded-md">
              {cmd.usage}
            </SyntaxHighlighter>
          </div>
        ))}
      </div>
    </div>
  );
};

// Custom cursor component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [petPosition, setPetPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      // Pet follows cursor with a slight delay
      setTimeout(() => {
        setPetPosition({ x: e.clientX, y: e.clientY });
      }, 100);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div
        className="fixed w-4 h-4 bg-primary rounded-full pointer-events-none z-50 transition-transform duration-100"
        style={{ left: position.x, top: position.y, transform: 'translate(-50%, -50%)' }}
      />
      <div
        className="fixed w-8 h-8 pointer-events-none z-50 transition-all duration-300"
        style={{ left: petPosition.x, top: petPosition.y, transform: 'translate(-50%, -50%)' }}
      >
        <div className="animate-float">
          <Bot className="w-8 h-8 text-primary" />
        </div>
      </div>
    </>
  );
};

// Animated background component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light opacity-20" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0YzAtMS4xLS45LTItMi0ycy0yIC45LTIgMiAuOSAyIDIgMiAyLS45IDItMnptMi0xMmMwLTEuMS0uOS0yLTItMnMtMiAuOS0yIDIgLjkgMiAyIDIgMi0uOSAyLTJ6TTM0IDI2YzAtMS4xLS45LTItMi0ycy0yIC45LTIgMiAuOSAyIDIgMiAyLS45IDItMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
      <div className="absolute inset-0 animate-pulse-slow" />
    </div>
  );
};

// Meet the Founder section
const FounderSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-dark to-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8 animate-float">Meet the Founder</h2>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 animate-pulse-slow">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Adam</h3>
            <p className="text-white/90 text-lg mb-4">
              "I started this project just for fun, but it quickly became something much deeper. 
              What began as a simple bot has evolved into a platform that brings people together 
              and creates meaningful connections."
            </p>
            <p className="text-white/80 italic">
              "I'm still learning and growing every day, and I'm excited to share this journey with everyone."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features section
const FeaturesSection = () => {
  const features = [
    {
      title: "Advanced Music System",
      description: "High-quality music playback with various effects and controls",
      icon: Music
    },
    {
      title: "Fun Games & Activities",
      description: "Engaging games and interactive commands for entertainment",
      icon: Gamepad2
    },
    {
      title: "Server Management",
      description: "Comprehensive tools for server moderation and management",
      icon: Shield
    },
    {
      title: "Customizable Experience",
      description: "Personalize your experience with various settings and options",
      icon: Sparkles
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-primary text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-primary/5 p-6 rounded-lg hover:bg-primary/10 transition-all duration-300 animate-float"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">{feature.title}</h3>
              <p className="text-neutral-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

type SectionKey = 'aura' | 'daily' | 'music' | 'user' | 'server' | 'fun' | 'shop' | 'management' | 'games' | 'utility' | 'moderation';

interface Section {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  commands: Array<{name: string, description: string, usage: string}>;
}

const sections: Record<SectionKey, Section> = {
  aura: {
    title: "Aura Management",
    icon: Command,
    commands: [
      { name: "top", description: "View the aura points leaderboard", usage: "!!top" },
      { name: "aura", description: "Check aura points for a user", usage: "!!aura [@user]" },
      { name: "daily", description: "Request daily aura points", usage: "!!daily" },
      { name: "trade", description: "Trade aura points with another user", usage: "!!trade <@user> <card>" }
    ]
  },
  daily: {
    title: "Daily Activities",
    icon: Command,
    commands: [
      { name: "daily", description: "Claim your daily reward", usage: "!!daily" },
      { name: "weekly", description: "Claim weekly reward", usage: "!!weekly" }
    ]
  },
  music: {
    title: "Music Commands",
    icon: Music,
    commands: [
      { name: "join/leave", description: "Connect/Disconnect voice channel", usage: "!!join\n!!leave" },
      { name: "play", description: "Play a song from YouTube or Spotify", usage: "!!play <song name or URL>" },
      { name: "pause/resume", description: "Pause or resume playback", usage: "!!pause\n!!resume" },
      { name: "next", description: "Skip current track", usage: "!!next" },
      { name: "repeat/autoplay", description: "Toggle repeat/autoplay modes", usage: "!!repeat\n!!autoplay" },
      { name: "volume", description: "Set volume", usage: "!!volume <0-2>" },
      { name: "queue", description: "Display the current playlist", usage: "!!queue" },
      { name: "settings", description: "Change music settings", usage: "!!settings" },
      { name: "nightcore", description: "Toggle nightcore effect", usage: "!!nightcore" },
      { name: "8D", description: "Toggle 8D audio effect", usage: "!!8D" },
      { name: "vaporwave", description: "Toggle vaporwave effect", usage: "!!vaporwave" },
      { name: "cleareffect", description: "Clear all audio effects", usage: "!!cleareffect" }
    ]
  },
  user: {
    title: "User Interaction",
    icon: Command,
    commands: [
      { name: "userinfo", description: "Display user info", usage: "!!userinfo [@user]" },
      { name: "profile", description: "View your profile", usage: "!!profile [@user]" },
      { name: "setnick", description: "Change a member's nickname", usage: "!!setnick <@user> <nickname>" },
      { name: "feedback", description: "Submit feedback", usage: "!!feedback <message>" },
      { name: "avatar", description: "View user's avatar", usage: "!!avatar [@user]" },
      { name: "afk", description: "Set AFK status", usage: "!!afk [reason]" }
    ]
  },
  server: {
    title: "Server Interaction",
    icon: Shield,
    commands: [
      { name: "membercount", description: "Show server member count", usage: "!!membercount" },
      { name: "auditlog", description: "View recent audit logs", usage: "!!auditlog <amount>" },
      { name: "clonechannel", description: "Clone a channel", usage: "!!clonechannel [#channel]" },
      { name: "purge", description: "Purge messages", usage: "!!purge <amount>" },
      { name: "snipe", description: "Retrieve last deleted message", usage: "!!snipe" },
      { name: "timer", description: "Set a countdown timer", usage: "!!timer <seconds>" },
      { name: "instainfo", description: "Get Instagram info", usage: "!!instainfo <URL>" },
      { name: "post", description: "Fetch Instagram posts", usage: "!!post <user> [limit]" },
      { name: "instavideo", description: "Get Instagram video info", usage: "!!instavideo <URL>" },
      { name: "cleanlinks", description: "Clean messages with links", usage: "!!cleanlinks [amount]" },
      { name: "cleanfiles", description: "Clean messages with files", usage: "!!cleanfiles [amount]" },
      { name: "cleanimages", description: "Clean messages with images", usage: "!!cleanimages [amount]" }
    ]
  },
  fun: {
    title: "Fun Commands",
    icon: Sparkles,
    commands: [
      { name: "trivia", description: "Start a trivia game", usage: "!!trivia" },
      { name: "rps", description: "Play Rock, Paper, Scissors", usage: "!!rps" },
      { name: "dice", description: "Roll a dice", usage: "!!dice" },
      { name: "coinflip", description: "Flip a coin", usage: "!!coinflip" },
      { name: "flirt", description: "Flirt with someone", usage: "!!flirt <@user>" },
      { name: "roast", description: "Roast someone", usage: "!!roast <@user>" },
      { name: "love", description: "Love compatibility test", usage: "!!love <@user>" },
      { name: "monopoly", description: "Start a monopoly game", usage: "!!monopoly" },
      { name: "cuddle", description: "Cuddle someone", usage: "!!cuddle <@user>" },
      { name: "hug", description: "Hug someone", usage: "!!hug <@user>" },
      { name: "kiss", description: "Kiss someone", usage: "!!kiss <@user>" },
      { name: "pat", description: "Pat someone", usage: "!!pat <@user>" },
      { name: "slap", description: "Slap someone", usage: "!!slap <@user>" },
      { name: "punch", description: "Punch someone", usage: "!!punch <@user>" },
      { name: "bite", description: "Bite someone", usage: "!!bite <@user>" },
      { name: "highfive", description: "High-five someone", usage: "!!highfive <@user>" },
      { name: "wave", description: "Wave at someone", usage: "!!wave <@user>" },
      { name: "boop", description: "Boop someone", usage: "!!boop <@user>" },
      { name: "snuggle", description: "Snuggle with someone", usage: "!!snuggle <@user>" },
      { name: "bully", description: "Bully someone (playfully)", usage: "!!bully <@user>" },
      { name: "think", description: "Show you're thinking", usage: "!!think" },
      { name: "akinator", description: "Play Akinator", usage: "!!akinator" },
      { name: "wordle", description: "Play Wordle", usage: "!!wordle" }
    ]
  },
  shop: {
    title: "Shop System",
    icon: Command,
    commands: [
      { name: "shop", description: "View available items in the shop", usage: "!!shop" },
      { name: "buy", description: "Purchase an item from the shop", usage: "!!buy <item>" }
    ]
  },
  management: {
    title: "Server Management",
    icon: Shield,
    commands: [
      { name: "kick/ban", description: "Remove members", usage: "!!kick/ban <@user> [reason]" },
      { name: "settempvc", description: "Configure temp VCs", usage: "!!settempvc <channel_id> <category_id>" },
      { name: "interface", description: "Open the temporary VC interface", usage: "!!interface" },
      { name: "stickyvc", description: "Create or mark a sticky VC", usage: "!!stickyvc [name]" },
      { name: "dev-announce", description: "Send a dev announcement", usage: "!!dev-announce <message>" },
      { name: "setprefix", description: "Change the bot's prefix", usage: "!!setprefix <new_prefix>" },
      { name: "setup", description: "Create a custom role command", usage: "!!setup" },
      { name: "setlogchannel", description: "Set logging channel", usage: "!!setlogchannel <#channel>" },
      { name: "setmentionlimit", description: "Set mention spam limit", usage: "!!setmentionlimit <on/off> [limit]" },
      { name: "blocklinks", description: "Toggle link blocking", usage: "!!blocklinks <on/off>" },
      { name: "setwelcome", description: "Set welcome message", usage: "!!setwelcome <message>" }
    ]
  },
  games: {
    title: "Aura Games",
    icon: Gamepad2,
    commands: [
      { name: "dropcard", description: "Get a random card", usage: "!!dropcard" },
      { name: "mycards", description: "View your card collection", usage: "!!mycards" },
      { name: "sellcard", description: "Sell a card for aura points", usage: "!!sellcard <card>" }
    ]
  },
  utility: {
    title: "Utility Commands",
    icon: Command,
    commands: [
      { name: "search", description: "Search anything", usage: "!!search [question]" },
      { name: "imagine", description: "Generate an image using AI", usage: "!!imagine [prompt]" },
      { name: "describe", description: "Analyze an image using AI", usage: "!!describe [image]" },
      { name: "math", description: "Solve math questions", usage: "!!math [question]" },
      { name: "anime", description: "Get anime recommendations", usage: "!!anime" },
      { name: "manga", description: "Get manga recommendations", usage: "!!manga" },
      { name: "movie", description: "Fetch movie information", usage: "!!movie [name]" },
      { name: "weather", description: "Get weather information", usage: "!!weather <location>" },
      { name: "translate", description: "Translate text", usage: "!!translate <lang> <text>" },
      { name: "tts", description: "Text to speech", usage: "!!tts <text>" },
      { name: "finance", description: "Get financial information", usage: "!!finance <query>" },
      { name: "unitconvert", description: "Convert units", usage: "!!unitconvert <value> <from> to <to>" },
      { name: "programming", description: "Programming related queries", usage: "!!programming <query>" },
      { name: "health", description: "Health related information", usage: "!!health <query>" }
    ]
  },
  moderation: {
    title: "Moderation",
    icon: Shield,
    commands: [
      { name: "chatban", description: "Mute user from chat", usage: "!!chatban @member [reason]" },
      { name: "vcban", description: "Ban from voice channels", usage: "!!vcban @member [reason]" },
      { name: "vcmute", description: "Mute in voice channels", usage: "!!vcmute @member" },
      { name: "vcdeafen", description: "Deafen in voice channels", usage: "!!vcdeafen @member" },
      { name: "vcdrag", description: "Move everyone to a new channel", usage: "!!vcdrag" },
      { name: "lock", description: "Lock a channel", usage: "!!lock [#channel]" },
      { name: "unlock", description: "Unlock a channel", usage: "!!unlock [#channel]" },
      { name: "lockall", description: "Lock all channels", usage: "!!lockall [reason]" },
      { name: "unlockall", description: "Unlock all channels", usage: "!!unlockall [reason]" },
      { name: "warn", description: "Warn a user", usage: "!!warn <@user> [reason]" },
      { name: "mute", description: "Mute a user", usage: "!!mute <@user> [duration] [reason]" },
      { name: "unmute", description: "Unmute a user", usage: "!!unmute <@user>" }
    ]
  }
};

function App() {
  const [activeSection, setActiveSection] = useState<SectionKey>('aura');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSectionChange = (section: SectionKey) => {
    setActiveSection(section);
    setCurrentPage(1);
  };

  const calculateTotalPages = (commands: Array<any>) => {
    return Math.ceil(commands.length / 6);
  };

  return (
    <div className="min-h-screen bg-neutral-100 relative">
      <CustomCursor />
      <AnimatedBackground />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-dark via-primary to-primary">
        <div className="container mx-auto px-4 py-16">
          <nav className="flex justify-between items-center mb-16">
            <div className="flex items-center space-x-2">
              <Bot className="w-8 h-8 text-white animate-spin-slow" />
              <span className="text-2xl font-bold text-white">Jojo Bot</span>
            </div>
            <div className="flex space-x-6">
              <a href="#features" className="text-white hover:text-primary-light transition-colors">Features</a>
              <a href="#founder" className="text-white hover:text-primary-light transition-colors">About</a>
              <a href="#commands" className="text-white hover:text-primary-light transition-colors">Commands</a>
            </div>
          </nav>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-6 animate-float">
              Your Ultimate Discord Companion
            </h1>
            <p className="text-xl text-white/90 mb-8 animate-pulse-slow">
              Experience the power of Jojo Bot with advanced features and endless possibilities
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary-light hover:text-white transition-all duration-300 animate-bounce-slow">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <FeaturesSection />
      <FounderSection />

      {/* Existing commands section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-wrap gap-4 mb-8">
          {Object.entries(sections).map(([key, section]) => (
            <button
              key={key}
              onClick={() => handleSectionChange(key as SectionKey)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeSection === key
                  ? 'bg-primary text-white'
                  : 'bg-white text-primary hover:bg-primary/10'
              }`}
            >
              <div className="flex items-center space-x-2">
                <section.icon className="w-5 h-5" />
                <span>{section.title}</span>
              </div>
            </button>
          ))}
        </div>

        <CommandSection
          title={sections[activeSection].title}
          commands={sections[activeSection].commands}
          currentPage={currentPage}
          totalPages={calculateTotalPages(sections[activeSection].commands)}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Jojo Bot</h3>
              <p className="text-white/80">
                Your ultimate Discord companion for fun, moderation, and more.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-white/80 hover:text-white">Features</a></li>
                <li><a href="#commands" className="text-white/80 hover:text-white">Commands</a></li>
                <li><a href="#founder" className="text-white/80 hover:text-white">About</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-white/80 hover:text-white">Privacy Policy</a></li>
                <li><a href="/terms" className="text-white/80 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/60">
            <p>© 2024 Jojo Bot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;