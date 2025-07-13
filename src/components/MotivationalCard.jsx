import React from 'react'

function MotivationalCard() {
    const motivationalQuotes = [
        "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        "Every rejection is a redirection. Keep going.",
        "Don't be discouraged. It's often the last key in the bunch that opens the lock.",
        "The comeback is always stronger than the setback.",
        "Your current situation is not your final destination.",
        "Doubt kills more dreams than failure ever will.",
        "The moment you’re ready to quit is usually the moment right before the miracle happens.",
        "Rejections don’t define you — your perseverance does.",
        "Success is what happens after you’ve survived all your failures.",
        "It’s a slow process, but quitting won’t speed it up.",
        "Even the best were once beginners. Keep applying.",
        "Believe in yourself and all that you are becoming.",
        "One opportunity is all it takes. Don’t stop trying.",
        "Stay patient. The job you deserve is still on its way.",
        "If it’s meant for you, it won’t pass you by.",
      ];
  return (
    <div className='w-full rounded-xl p-4 shadow-lg bg-gradient-to-br from-teal-100 via-teal-200 to-teal-300 hover:shadow-xl border border-teal-300/50'>
        <div className='text-left font-semibold text-white text-xl'>{motivationalQuotes[Math.ceil(Math.random()*motivationalQuotes.length)]}</div>
    </div>
  )
}

export default MotivationalCard