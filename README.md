# asteroids

[![Run on Repl.it](https://repl.it/badge/github/remarkablegames/asteroids)](https://repl.it/github/remarkablegames/asteroids)
![GitHub last commit](https://img.shields.io/github/last-commit/remarkablegames/asteroids)

[Asteroids game](https://remarkablegames.org/asteroids/) from [p5.play examples](https://molleindustria.github.io/p5.play/examples/index.html?fileName=asteroids.js). See [Repl.it](https://repl.it/talk/share/Asteroids/118514) and [blog post](https://remarkablegames.org/posts/asteroids/).

Built with:

- HTML/CSS/JS
- [p5.js](https://p5js.org/)
- [p5.play](https://molleindustria.github.io/p5.play/)

<p align="center">
  <img src="https://remarkablegames.org/assets/images/2021/2021-01-31-asteroids.png" alt="Asteroids" width="500">
</p>

## Run

Clone repository:

```sh
git clone https://github.com/remarkablegames/asteroids.git
cd asteroids
```

Start a static server:

```sh
python -m SimpleHTTPServer
```

Open http://localhost:8000/:

```sh
open http://localhost:8000/
```

To stop the server, press `Ctrl + C`.

## Changelog

### Bug Fixes

- Decrease `ship` and `particle` friction so they can move
- Improve text readability by giving it a stroke and putting it in front of the layers

### Features

- Render the game full screen
- Generate asteroids based on screen size
- Destroy the ship on asteroid collision
- Improve bounding box collision detection
- Improve ship speed
- Randomize the speed of sprites (asteroids and particles)
- Control ship using arrow keys or WAD; fire bullet with space

### Chore

- Refactor to local scope so globals aren't polluted
