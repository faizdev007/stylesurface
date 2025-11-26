
import React from 'react';
import { CheckCheck, MoreVertical, Phone, Video, ArrowLeft, Heart, Send, Battery, Wifi, Signal } from 'lucide-react';

// Default Data (Fallback)
const defaultChats = [
  {
    platform: 'whatsapp',
    name: 'Rahul - Furniture Mfg',
    role: 'Bulk Buyer',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    messages: [
      { side: 'right', text: "Hi team, received the 50 sheets of Acrylic today.", time: "10:30 AM" },
      { side: 'right', text: "Packaging was solid. No scratches at all! ⭐", time: "10:31 AM" },
      { side: 'left', text: "Glad to hear that Rahul! We added extra corner guards this time.", time: "10:35 AM" },
      { side: 'right', text: "Yeah, it worked. Will send the next order PO by evening.", time: "10:45 AM" },
    ]
  },
  {
    platform: 'instagram',
    name: 'design_studio_x',
    role: 'Interior Designer',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=300&auto=format&fit=crop',
    messages: [
      { side: 'left', text: "Hey! Just installed the Ubuntu sheets for the vanity.", time: "2h" },
      { side: 'left', text: "Carpenters are loving the calibration. Zero undulations! 😍", time: "2h" },
      { side: 'right', text: "Music to our ears! 🛠️✨ Can't wait to see the final pics.", time: "1h" },
    ]
  },
  {
    platform: 'whatsapp',
    name: 'Vikram Signs',
    role: 'Distributor',
    avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
    messages: [
      { side: 'left', text: "Sir, the 12mm Clear Acrylic quality is superb.", time: "4:20 PM" },
      { side: 'left', text: "Laser cutting edges are coming out crystal clear.", time: "4:21 PM" },
      { side: 'right', text: "That's great Vikram. It's 100% virgin monomer casting.", time: "4:25 PM" },
      { side: 'left', text: "Much better than the imported ones we used last year. 👍", time: "4:26 PM" },
    ]
  },
  {
    platform: 'instagram',
    name: 'eco_spaces_arch',
    role: 'Architect',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=300&auto=format&fit=crop',
    messages: [
      { side: 'left', text: "The Cork wall tiles look stunning in the lobby! 🌿", time: "5h" },
      { side: 'right', text: "Wow, that texture pops! Thanks for choosing sustainable.", time: "4h" },
      { side: 'left', text: "Client is super happy with the acoustic dampening too.", time: "4h" },
    ]
  },
  {
    platform: 'whatsapp',
    name: 'Priya Industrial',
    role: 'Purchase Head',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    messages: [
      { side: 'right', text: "Can we repeat the last order for rubberized cork?", time: "Yesterday" },
      { side: 'right', text: "The gasket performance is excellent under high pressure.", time: "Yesterday" },
      { side: 'left', text: "Sure Priya, raising the PI now. Same quantity?", time: "Today" },
      { side: 'right', text: "Yes, same. Make it urgent delivery pls 🚚", time: "Today" },
    ]
  }
];

const MobileStatusBar = ({ dark = false }) => (
  <div className={`flex justify-between items-center px-4 py-1 text-[10px] font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>
    <span>9:41</span>
    <div className="flex gap-1.5">
      <Signal className="w-3 h-3" />
      <Wifi className="w-3 h-3" />
      <Battery className="w-3 h-3" />
    </div>
  </div>
);

const WhatsAppCard = ({ data }: { data: any }) => (
  <div className="bg-[#E5DDD5] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-gray-900 transform hover:-translate-y-2 transition-transform duration-300 w-full max-w-[320px] mx-auto relative">
    {/* Status Bar */}
    <div className="bg-[#075E54]">
      <MobileStatusBar dark />
      {/* Header */}
      <div className="flex items-center gap-3 px-3 py-2 text-white">
        <ArrowLeft className="w-5 h-5" />
        <img src={data.avatar} alt="avatar" className="w-9 h-9 rounded-full border border-white/20" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate">{data.name}</p>
          <p className="text-[10px] opacity-80 truncate">online</p>
        </div>
        <div className="flex gap-4 pr-1">
          <Video className="w-5 h-5" />
          <Phone className="w-4 h-4" />
          <MoreVertical className="w-4 h-4" />
        </div>
      </div>
    </div>

    {/* Chat Area */}
    <div className="p-4 space-y-3 min-h-[300px] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-opacity-10">
      <div className="flex justify-center mb-4">
        <span className="bg-[#dcf8c6] text-gray-600 text-[10px] px-2 py-1 rounded shadow-sm">Today</span>
      </div>
      
      {data.messages.map((msg: any, idx: number) => (
        <div key={idx} className={`flex ${msg.side === 'right' ? 'justify-start' : 'justify-end'}`}>
          <div 
            className={`max-w-[85%] p-2 rounded-lg shadow-sm text-xs relative leading-relaxed
              ${msg.side === 'right' 
                ? 'bg-white rounded-tl-none text-gray-800' 
                : 'bg-[#E7FFDB] rounded-tr-none text-gray-800'
              }`}
          >
            <p>{msg.text}</p>
            <div className="flex justify-end items-center gap-1 mt-1 opacity-60">
              <span className="text-[9px]">{msg.time}</span>
              {msg.side === 'left' && <CheckCheck className="w-3 h-3 text-blue-500" />}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Input Area Mock */}
    <div className="bg-gray-100 px-2 py-2 flex items-center gap-2">
      <div className="bg-white rounded-full h-8 flex-1 border border-gray-200"></div>
      <div className="bg-[#008069] w-9 h-9 rounded-full flex items-center justify-center text-white shadow-sm">
        <Send className="w-4 h-4" />
      </div>
    </div>
  </div>
);

const InstagramCard = ({ data }: { data: any }) => (
  <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border-4 border-gray-900 transform hover:-translate-y-2 transition-transform duration-300 w-full max-w-[320px] mx-auto">
    <MobileStatusBar />
    
    {/* Header */}
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <ArrowLeft className="w-6 h-6 text-gray-800" />
        <div>
          <h4 className="font-bold text-sm text-gray-900">{data.name}</h4>
          <p className="text-[10px] text-gray-500">Active now</p>
        </div>
      </div>
      <div className="flex gap-4 text-gray-800">
        <Phone className="w-6 h-6" />
        <Video className="w-6 h-6" />
      </div>
    </div>

    {/* Chat Area */}
    <div className="p-4 space-y-4 min-h-[320px] flex flex-col">
      {/* Date */}
      <div className="text-center text-[10px] text-gray-400 font-medium">Sep 24, 12:42 PM</div>

      {/* Chat Bubbles */}
      {data.messages.map((msg: any, idx: number) => (
        <div key={idx} className={`flex items-end gap-2 ${msg.side === 'right' ? 'flex-row-reverse' : ''}`}>
          {msg.side === 'left' && (
            <img src={data.avatar} className="w-6 h-6 rounded-full border border-gray-100" alt="user" />
          )}
          <div 
            className={`px-4 py-2.5 max-w-[75%] text-xs rounded-[18px] 
              ${msg.side === 'right' 
                ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-br-sm' 
                : 'bg-gray-100 text-gray-800 rounded-bl-sm border border-gray-200'
              }`}
          >
            {msg.text}
          </div>
        </div>
      ))}

      {/* Optional Shared Image */}
      {data.image && (
        <div className="flex justify-end">
            <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200 shadow-sm mr-2">
                <img src={data.image} alt="shared" className="w-full h-full object-cover" />
                <div className="absolute bottom-1 right-1 bg-black/50 p-1 rounded-full">
                    <Heart className="w-3 h-3 text-white fill-white" />
                </div>
            </div>
        </div>
      )}
    </div>
  </div>
);

interface SocialProofProps {
    content?: any;
}

const SocialProof: React.FC<SocialProofProps> = ({ content }) => {
  const title = content?.title || "Don't Just Take Our Word For It";
  const subtitle = content?.subtitle || "See what our clients are saying about us directly on WhatsApp and Instagram. Transparency is our best policy.";
  const chats = content?.items || content?.chats || defaultChats;

  return (
    <section className="py-24 bg-brand-50 relative overflow-hidden">
       {/* Background Decorative Elements */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
         <div className="absolute top-20 -left-20 w-96 h-96 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
         <div className="absolute bottom-20 -right-20 w-96 h-96 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
       </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-bold tracking-wider uppercase text-sm">Real Conversations</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-industrial-dark mt-2 mb-6">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {subtitle}
          </p>
        </div>

        {/* Masonry Grid Layout for Chat Cloud */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 mx-auto max-w-7xl">
          {chats.map((chat: any, index: number) => (
            <div key={index} className="break-inside-avoid">
              {chat.platform === 'whatsapp' ? (
                <WhatsAppCard data={chat} />
              ) : (
                <InstagramCard data={chat} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
