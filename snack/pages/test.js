import React from 'react'
import Section from '@/components/layout/section'
import toast, { Toaster } from 'react-hot-toast'

export default function Test() {
  const notify = () => toast('Here is your toast.')
  return (
    <Section>
      <div>
        <button onClick={notify}>Make me a toast</button>
        <Toaster />
      </div>
    </Section>
  )
}
