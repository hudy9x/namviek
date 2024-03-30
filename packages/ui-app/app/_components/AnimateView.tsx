import { AnimatePresence, motion } from 'framer-motion'
import { useId } from 'react'

export default function AnimateView({
  visible,
  children
}: {
  visible: boolean
  children: React.ReactNode
}) {
  const id = useId()
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
