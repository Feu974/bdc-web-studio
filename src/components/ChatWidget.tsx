import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, Send, MessageCircle, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

// ─── localStorage helper ────────────────────────────────────────────────────
function useLocalStorage<T>(key: string, initialValue: T): [T, (val: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value
        try {
          localStorage.setItem(key, JSON.stringify(nextValue))
        } catch {
          // quota exceeded — silently fail
        }
        return nextValue
      })
    },
    [key],
  )

  return [storedValue, setValue]
}

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

const CHAT_TITLE_ID = 'chat-dialog-title'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useLocalStorage<Message[]>('chat-messages', [])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const [unreadCount, setUnreadCount] = useState(0)
  const [initialized, setInitialized] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const motionProps = prefersReducedMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.01 } }
    : undefined

  // Welcome message
  useEffect(() => {
    if (!initialized && messages !== undefined) {
      if (messages.length === 0) {
        const welcomeMessage: Message = {
          id: Date.now().toString(),
          text: 'Bonjour ! Je suis l\'assistant virtuel de BDC Web. Comment puis-je vous aider aujourd\'hui ?',
          sender: 'support',
          timestamp: Date.now()
        }
        setMessages([welcomeMessage])
      }
      setInitialized(true)
    }
  }, [messages, initialized, setMessages])

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  // Unread count management
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

  // Focus trap + Escape key for dialog
  useEffect(() => {
    if (!isOpen) return

    // Focus input on open
    requestAnimationFrame(() => {
      inputRef.current?.focus()
    })

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        // Return focus to open button
        requestAnimationFrame(() => {
          openButtonRef.current?.focus()
        })
        return
      }

      // Focus trap
      if (e.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (focusableElements.length === 0) return

        const firstEl = focusableElements[0]
        const lastEl = focusableElements[focusableElements.length - 1]

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault()
          lastEl.focus()
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault()
          firstEl.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const getAutoResponse = useCallback((text: string): string | null => {
    const lowerText = text.toLowerCase()
    for (const [key, response] of Object.entries(autoResponses)) {
      if (lowerText.includes(key)) {
        return response
      }
    }
    return null
  }, [])

  const handleSendMessage = useCallback((text: string) => {
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
  }, [getAutoResponse, setMessages])

  const handleQuickReply = useCallback((reply: string) => {
    handleSendMessage(reply)
  }, [handleSendMessage])

  const formatTime = useCallback((timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  }, [])

  return (
    <>
      {/* Open chat button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            {...(prefersReducedMotion
              ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.01 } }
              : { initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0, opacity: 0 }, transition: { type: "spring", stiffness: 260, damping: 20 } }
            )}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              ref={openButtonRef}
              onClick={() => setIsOpen(true)}
              aria-label={unreadCount > 0 ? `Ouvrir le chat (${unreadCount} message${unreadCount > 1 ? 's' : ''} non lu${unreadCount > 1 ? 's' : ''})` : 'Ouvrir le chat'}
              className="relative h-16 w-16 rounded-full bg-white text-black hover:bg-zinc-100 shadow-2xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            >
              <MessageCircle className="h-7 w-7" aria-hidden="true" />
              {unreadCount > 0 && (
                <motion.div
                  {...(prefersReducedMotion
                    ? { initial: false, animate: { opacity: 1 } }
                    : { initial: { scale: 0 }, animate: { scale: 1 } }
                  )}
                  className="absolute -top-1 -right-1 h-6 w-6 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold"
                  aria-hidden="true"
                >
                  {unreadCount}
                </motion.div>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={CHAT_TITLE_ID}
            {...(prefersReducedMotion
              ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.01 } }
              : { initial: { opacity: 0, y: 24, scale: 0.96 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 24, scale: 0.96 }, transition: { type: "spring", stiffness: 280, damping: 26 } }
            )}
            className="fixed bottom-6 right-6 w-[380px] h-[600px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-black border-b border-zinc-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center" aria-hidden="true">
                  <User className="h-5 w-5 text-black" aria-hidden="true" />
                </div>
                <div>
                  <h3 id={CHAT_TITLE_ID} className="font-bold text-sm">Support BDC Web</h3>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" aria-hidden="true" />
                    <span className="text-xs text-zinc-400">En ligne</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => {
                  setIsOpen(false)
                  requestAnimationFrame(() => openButtonRef.current?.focus())
                }}
                variant="ghost"
                size="icon"
                aria-label="Fermer le chat"
                className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-0 rounded"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>

            {/* Messages area */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4" role="log" aria-live="polite" aria-label="Messages du chat">
                {messages && messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.sender === 'user'
                        ? 'bg-white text-black'
                        : 'bg-zinc-900 text-zinc-50'
                        }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <span className="text-xs opacity-50 mt-1 block" aria-label={`Envoye a ${formatTime(message.timestamp)}`}>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div
                    className="flex justify-start"
                    role="status"
                    aria-label="L'assistant ecrit..."
                  >
                    <div className="bg-zinc-900 rounded-2xl px-4 py-3">
                      <div className="flex gap-1" aria-hidden="true">
                        <span className="h-2 w-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="h-2 w-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                        <span className="h-2 w-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Quick replies — proper buttons */}
            {messages && messages.length <= 2 && (
              <div className="px-4 pb-3 flex flex-wrap gap-2" role="group" aria-label="Reponses rapides">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => handleQuickReply(reply)}
                    className="inline-flex items-center px-3 py-1 text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-300 cursor-pointer border border-zinc-800 hover:border-zinc-700 transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-zinc-950"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input area */}
            <div className="border-t border-zinc-800 p-4 bg-black">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage(inputValue)
                }}
                className="flex gap-2"
              >
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Votre message..."
                  aria-label="Votre message"
                  className="flex-1 bg-zinc-900 border-zinc-800 text-zinc-50 placeholder:text-zinc-500 focus:border-accent"
                />
                <Button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  aria-label="Envoyer le message"
                  className="bg-white text-black hover:bg-zinc-100 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-black"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
