test-viewer
===========

The goal of this project is to provide a pretty viewable view of HTF haskell tests, kind of like what karma does for
javascript tests.  A node server will listen for HTF test output changes, parse them, and do a push to a local angularUI
for pretty display.

Configuration
=======

Create an `hconfig.json` that looks like this

```
{
    "projectSource": "/Users/devshorts/Projects/code/haskellProject"
}
```

Running
=======

And load up the app with `node app.js`.  After that, test-viewer will listen for HTF log file changes in the `dist/test/*.log`
folder and re-parse any haskell test output files after they are detected to have been changed.  Failed parsings are
ignored.

Screen Shots
=======

![Main page](readmeImg/app.png)