# FROM ubuntu
# RUN apt-get update; apt-get clean
# Add a user for running applications.
# RUN useradd apps
# RUN mkdir -p /home/apps && chown apps:apps /home/apps

# WORKDIR /home/node/bot

# Install x11vnc.
# RUN apt-get install -y x11vnc

# Install xvfb.
# RUN apt-get install -y xvfb

# # Install fluxbox.
# RUN apt-get install -y fluxbox

# # Install wget.
# RUN apt-get install -y wget

# # Install wmctrl.
# RUN apt-get install -y wmctrl

# RUN apt-get update && \
#   apt-get install -y software-properties-common && \
#   rm -rf /var/lib/apt/lists/*

# RUN  apt-get update && apt-get install -y wget

# # Set the Chrome repo.
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#     && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
# # Install Chrome.
# RUN apt-get update && apt-get -y install google-chrome-unstable && rm -rf /var/lib/apt/lists/*

# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \ 
#   && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
# RUN apt-get update && apt-get -y install google-chrome-stable

# WORKDIR /home/node/capital-bot

# RUN chromium
# RUN chromium-browser --headless --no-sandbox
# RUN chrome

# ENV CHROME_BIN="/usr/bin/chromium-browser"\
#   PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

FROM node:16-slim AS app

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN apt-get update -y && apt-get install -y xorg xserver-xorg xvfb libx11-dev libxext-dev

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
# RUN apt-get update && apt-get install curl gnupg -y \
#   && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#   && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
#   && apt-get update \
#   && apt-get install google-chrome-stable -y --no-install-recommends \
#   && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install curl gnupg -y
RUN curl -LO https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
  && apt-get install -y ./google-chrome-stable_current_amd64.deb \
  && rm google-chrome-stable_current_amd64.deb

COPY package.json ./

RUN yarn install
COPY . ./

CMD [ "npm", "run", "start" ]