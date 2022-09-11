if ! [ -x "$(command -v google-chrome)" ]; then
  command wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && sudo dpkg -i google-chrome-stable_current_amd64.deb && npm run start
  exit
else
  command npm run prod
fi
