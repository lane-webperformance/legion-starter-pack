FROM debian:stretch

ENV NODE_VERSION=v8.9.4
ENV GECKODRIVER_VERSION=v0.19.1
ENV FIREFOX_VERSION=59.0b9

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
  build-essential \
  bzip2 \
  curl \
  git \
  libdbus-glib-1-2 \
  libgtk-3.0 \
  xvfb \
  xz-utils

RUN curl -sS https://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-linux-x64.tar.xz > node.tar.xz && \
  mkdir -p /install/node && \
  tar xf node.tar.xz --strip-components=1 -C /install/node && \
  rm node.tar.xz

RUN curl -sSL https://github.com/mozilla/geckodriver/releases/download/$GECKODRIVER_VERSION/geckodriver-$GECKODRIVER_VERSION-linux64.tar.gz > geckodriver.tar.gz && \
  mkdir -p /install/geckodriver && \
  tar xf geckodriver.tar.gz -C /install/geckodriver && \
  rm geckodriver.tar.gz

RUN curl -sSL https://github.com/mozilla/geckodriver/releases/download/$GECKODRIVER_VERSION/geckodriver-$GECKODRIVER_VERSION-linux64.tar.gz > geckodriver.tar.gz && \
  mkdir -p /install/geckodriver && \
  tar xf geckodriver.tar.gz -C /install/geckodriver && \
  rm geckodriver.tar.gz

RUN curl -sS https://ftp.mozilla.org/pub/firefox/releases/$FIREFOX_VERSION/linux-x86_64/en-US/firefox-$FIREFOX_VERSION.tar.bz2 > firefox.tar.bz && \
  mkdir -p /install/firefox && \
  tar xf firefox.tar.bz --strip-components=1 -C /install/firefox && \
  rm firefox.tar.bz

ENV PATH=/install/node/bin:/install/geckodriver:/install/firefox:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

RUN npm install -g yarn

COPY . /root/legion
WORKDIR /root/legion

RUN make build

ENTRYPOINT ["/root/legion/.docker.entrypoint.bash"]
CMD ["yarn", "test"]
