import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('snakeHighScore') || '0');
  });
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();

  const gridSize = 20;
  const gameStateRef = useRef({
    snake: [
      { x: Math.floor(gridSize/2), y: Math.floor(gridSize/2) },
      { x: Math.floor(gridSize/2) - 1, y: Math.floor(gridSize/2) }
    ],
    food: { x: 5, y: 5 },
    direction: { x: 1, y: 0 },
    gameLoop: null as NodeJS.Timeout | null,
    tileSize: 0
  });

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 768;
    const maxSize = isMobile ? Math.min(window.innerWidth - 32, window.innerHeight * 0.5) : 500;
    const size = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.6, maxSize);
    const adjustedSize = size - (size % gridSize);
    canvas.width = adjustedSize;
    canvas.height = adjustedSize;
    gameStateRef.current.tileSize = adjustedSize / gridSize;
  };

  const placeFood = () => {
    const food = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize)
    };

    const { snake } = gameStateRef.current;
    for (let segment of snake) {
      if (segment.x === food.x && segment.y === food.y) {
        placeFood();
        return;
      }
    }

    gameStateRef.current.food = food;
  };

  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { snake, food, tileSize } = gameStateRef.current;

    // Clear canvas with gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(15, 23, 42, 0.9)');
    gradient.addColorStop(1, 'rgba(30, 41, 59, 0.9)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = index === 0 ? 15 : 8;

      const segmentGradient = ctx.createRadialGradient(
        segment.x * tileSize + tileSize/2, segment.y * tileSize + tileSize/2, 0,
        segment.x * tileSize + tileSize/2, segment.y * tileSize + tileSize/2, tileSize/2
      );

      if (index === 0) {
        segmentGradient.addColorStop(0, '#34d399');
        segmentGradient.addColorStop(1, '#10b981');
      } else {
        segmentGradient.addColorStop(0, '#10b981');
        segmentGradient.addColorStop(1, '#059669');
      }

      ctx.fillStyle = segmentGradient;
      ctx.fillRect(segment.x * tileSize + 1, segment.y * tileSize + 1, tileSize - 2, tileSize - 2);
    });

    // Draw food
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 20;

    const foodGradient = ctx.createRadialGradient(
      food.x * tileSize + tileSize/2, food.y * tileSize + tileSize/2, 0,
      food.x * tileSize + tileSize/2, food.y * tileSize + tileSize/2, tileSize/2
    );
    foodGradient.addColorStop(0, '#f87171');
    foodGradient.addColorStop(1, '#dc2626');

    ctx.fillStyle = foodGradient;
    ctx.fillRect(food.x * tileSize + 2, food.y * tileSize + 2, tileSize - 4, tileSize - 4);

    ctx.shadowBlur = 0;
  };

  const checkSelfCollision = () => {
    const { snake } = gameStateRef.current;
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }
    return false;
  };

  const endGame = () => {
    setIsGameOver(true);
    setGameStarted(false);
    
    if (gameStateRef.current.gameLoop) {
      clearInterval(gameStateRef.current.gameLoop);
      gameStateRef.current.gameLoop = null;
    }

    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  };

  const gameTick = () => {
    const { snake, food, direction } = gameStateRef.current;
    
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setScore(prev => prev + 1);
      placeFood();
    } else {
      snake.pop();
    }

    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize || checkSelfCollision()) {
      endGame();
      return;
    }

    drawGame();
  };

  const startGame = () => {
    setIsGameOver(false);
    setGameStarted(true);
    setScore(0);

    gameStateRef.current.snake = [
      { x: Math.floor(gridSize/2), y: Math.floor(gridSize/2) },
      { x: Math.floor(gridSize/2) - 1, y: Math.floor(gridSize/2) }
    ];
    gameStateRef.current.direction = { x: 1, y: 0 };

    placeFood();

    if (gameStateRef.current.gameLoop) {
      clearInterval(gameStateRef.current.gameLoop);
    }

    gameStateRef.current.gameLoop = setInterval(gameTick, 120);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted || isGameOver) return;

      const { direction } = gameStateRef.current;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (direction.y === 0) gameStateRef.current.direction = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (direction.y === 0) gameStateRef.current.direction = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (direction.x === 0) gameStateRef.current.direction = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (direction.x === 0) gameStateRef.current.direction = { x: 1, y: 0 };
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, isGameOver]);

  const handleControlClick = (dir: string) => {
    if (!gameStarted || isGameOver) return;

    const { direction } = gameStateRef.current;

    switch (dir) {
      case 'up':
        if (direction.y === 0) gameStateRef.current.direction = { x: 0, y: -1 };
        break;
      case 'down':
        if (direction.y === 0) gameStateRef.current.direction = { x: 0, y: 1 };
        break;
      case 'left':
        if (direction.x === 0) gameStateRef.current.direction = { x: -1, y: 0 };
        break;
      case 'right':
        if (direction.x === 0) gameStateRef.current.direction = { x: 1, y: 0 };
        break;
    }
  };

  // Touch/Swipe controls for mobile
  const touchStartRef = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!gameStarted || isGameOver) return;
    e.preventDefault();

    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;

    const dx = touchEndX - touchStartRef.current.x;
    const dy = touchEndY - touchStartRef.current.y;

    const sensitivity = 30;
    const { direction } = gameStateRef.current;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > sensitivity) {
      if (dx > 0 && direction.x === 0) {
        gameStateRef.current.direction = { x: 1, y: 0 };
      } else if (dx < 0 && direction.x === 0) {
        gameStateRef.current.direction = { x: -1, y: 0 };
      }
    } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > sensitivity) {
      if (dy > 0 && direction.y === 0) {
        gameStateRef.current.direction = { x: 0, y: 1 };
      } else if (dy < 0 && direction.y === 0) {
        gameStateRef.current.direction = { x: 0, y: -1 };
      }
    }

    touchStartRef.current = { x: touchEndX, y: touchEndY };
  };

  useEffect(() => {
    setupCanvas();
    window.addEventListener('resize', setupCanvas);

    return () => {
      window.removeEventListener('resize', setupCanvas);
      if (gameStateRef.current.gameLoop) {
        clearInterval(gameStateRef.current.gameLoop);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-matrix-dark via-matrix-dark to-background p-4 py-8 md:p-4 relative overflow-hidden">
      {/* Back Button */}
      <Button
        onClick={() => navigate('/')}
        variant="ghost"
        size="sm"
        className="absolute top-2 left-2 md:top-4 md:left-4 text-neon-green hover:bg-neon-green/10 z-10"
      >
        <ArrowLeft className="w-4 h-4 md:mr-2" />
        <span className="hidden md:inline">Back to Portfolio</span>
      </Button>

      {/* Title */}
      <div className="text-center mb-4 md:mb-6">
        <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-neon-green to-emerald-400 bg-clip-text text-transparent">
          RETRO SNAKE
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-2">
          {window.innerWidth < 768 ? 'Swipe or tap buttons to play!' : 'Classic arcade gaming with modern style!'}
        </p>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="bg-matrix-dark/80 border-2 md:border-3 border-neon-green rounded-lg md:rounded-xl shadow-glow mb-3 md:mb-4 touch-none"
        style={{ boxShadow: '0 0 30px rgba(16, 185, 129, 0.6), inset 0 0 20px rgba(16, 185, 129, 0.1)' }}
      />

      {/* Score Display */}
      <div className="text-center text-lg md:text-2xl font-bold mb-2 md:mb-4" style={{ textShadow: '0 0 10px rgba(16, 185, 129, 0.8)' }}>
        <span className="text-neon-green">Score: {score}</span>
        <span className="mx-2 md:mx-4 text-muted-foreground">|</span>
        <span className="text-emerald-400">High: {highScore}</span>
      </div>

      {/* Controls Info - Desktop only */}
      <p className="hidden md:block text-sm text-muted-foreground mb-4">
        Use arrow keys or WASD to control • Collect red food to grow
      </p>

      {/* Game Over Message */}
      {isGameOver && (
        <div className="glass-card p-4 md:p-8 border-red-500 text-center mb-3 md:mb-4 animate-fade-in max-w-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-2" style={{ textShadow: '0 0 15px #ef4444' }}>
            GAME OVER!
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">Final Score: {score}</p>
        </div>
      )}

      {/* Start Button */}
      {!gameStarted && (
        <Button
          onClick={startGame}
          size="lg"
          className="bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full font-bold uppercase tracking-wide pulse-glow mb-4 md:mb-0"
        >
          {isGameOver ? 'PLAY AGAIN' : 'START GAME'}
        </Button>
      )}

      {/* Mobile Controls */}
      <div className="md:hidden mt-4 flex flex-col items-center gap-2">
        <Button
          onClick={() => handleControlClick('up')}
          size="lg"
          className="w-14 h-14 text-2xl bg-neon-green/20 border-2 border-neon-green hover:bg-neon-green/40 active:scale-95 transition-transform"
        >
          ▲
        </Button>
        <div className="flex gap-2">
          <Button
            onClick={() => handleControlClick('left')}
            size="lg"
            className="w-14 h-14 text-2xl bg-neon-green/20 border-2 border-neon-green hover:bg-neon-green/40 active:scale-95 transition-transform"
          >
            ◀
          </Button>
          <Button
            onClick={() => handleControlClick('down')}
            size="lg"
            className="w-14 h-14 text-2xl bg-neon-green/20 border-2 border-neon-green hover:bg-neon-green/40 active:scale-95 transition-transform"
          >
            ▼
          </Button>
          <Button
            onClick={() => handleControlClick('right')}
            size="lg"
            className="w-14 h-14 text-2xl bg-neon-green/20 border-2 border-neon-green hover:bg-neon-green/40 active:scale-95 transition-transform"
          >
            ▶
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;