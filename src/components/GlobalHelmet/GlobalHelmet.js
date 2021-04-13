import React from 'react';
import { Helmet } from 'react-helmet';

import useMobileDetect from 'hooks/useMobileDetect';

const GlobalHelmet = () => {
  const isMobile = useMobileDetect();

  const renderOg = () => (
    <>
      <meta property="og:url" content="https://lostark.game.onstove.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Lostark 이미지 공유" />
      <meta property="og:description" content="Lostark 이미지 공유 하자!!!!!" />
      <meta
        property="og:image"
        content="https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/inspection/img_index_v5.jpg?v=timestamp"
      />
    </>
  );
  return (
    <>
      {!isMobile && (
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
        </Helmet>
      )}
      {isMobile && (
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
        </Helmet>
      )}
    </>
  );
};

export default GlobalHelmet;
