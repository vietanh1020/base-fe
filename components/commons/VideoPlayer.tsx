import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
  return (
    <div>
      <ReactPlayer
        url="https://upload.vcallid.com/records/stream_3096dc50-70d0-82b4-5bc3-c3c27d35455a.flv"
        width="100%"
        height="100%"
        controls
        playing
      />
    </div>
  );
};

export default VideoPlayer;