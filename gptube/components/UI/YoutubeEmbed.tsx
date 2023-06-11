import React from "react";
import styles from "./YoutubeEmbed.module.css";

interface YoutubeEmbedProps {
  title: string;
  embedId: string;
}

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ title, embedId }) => (
  <div className={styles["video-responsive"]}>
    <iframe
      src={`https://www.youtube.com/embed/${embedId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={title}
    />
  </div>
);

export default YoutubeEmbed;
