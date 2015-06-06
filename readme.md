This is a very trivial example of how to use `d3`. I am also using `gulp` to build and `typescript` for typing support. I recently switched to using `jspm` 
for dependency loading.

### Setup

You will need to run `jspm install` and `npm install` to download dependencies. You can also run `npm run setup` which will do both of these for you in one step.

**NOTE** You may (likely will) encounter an error with `jspm` and github rate limiting. It will tell you to run `jspm endpoint config github`. Follow the 
instructions and you should be good to go.

### Build

If you are using visual studio code, you should be able to just run hit `cmd+shift+b` on OSX or `ctrl+shift+b` on windows. (only tried this on OSX).
Alternatively, you can run `gulp` from the command line in the root directory as long as you have gulp installed. `npm install gulp -g`. I have also created a NPM 
script alias so that you can run `npm run dev` to start developing. This will build your source and start the connect server. It will also watch for changes to .ts
files in the src/ directory. I hate livereload, so I didn't enable that. You will need to manually refresh the browser or add that option to the gulpfile.