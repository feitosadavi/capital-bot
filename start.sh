if ! [ -x "$(command -v google-chrome)" ]; then
  command apt-get update && apt-install wget 
  command wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && dpkg -i google-chrome-stable_current_amd64.deb && npm run prod
  exit
else
  command npm run prod
fi
