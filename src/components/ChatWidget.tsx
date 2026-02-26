import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, MessageCircle, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { useKV } from '@github/spark/hooks'

interface Message {
  id: string
  text: string
  sender: 'user' | 'support'
  timestamp: number
}

const quickReplies = [
  'Tarifs et devis',
  'Délais de projet',
  'Technologies utilisées',
  'Financement régional'
]

const autoResponses: Record<string, string> = {
  'tarifs': 'Nos tarifs démarrent à 2 500€ pour un site vitrine. Pour une estimation précise, je peux vous mettre en relation avec notre équipe technique.',
  'devis': 'Je vous transfère vers notre formulaire de devis détaillé. Un expert vous répondra sous 24h.',
  'délais': 'Les délais varient selon la complexité : 2-3 semaines pour un site vitrine, 6-8 semaines pour une application web sur mesure.',
  'financement': 'Nous sommes éligibles aux dispositifs de financement régionaux. Code NAF 62.01Z. Je peux vous envoyer la documentation.',
  'technologies': 'Nous utilisons React, Next.js, Node.js, Supabase, et des infrastructures cloud haute disponibilité.',
  'disponibilité': 'Notre équipe technique est disponible 24/7 pour le maintien opérationnel de vos infrastructures.',
  'sécurité': 'Toutes nos infrastructures incluent SSL Grade A, anti-DDoS, et sauvegardes automatisées quotidiennes.'
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useKV<Message[]>('chat-messages', [])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (messages && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: 'Bonjour ! Je suis l\'assistant virtuel de BDC Web. Comment puis-je vous aider aujourd\'hui ?',
        sender: 'support',
        timestamp: Date.now()
      }
      setMessages([welcomeMessage])
    }
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  useEffect(() => {
    if (!messages) return
    
    if (!isOpen) {
      const newMessages = messages.filter(m => m.sender === 'support')
      if (newMessages.length > 0) {
        const lastMessage = newMessages[newMessages.length - 1]
        const wasRead = localStorage.getItem(`read-${lastMessage.id}`)
        if (!wasRead) {
          setUnreadCount(prev => prev + 1)
        }
      }
    } else {
      setUnreadCount(0)
      messages.forEach(m => {
        if (m.sender === 'support') {
          localStorage.setItem(`read-${m.id}`, 'true')
        }
      })
    }
  }, [isOpen, messages])

  const getAutoResponse = (text: string): string | null => {
    const lowerText = text.toLowerCase()
    for (const [key, response] of Object.entries(autoResponses)) {
      if (lowerText.includes(key)) {
        return response
      }
    }
    return null
  }

  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: Date.now()
    }

    setMessages((current) => [...(current || []), userMessage])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const autoResponse = getAutoResponse(text)
      const responseText = autoResponse || 
        'Merci pour votre message. Un membre de notre équipe technique va vous répondre dans quelques instants.'

      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'support',
        timestamp: Date.now()
      }

      setMessages((current) => [...(current || []), supportMessage])
      setIsTyping(false)
    }, 1500 + Math.random() * 1000)
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="relative h-16 w-16 rounded-full bg-white text-black hover:bg-zinc-100 shadow-2xl hover:scale-110 transition-all duration-300"
            >
              <MessageCircle className="h-7 w-7" />
              {unreadCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-6 w-6 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold"
                >
                  {unreadCount}
                </motion.div>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 w-[380px] h-[600px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="bg-black border-b border-zinc-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Support BDC Web</h3>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-xs text-zinc-400">En ligne</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-900"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages && messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-white text-black'
                          : 'bg-zinc-900 text-zinc-50'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <span className="text-xs opacity-50 mt-1 block">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-zinc-900 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ y: [0, -8, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                          className="h-2 w-2 bg-zinc-500 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -8, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                          className="h-2 w-2 bg-zinc-500 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -8, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                          className="h-2 w-2 bg-zinc-500 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {messages && messages.length <= 2 && (
              <div className="px-4 pb-3 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <Badge
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 cursor-pointer border border-zinc-800 hover:border-zinc-700 transition-all duration-200"
                  >
                    {reply}
                  </Badge>
                ))}
              </div>
            )}

            <div className="border-t border-zinc-800 p-4 bg-black">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex gap-2"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Votre message..."
                  className="flex-1 bg-zinc-900 border-zinc-800 text-zinc-50 placeholder:text-zinc-500 focus:border-accent"
                />
                <Button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-white text-black hover:bg-zinc-100 hover:scale-105 transition-all duration-200"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
