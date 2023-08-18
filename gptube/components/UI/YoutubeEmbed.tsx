import React from 'react'

import styles from './YoutubeEmbed.module.css'

interface YoutubeEmbedProps {
  title: string
  embedId: string
}

function YoutubeEmbed({ title, embedId }: YoutubeEmbedProps) {
  return (
    <div className={styles['video-responsive']}>
      <iframe
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        src={`https://www.youtube.com/embed/${embedId}`}
        title={title}
      />
    </div>
  )
}

export default YoutubeEmbed
