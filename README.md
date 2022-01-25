# vidiq

## senior frontend assignment

### How to run:
have nvm installed and ready + a linux/macos system ... windows will fail on preinstall probably, sorry

Examplatory steps to get up and running:

* gh repo clone joehannes-jobs/vidiq
* npm i
* npm start

### How to run the existing tests:
I started out via TDD, but soon I realized I would spend another 2 days if I continued with TDD.
I hope the existing testsuite is sufficient for this challenge :-)

* npm test

### Tickets, Branches and PRs can be found on github.com/joehannes-jobs/vidiq

I tried to stick to coding standards, linting, conventional commit messages, some versioning (even automated, but the setup didn't work out for me, didn't spend hours debugging for versioning ... or maybe I did and just gave up :-) ) ...

* I used Typescript because it kinda prooves more of skills than just javascript
* I used Styled Components just in case I needed to style something quickly
* I used TailwindCSS because that was the most convenient solution for me, that is quite popular, industry standard, showing off skills, but foremostly I used it on 1 project already and kinda liked it and the productivity gains one gets by it ...
* I used DaisyUI because it builds on top of Tailwind and came with an image gallery that seemed quite fitting
* I used React-Query because I heard you're using it a lot and I wanted to give it a shot and thought that would be useful (also: I saw myself a chance in spending less time on caching/localstorage because those features are built in - I was mistaken, haha)
* I used React Context because I didn't want to do a big Redux setup for passing around a few wars in a micro app
* I used Atomic Design (in part, haha), because that kinda goes with styled components
* For tests, for http calls I used nock to stub and intercept the API calls, which was cumbersome (it didn't work for hours until I found that the http interception only worked on libs that use web api http protocol, but I used fetch initially)

And now to the big fun thingy:
I used Neovim for coding <3, that editor really is a marvel

Have fun looking around
