import React from 'react'

interface YoutubeEmbedProps {
  title: string
  embedId: string
}

export function YoutubeEmbed({ title, embedId }: YoutubeEmbedProps) {
  return (
    <div className="overflow-hidden pb-[56.25%] relative h-0 rounded-2xl">
      <iframe
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${embedId}`}
        title={title}
      />
    </div>
  )
}
