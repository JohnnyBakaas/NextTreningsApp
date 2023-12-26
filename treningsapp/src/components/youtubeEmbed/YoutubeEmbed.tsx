import PropTypes from "prop-types";
import styles from "./YoutubeEmbed.module.css";

export default function YoutubeEmbed({ embedId }: { embedId: string }) {
  return (
    <div className={styles["video-responsive"]}>
      <iframe
        width="100%"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};
